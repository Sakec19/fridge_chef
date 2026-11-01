const assert=require('node:assert/strict');
const handler=require('./api/recipes.js');
process.env.GEMINI_API_KEY='fake';
const recipe={recipes:[{title:'Punjabi Chole',ingredients:['2 cups chickpeas','1 onion'],steps:['Soak chickpeas overnight','Cook chickpeas until soft','Simmer with spices and serve'],time:40,cal:400,protein:16,carbs:60,fat:12,meal:'dinner',cuisines:['Punjabi'],benefits:'Protein',servings:2,cuisine:'Punjabi'}]};
const original=global.fetch;
async function call(body){const res={statusCode:200,setHeader(){},status(n){this.statusCode=n;return this},json(data){this.data=data;return this}};await handler({method:'POST',headers:{'x-forwarded-for':'198.51.100.'+Math.floor(Math.random()*200+1)},body},res);return res;}
(async()=>{
 let calls=[];global.fetch=async(url)=>{calls.push(url);return Response.json({candidates:[{content:{parts:[{text:JSON.stringify(recipe)}]}}]});};
 let r=await call({mode:'dish',dish:'Punjabi Chole'});assert.equal(r.statusCode,200);assert.equal(r.data.provider,'gemini');assert.equal(calls.length,1);assert.match(calls[0],/generativelanguage/);
 r=await call({mode:'dish',dish:''});assert.equal(r.statusCode,400);
 calls=[];global.fetch=async(url)=>{calls.push(url);return new Response('fail',{status:500});};r=await call({mode:'dish',dish:'Punjabi Chole'});assert.equal(r.statusCode,502);assert.equal(calls.length,1);
 delete process.env.GEMINI_API_KEY;r=await call({mode:'dish',dish:'Punjabi Chole'});assert.equal(r.statusCode,503);
 console.log('PASS: Gemini only, no cloud fallback, validation, and unavailable behavior');
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{global.fetch=original});
