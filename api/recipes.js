'use strict';
// Vercel Node serverless endpoint. Secrets must remain in server environment variables.
const dietRules=require('../diet-rules.js');
const allowedDiets = new Set(Object.keys(dietRules.labels));
const allowedMeals = new Set(['any','breakfast','lunch','dinner']);
const limits = new Map(); // Best-effort per-instance limit; configure an edge/shared limiter for public production.
const fallback = (v, d) => typeof v === 'string' ? v : d;
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid request');
  const dish = fallback(body.dish, '').trim().slice(0,90);
  const mode = body.mode === 'dish' ? 'dish' : 'ideas';
  if (mode === 'dish' && !dish) throw new Error('Dish name required');
  const diet = allowedDiets.has(body.diet) ? body.diet : 'any';
  const meal = allowedMeals.has(body.meal) ? body.meal : 'any';
  const maxTime = Number.isFinite(+body.maxTime) ? Math.max(10, Math.min(180, +body.maxTime)) : 120;
  const pantry = Array.isArray(body.pantry) ? body.pantry.slice(0,35).map(x=>typeof x==='string'?x:(x&&typeof x.name==='string'?x.name:'')) .filter(Boolean).map(x=>x.slice(0,80)) : [];
  const cuisines = Array.isArray(body.cuisines) ? body.cuisines.slice(0,15).filter(x=>typeof x==='string').map(x=>x.slice(0,60)) : [];
  const avoid = fallback(body.avoid,'').slice(0,250);
  const cuisineMode = ['mix','rotate','single'].includes(body.cuisineMode) ? body.cuisineMode : 'mix';
  return {mode,dish,diet,meal,maxTime,pantry,cuisines,avoid,cuisineMode};
}
function prompt(v) {
  const n = v.mode === 'dish' ? 1 : 3;
  return `You are a careful recipe author. Return ONLY valid JSON, no markdown, exactly {"recipes":[...]}. Create ${n} ${v.mode==='dish' ? `authentic step-by-step guide for the named dish ${JSON.stringify(v.dish)}` : 'varied recipe ideas'}.
Each recipe requires: title (string), ingredients (array of measured ingredient strings), steps (array of 5-14 clear numbered-in-order instruction strings), time (integer minutes), cal, protein, carbs, fat (nonnegative numeric estimates per serving), meal (breakfast/lunch/dinner), cuisines (array of precise cuisine labels), benefits (short string), servings (integer), cuisine (string). Never invent certainty about allergens or nutrition.
Cuisine constraints (exact allowed tags when supplied): ${JSON.stringify(v.cuisines)}. When given, use ONLY relevant cuisines from this set; if requested dish is outside these cuisines, prioritize authentic dish identity and return its correct cuisine tags. No generic 'Indian' tag. Cuisine menu mode: ${v.cuisineMode}.
Diet: ${v.diet}; avoid ingredients: ${JSON.stringify(v.avoid)}; meal: ${v.meal}; max time: ${v.maxTime} minutes. Prefer pantry ingredients: ${JSON.stringify(v.pantry)}. Explicitly avoid all excluded foods; when gluten-free use certified gluten-free ingredients, including sauces and grains; check labels for dairy, egg and gluten ingredients. State ingredient amounts, pan heat, timing, doneness cues, and food safety guidance where useful. For named dishes, keep the real dish authentic. If constraints prevent a safe recipe return {"recipes":[]} instead of fabricating. Output JSON only.`;
}
async function postJSON(url, headers, body, timeout = 18000) {
  const response = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body),signal:AbortSignal.timeout(timeout)});
  if(!response.ok)throw Error(`Provider error ${response.status}`);
  return response.json();
}
async function gemini(p) {
  if(!process.env.GEMINI_API_KEY)throw Error('Gemini not configured');
  const model=process.env.GEMINI_MODEL||'gemini-2.5-flash-lite';
  const r=await postJSON(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{'x-goog-api-key':process.env.GEMINI_API_KEY},{contents:[{role:'user',parts:[{text:p}]}],generationConfig:{responseMimeType:'application/json',temperature:0.6}});
  return r.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('')||'';
}
function normalize(s,v) {
  const raw=JSON.parse(String(s).trim().replace(/^```(?:json)?\s*|\s*```$/g,''));
  if(!Array.isArray(raw.recipes))throw Error('Invalid recipe list');
  const recipes=raw.recipes.slice(0,v.mode==='dish'?1:3).map(x=>({
    title:String(x.title||'').slice(0,120),
    ingredients:Array.isArray(x.ingredients)?x.ingredients.slice(0,35).map(i=>String(i).slice(0,160)):[],
    steps:Array.isArray(x.steps)?x.steps.slice(0,20).map(i=>String(i).slice(0,600)):[],
    time:Math.round(Number(x.time)), cal:Number(x.cal),protein:Number(x.protein),carbs:Number(x.carbs),fat:Number(x.fat),
    meal:allowedMeals.has(x.meal)&&x.meal!=='any'?x.meal:'dinner',
    cuisines:Array.isArray(x.cuisines)?x.cuisines.filter(c=>typeof c==='string').slice(0,5):[],
    benefits:String(x.benefits||'').slice(0,240),servings:Math.max(1,Math.min(20,Math.round(Number(x.servings)||2))),cuisine:String(x.cuisine||'').slice(0,80)
  })).filter(x=>x.title&&x.ingredients.length>=2&&x.steps.length>=3&&Number.isFinite(x.time)&&x.time>0&&['cal','protein','carbs','fat'].every(k=>Number.isFinite(x[k])&&x[k]>=0)&&
    (v.mode==='dish'||x.time<=v.maxTime)&&
    (v.mode==='dish'||!v.cuisines.length||x.cuisines.some(c=>v.cuisines.includes(c))));
  const filtered=recipes.filter(x=>dietRules.allowed(x,v.diet,v.avoid));
  if(!filtered.length)throw Error('No valid recipes matching diet');
  return filtered;
}
module.exports = async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
  const size=Number(req.headers['content-length']||0);if(size>12000)return res.status(413).json({error:'Request too large'});
  const identity=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0];
  const now=Date.now();if(limits.size>5000)limits.clear();let hit=limits.get(identity)||{count:0,until:now+60000};if(hit.until<now)hit={count:0,until:now+60000};hit.count++;limits.set(identity,hit);
  if(hit.count>8)return res.status(429).json({error:'Too many requests'});
  let v;try {v=validate(req.body);}catch(e){return res.status(400).json({error:e.message});}
  if(!process.env.GEMINI_API_KEY)return res.status(503).json({error:'Gemini is not configured'});
  try {
    const recipes=normalize(await gemini(prompt(v)),v);
    return res.status(200).json({recipes,provider:'gemini'});
  } catch(e) {
    console.warn(`Gemini generation unavailable: ${e.message}`);
    return res.status(502).json({error:'Gemini could not generate a usable recipe. Try a saved or bundled offline guide.'});
  }
};
