'use strict';
const RECIPES=[
['Tomato Chickpea Skillet','🍅','dinner',20,450,19,59,15,['tomato','chickpeas','onion','garlic','olive oil'],2.6,'vegan','Fiber-rich and satisfying'],
['Spinach Egg Scramble','🍳','breakfast',12,280,20,9,18,['eggs','spinach','onion','olive oil'],2.1,'egg','Protein and iron'],
['Creamy Oatmeal','🥣','breakfast',10,310,11,48,9,['oats','milk','banana'],1.3,'vegetarian','Slow-release energy'],
['Overnight Berry Oats','🫐','breakfast',5,350,12,53,10,['oats','berries','yogurt'],2.4,'vegetarian','Fiber and antioxidants'],
['Avocado Toast','🥑','breakfast',10,340,10,35,19,['bread','avocado','lemon'],2.7,'vegan','Healthy unsaturated fats'],
['Lentil Vegetable Soup','🥕','lunch',35,380,21,58,7,['lentils','carrot','onion','tomato','garlic'],2.2,'vegan','Plant protein and fiber'],
['Chickpea Cucumber Salad','🥗','lunch',15,410,16,45,18,['chickpeas','cucumber','tomato','lemon','olive oil'],2.8,'vegan','Fiber and vitamin C'],
['Cheesy Bean Quesadilla','🫓','lunch',15,490,23,51,21,['tortilla','black beans','cheese','onion'],3.0,'vegetarian','Protein and calcium'],
['Vegetable Fried Rice','🍚','dinner',25,480,12,76,13,['rice','carrot','peas','onion','soy sauce'],2.1,'vegan','Vegetables and energy'],
['Pasta with Tomato Sauce','🍝','dinner',25,510,18,83,11,['pasta','tomato','garlic','olive oil'],2.6,'vegan','Lycopene and energy'],
['Black Bean Burrito Bowl','🌯','dinner',30,560,22,78,16,['rice','black beans','corn','tomato','avocado'],3.7,'vegan','Protein and potassium'],
['Garlic Mushroom Pasta','🍄','dinner',25,520,19,70,18,['pasta','mushrooms','garlic','milk','cheese'],3.9,'vegetarian','B vitamins and calcium'],
['Tofu Stir Fry','🥦','dinner',25,440,26,42,19,['tofu','broccoli','carrot','soy sauce','rice'],4.2,'vegan','Plant protein and iron'],
['Veggie Omelet','🥚','breakfast',15,330,24,10,21,['eggs','pepper','onion','cheese'],2.5,'egg','High-quality protein'],
['Chicken Rice Bowl','🍗','dinner',30,590,40,62,17,['chicken','rice','broccoli','olive oil'],4.7,'meat','Protein-rich dinner'],
['Tuna Sandwich','🥪','lunch',10,400,29,39,14,['tuna','bread','yogurt','lettuce'],3.5,'fish','Omega-3 and protein'],
['Lentil Curry','🍛','dinner',40,500,23,71,14,['lentils','tomato','onion','coconut milk','rice'],3.0,'vegan','Fiber and plant protein'],
['Peanut Butter Banana Toast','🍌','breakfast',5,360,12,47,16,['bread','peanut butter','banana'],1.4,'vegan','Potassium and sustaining fats'],
['Greek Yogurt Fruit Bowl','🍓','breakfast',5,270,18,36,6,['yogurt','berries','banana'],2.8,'vegetarian','Protein and calcium'],
['Roasted Potato Bean Hash','🥔','dinner',35,460,17,69,12,['potato','black beans','onion','pepper','olive oil'],2.6,'vegan','Iron and fiber']
].map((r,i)=>({id:i,title:r[0],emoji:r[1],meal:r[2],time:r[3],cal:r[4],protein:r[5],carbs:r[6],fat:r[7],ingredients:r[8],cost:r[9],diet:r[10],benefits:r[11]}));
const KEY='fridge-chef-data-v1';const defaults={pantry:[],diet:'any',mealType:'any',maxTime:'120',month:'',budget:100,eatOut:4,monthPlan:[],planMonth:'',dayDates:[],dayPlans:[],shopping:[],avoid:'',calorieGoal:''};
let state;try{state={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{state={...defaults}};
const $=id=>document.getElementById(id);const persist=()=>localStorage.setItem(KEY,JSON.stringify(state));const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer;function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600)}
function tab(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===name));document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('selected',b.dataset.tab===name));scrollTo({top:0,behavior:'smooth'})}document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.tab)));
function valid(r){if(state.diet==='vegan'&&r.diet!=='vegan')return false;if(state.diet==='no-eggs'&&['egg','meat','fish'].includes(r.diet))return false;if(state.diet==='vegetarian'&&['meat','fish'].includes(r.diet))return false;const avoids=state.avoid.toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);return !avoids.some(a=>r.ingredients.some(i=>i.includes(a)))}
function eligible(meal='any',time=120){return RECIPES.filter(r=>valid(r)&&(meal==='any'||r.meal===meal)&&r.time<=time)}
function pantryHas(name){return state.pantry.some(p=>p.name.toLowerCase()===name.toLowerCase())}function match(r){return r.ingredients.filter(pantryHas).length}
function matchPct(r){return r.ingredients.length?Math.round(match(r)/r.ingredients.length*100):0}
function ringSVG(pct){const c=97.4;const off=(c*(1-pct/100)).toFixed(1);return `<svg class="ring" width="42" height="42" viewBox="0 0 36 36" role="img" aria-label="${pct}% of ingredients in your fridge"><circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--ring-track)" stroke-width="3.4"/><circle cx="18" cy="18" r="15.5" fill="none" stroke="#276c4d" stroke-width="3.4" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 18 18)"/><text x="18" y="21" text-anchor="middle" font-size="9.5" font-weight="800" fill="var(--ink)">${pct}%</text></svg>`}

// ---- Greeting ----
(function(){const h=new Date().getHours();$('greeting').textContent=h<11?'Good morning — what’s cooking?':h<17?'What’s cooking today?':'Good evening — what’s for dinner?'})();

// ---- Pantry (collapsible) ----
function renderPantry(){$('pantryCount').textContent=`${state.pantry.length} ingredient${state.pantry.length===1?'':'s'}`;$('ingredientChips').innerHTML=state.pantry.length?state.pantry.map((p,i)=>`<span class="chip">${escapeHTML(p.name)} · ${escapeHTML(p.qty)} ${escapeHTML(p.unit)} <button aria-label="Remove ${escapeHTML(p.name)}" data-remove-pantry="${i}">×</button></span>`).join(''):'<p class="hint">Add a few ingredients to start matching recipes.</p>'}
$('pantryToggle').addEventListener('click',()=>{const panel=$('pantryPanel');const closed=panel.classList.toggle('closed');$('pantryToggle').setAttribute('aria-expanded',String(!closed))});
if(state.pantry.length){$('pantryPanel').classList.add('closed');$('pantryToggle').setAttribute('aria-expanded','false')}
$('ingredientForm').addEventListener('submit',e=>{e.preventDefault();const name=$('ingredientName').value.trim().toLowerCase();if(!name)return;const qty=Number($('ingredientQty').value);if(!(qty>0))return;const existing=state.pantry.find(p=>p.name===name);if(existing){existing.qty=qty;existing.unit=$('ingredientUnit').value}else state.pantry.push({name,qty,unit:$('ingredientUnit').value});persist();renderPantry();renderRecipes();$('ingredientForm').reset();$('ingredientQty').value=1;toast('Ingredient saved')});
$('ingredientChips').addEventListener('click',e=>{const b=e.target.closest('[data-remove-pantry]');if(!b)return;state.pantry.splice(Number(b.dataset.removePantry),1);persist();renderPantry();renderRecipes()});

// ---- Library / AI mode tabs ----
let mode='lib';
function setMode(m){mode=m;$('modeLib').classList.toggle('selected',m==='lib');$('modeAI').classList.toggle('selected',m==='ai');$('modeLib').setAttribute('aria-selected',String(m==='lib'));$('modeAI').setAttribute('aria-selected',String(m==='ai'));$('libControls').hidden=m!=='lib';$('aiControls').hidden=m!=='ai';$('recipes').hidden=m!=='lib';$('aiRecipes').hidden=m!=='ai';$('resultsTitle').textContent=m==='lib'?'Recipes for you':'AI ideas for you';if(m==='ai')renderAI();else renderRecipes()}
$('modeLib').addEventListener('click',()=>setMode('lib'));
$('modeAI').addEventListener('click',()=>setMode('ai'));

// ---- Filters ----
function syncPills(){document.querySelectorAll('#mealPills .pill').forEach(p=>p.classList.toggle('selected',p.dataset.meal===state.mealType))}
$('mealPills').addEventListener('click',e=>{const b=e.target.closest('[data-meal]');if(!b)return;state.mealType=b.dataset.meal;persist();syncPills();renderRecipes()});
$('useItUp').addEventListener('change',()=>{$('useItUpHint').hidden=!$('useItUp').checked;renderRecipes()});
$('suggestBtn').addEventListener('click',()=>{state.diet=$('diet').value;state.maxTime=$('maxTime').value;persist();renderRecipes();toast('Recipes updated')});

// ---- Recipe cards ----
function recipeCard(r,i){const pct=matchPct(r);const have=match(r);const full=have===r.ingredients.length;return `<article class="recipe" data-recipe="${r.id}" style="--d:${Math.min(i*45,400)}ms" tabindex="0" role="button" aria-label="${escapeHTML(r.title)}"><div class="card-top"><span class="emoji">${r.emoji}</span>${state.pantry.length?ringSVG(pct):''}</div><h3>${escapeHTML(r.title)}</h3><p>${escapeHTML(r.benefits)}</p><div class="meta"><span class="tag">⏱ ${r.time} min</span><span class="tag">${r.cal} kcal</span>${state.pantry.length?(full?'<span class="badge-ready">✓ Ready to cook</span>':`<span class="badge-missing">Missing ${r.ingredients.length-have} item${r.ingredients.length-have===1?'':'s'}</span>`):`<span class="tag">${have}/${r.ingredients.length} ingredients</span>`}</div><button class="secondary" data-recipe="${r.id}">View recipe</button></article>`}
function renderRecipes(){let arr=eligible(state.mealType,Number(state.maxTime));const useUp=$('useItUp').checked&&state.pantry.length>0;if(useUp)arr=arr.filter(r=>match(r)>0);arr.sort((a,b)=>match(b)-match(a)||matchPct(b)-matchPct(a)||a.cost-b.cost);$('recipeCount').textContent=`${arr.length} idea${arr.length===1?'':'s'}`;$('recipes').innerHTML=arr.length?arr.map(recipeCard).join(''):'<div class="panel">No matches. Try another meal, time limit, or diet.</div>'}
$('recipes').addEventListener('click',e=>{const b=e.target.closest('[data-recipe]');if(b)showRecipe(b.dataset.recipe)});
$('recipes').addEventListener('keydown',e=>{if(e.key!=='Enter')return;const b=e.target.closest('[data-recipe]');if(b)showRecipe(b.dataset.recipe)});

// ---- Surprise me ----
$('surpriseBtn').addEventListener('click',()=>{syncFiltersFromUI();let pool=eligible(state.mealType,Number(state.maxTime));if(!pool.length){toast('No recipes match your filters');return}const stocked=pool.filter(r=>match(r)>0);if(stocked.length)pool=stocked;const pick=pool[Math.floor(Math.random()*pool.length)];toast(`🎲 Tonight: ${pick.title}`);showRecipe(pick.id)});
function syncFiltersFromUI(){state.diet=$('diet').value;state.maxTime=$('maxTime').value;persist()}

// ---- Shopping helpers ----
function shoppingAdd(name){const n=name.trim();if(!n||state.shopping.some(i=>i.name.toLowerCase()===n.toLowerCase()))return;state.shopping.push({name:n,done:false})}
function addMissing(r){r.ingredients.filter(n=>!pantryHas(n)).forEach(shoppingAdd);persist();renderShopping();toast('Missing ingredients added to shopping list')}

// ---- Recipe dialog + Cook Mode ----
let cook=null;
function librarySteps(r){const main=r.ingredients[0];const rest=r.ingredients.slice(1);return [
`Gather everything: ${r.ingredients.join(', ')}. Tick items off in the checklist as you lay them out.`,
`Wash and prep the ingredients — chop vegetables, measure out ${main}${rest.length?` and ${rest.slice(0,2).join(' and ')}`:''}, and keep seasonings within reach.`,
`Heat a little oil in a pan or pot over medium heat. Cook the ${main} first until nearly done (about ${Math.max(4,Math.round(r.time*0.5))} minutes), then add the remaining ingredients and cook until everything is tender and fully cooked through (about ${Math.max(3,r.time-Math.round(r.time*0.5))} more minutes). Follow safe cooking temperatures for animal products.`,
`Season to taste, take it off the heat, rest for a minute — and serve. Enjoy! 🎉`]}
function showRecipe(id){const r=RECIPES.find(r=>r.id===Number(id));if(!r)return;cook=null;$('recipeDetail').innerHTML=`<div style="font-size:58px">${r.emoji}</div><h2>${escapeHTML(r.title)}</h2><p>${escapeHTML(r.benefits)}</p><p><strong>Time:</strong> ${r.time} min · <strong>Estimated cost:</strong> $${r.cost.toFixed(2)}/serving</p><p><strong>Nutrition/serving:</strong> ${r.cal} kcal · ${r.protein}g protein · ${r.carbs}g carbs · ${r.fat}g fat</p><h3>Gather your ingredients</h3><ul class="gather">${r.ingredients.map(i=>`<li><input type="checkbox" aria-label="Gathered ${escapeHTML(i)}"><span>${escapeHTML(i)} ${pantryHas(i)?'✓ in your fridge':'(not in fridge)'}</span></li>`).join('')}</ul><p class="hint">Steps in Cook Mode are simple general guidance generated for this dish, not tested instructions for a particular recipe. Always confirm safe cooking temperatures.</p><button class="primary wide" id="cookModeBtn">▶ Start cook mode</button><button class="secondary wide" id="addRecipeMissing">Add missing ingredients to shopping list</button>`;
$('recipeDetail').querySelectorAll('.gather input').forEach(cb=>cb.addEventListener('change',()=>cb.closest('li').classList.toggle('done',cb.checked)));
$('addRecipeMissing').addEventListener('click',()=>addMissing(r));
$('cookModeBtn').addEventListener('click',()=>startCook(r.title,librarySteps(r),()=>showRecipe(r.id)));
$('recipeDialog').showModal()}
function startCook(title,steps,back){cook={title,steps,idx:0,back};renderCookStep();if(!$('recipeDialog').open)$('recipeDialog').showModal()}
function renderCookStep(){const{title,steps,idx}=cook;const last=idx===steps.length-1;$('recipeDetail').innerHTML=`<p class="hint" style="margin-top:0">COOK MODE · ${escapeHTML(title)}</p><div class="dots">${steps.map((_,i)=>`<span class="dot${i===idx?' on':''}"></span>`).join('')}</div><p class="hint" style="text-align:center">Step ${idx+1} of ${steps.length}</p><div class="cook-step">${escapeHTML(steps[idx])}</div><div class="cook-nav"><button class="secondary" id="cookPrev" ${idx===0?'disabled':''}>← Back</button><button class="primary" id="cookNext">${last?'✓ Finish':'Next step →'}</button></div><button class="secondary wide" id="cookExit">Exit cook mode</button>`;
$('cookPrev').addEventListener('click',()=>{if(cook.idx>0){cook.idx--;renderCookStep()}});
$('cookNext').addEventListener('click',()=>{if(cook.idx<cook.steps.length-1){cook.idx++;renderCookStep()}else{const back=cook.back;cook=null;$('recipeDialog').close();toast('Cooking complete — enjoy your meal! 🎉');if(back)back()}});
$('cookExit').addEventListener('click',()=>{const back=cook.back;cook=null;if(back)back();else $('recipeDialog').close()})}
$('dialogClose').addEventListener('click',()=>$('recipeDialog').close());

// ---- Month plan (tap day = view, 🔀 = swap dish) ----
function toISODate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}const now=new Date();const currentMonth=toISODate(now).slice(0,7);$('monthInput').value=state.month||currentMonth;$('dayDate').value=toISODate(now);$('diet').value=state.diet;$('maxTime').value=state.maxTime;syncPills();$('budget').value=state.budget;$('eatOut').value=state.eatOut;$('avoid').value=state.avoid;$('calorieGoal').value=state.calorieGoal;
function renderMonth(){const grid=$('monthGrid');grid.innerHTML='';if(!state.monthPlan.length){$('monthSummary').innerHTML='<p class="muted">Create a plan to see your calendar.</p>';return}const total=state.monthPlan.filter(x=>x.recipeId!==null).reduce((s,x)=>s+RECIPES[x.recipeId].cost,0);const exceeded=total>state.budget;$('monthSummary').innerHTML=`<div class="summary-card"><strong>${state.monthPlan.length} days planned</strong><div>Estimated home-cooked dinner ingredients: $${total.toFixed(2)} for one serving per dinner ${exceeded?'· Over budget by $'+(total-state.budget).toFixed(2):'· Within target budget'}</div><small>Does not include breakfast, lunch, tax, food waste, pantry quantity or restaurant meals.</small></div>`;const [year,month]=state.planMonth.split('-').map(Number);const blanks=new Date(year,month-1,1).getDay();for(let i=0;i<blanks;i++){const node=document.createElement('div');grid.append(node)}state.monthPlan.forEach((d,i)=>{const r=d.recipeId===null?null:RECIPES[d.recipeId];const box=document.createElement('div');box.className='day-tile'+(!r?' rest':'');if(r){box.dataset.dayIdx=i;box.setAttribute('role','button');box.tabIndex=0}box.innerHTML=`<strong>${i+1}</strong>${r?`<button class="swap" data-swap="${i}" aria-label="Swap dish on day ${i+1}" title="Swap this dish">🔀</button>`:''}<span>${r?`${r.emoji} ${escapeHTML(r.title)}`:'🍽️ Eat out'}</span>`;grid.append(box)})}
function swapDish(i){const dinners=eligible('dinner');if(dinners.length<2){toast('Not enough dinner options to swap');return}const cur=state.monthPlan[i].recipeId;const near=new Set(state.monthPlan.slice(Math.max(0,i-3),i+4).map(x=>x.recipeId));const ranked=[...dinners].sort((a,b)=>a.cost-b.cost);let candidates=ranked.filter(r=>r.id!==cur&&!near.has(r.id));if(!candidates.length)candidates=ranked.filter(r=>r.id!==cur);if(!candidates.length)return;const start=ranked.findIndex(r=>r.id===cur);let next=candidates[0];for(let k=1;k<=ranked.length;k++){const cand=ranked[(start+k)%ranked.length];if(candidates.includes(cand)){next=cand;break}}state.monthPlan[i].recipeId=next.id;persist();renderMonth();toast(`Day ${i+1}: ${next.emoji} ${next.title}`)}
$('monthGrid').addEventListener('click',e=>{const sw=e.target.closest('[data-swap]');if(sw){e.stopPropagation();swapDish(Number(sw.dataset.swap));return}const tile=e.target.closest('[data-day-idx]');if(tile){const d=state.monthPlan[Number(tile.dataset.dayIdx)];if(d&&d.recipeId!==null)showRecipe(d.recipeId)}});
$('generateMonth').addEventListener('click',()=>{const month=$('monthInput').value||currentMonth;const [y,m]=month.split('-').map(Number);const days=new Date(y,m,0).getDate();const dinner=eligible('dinner');if(!dinner.length){toast('No dinner recipes match your restrictions');return}const budget=Math.max(1,Number($('budget').value)||100),eatOut=Math.min(days,Math.max(0,Math.trunc(Number($('eatOut').value)||0)));const ranked=[...dinner].sort((a,b)=>a.cost-b.cost);const plan=[];let current=0;for(let i=0;i<days;i++){const restaurant=eatOut>0&&Math.floor((i+1)*eatOut/days)>Math.floor(i*eatOut/days);let recipe=null;if(!restaurant){let candidates=ranked.filter(r=>!plan.slice(-3).some(p=>p.recipeId===r.id));if(!candidates.length)candidates=ranked;recipe=candidates[current%candidates.length];current++}plan.push({recipeId:recipe?.id??null})}const cost=plan.reduce((sum,p)=>sum+(p.recipeId===null?0:RECIPES[p.recipeId].cost),0);state.month=month;state.planMonth=month;state.budget=budget;state.eatOut=eatOut;state.monthPlan=plan;persist();renderMonth();toast(cost>budget?'Created best-effort plan; cost exceeds target':'Monthly plan created')});

// ---- My Days ----
function renderSelectedDays(){$('selectedDates').innerHTML=state.dayDates.map((d,i)=>`<span class="chip">${escapeHTML(d)} <button data-remove-day="${i}" aria-label="Remove ${escapeHTML(d)}">×</button></span>`).join('')||'<span class="hint">No dates selected yet.</span>'}
$('addDay').addEventListener('click',()=>{const d=$('dayDate').value;if(d&&!state.dayDates.includes(d))state.dayDates.push(d);state.dayDates.sort();persist();renderSelectedDays()});
$('selectedDates').addEventListener('click',e=>{const b=e.target.closest('[data-remove-day]');if(!b)return;state.dayDates.splice(Number(b.dataset.removeDay),1);persist();renderSelectedDays()});
$('generateDays').addEventListener('click',()=>{if(!state.dayDates.length){toast('Select at least one date');return}let sequence=0;const plans=[];for(const date of state.dayDates){const meals=[];for(const meal of ['breakfast','lunch','dinner']){const possible=eligible(meal);if(!possible.length){toast(`No ${meal} recipes match your restrictions`);return}possible.sort((a,b)=>match(b)-match(a));const best=possible[sequence%Math.min(4,possible.length)];sequence++;meals.push({meal,recipeId:best.id})}plans.push({date,meals})}state.dayPlans=plans;persist();renderDayPlans();toast('Meal plan saved')});
function renderDayPlans(){$('dayPlans').innerHTML=state.dayPlans.map(p=>{const kcal=p.meals.reduce((s,m)=>s+RECIPES[m.recipeId].cal,0);const goal=Number(state.calorieGoal);return `<div class="day-plan"><h3>📅 ${escapeHTML(p.date)}</h3><p class="hint" style="margin:0 0 6px">≈ ${kcal} kcal planned${goal>0?` · daily goal ${goal} kcal (${kcal<=goal?'within goal ✓':'over by '+(kcal-goal)+' kcal'})`:''}</p>${p.meals.map(m=>{const r=RECIPES[m.recipeId];return `<div class="meal-row"><div><strong>${m.meal[0].toUpperCase()+m.meal.slice(1)}</strong><div>${r.emoji} ${escapeHTML(r.title)}</div><small class="muted">${r.cal} kcal · P ${r.protein}g · C ${r.carbs}g · F ${r.fat}g</small></div><button class="secondary" data-recipe="${r.id}">Details</button></div>`}).join('')}<button class="secondary wide" data-shop-date="${escapeHTML(p.date)}">Add missing groceries</button></div>`}).join('')||'<p class="muted">Your selected-day plans will appear here.</p>'}
$('dayPlans').addEventListener('click',e=>{const r=e.target.closest('[data-recipe]');if(r)return showRecipe(r.dataset.recipe);const b=e.target.closest('[data-shop-date]');if(b){const plan=state.dayPlans.find(p=>p.date===b.dataset.shopDate);plan?.meals.forEach(m=>RECIPES[m.recipeId].ingredients.filter(i=>!pantryHas(i)).forEach(shoppingAdd));persist();renderShopping();toast('Groceries added')}});

// ---- Shopping ----
function renderShopping(){const total=state.shopping.length;const done=state.shopping.filter(i=>i.done).length;$('shopProgressWrap').hidden=total===0;$('shopProgress').style.width=total?`${Math.round(done/total*100)}%`:'0';$('shopProgressText').textContent=total?`${done} of ${total} bought${done===total?' — all done 🎉':''}`:'';$('shoppingList').innerHTML=total?state.shopping.map((i,n)=>`<div class="shop-item ${i.done?'done':''}"><input type="checkbox" data-shop-check="${n}" ${i.done?'checked':''} aria-label="Mark ${escapeHTML(i.name)} purchased"><span>${escapeHTML(i.name)}</span><button data-shop-remove="${n}" aria-label="Remove ${escapeHTML(i.name)}">×</button></div>`).join(''):'<p class="hint">Your grocery list is empty. Add items or send missing recipe ingredients here.</p>'}
$('shoppingForm').addEventListener('submit',e=>{e.preventDefault();shoppingAdd($('shoppingName').value);$('shoppingName').value='';persist();renderShopping()});
$('shoppingList').addEventListener('change',e=>{if(e.target.matches('[data-shop-check]')){state.shopping[Number(e.target.dataset.shopCheck)].done=e.target.checked;persist();renderShopping()}});
$('shoppingList').addEventListener('click',e=>{const b=e.target.closest('[data-shop-remove]');if(!b)return;state.shopping.splice(Number(b.dataset.shopRemove),1);persist();renderShopping()});
$('clearChecked').addEventListener('click',()=>{state.shopping=state.shopping.filter(i=>!i.done);persist();renderShopping()});
$('shareList').addEventListener('click',async()=>{const content='Fridge Chef shopping list\n'+state.shopping.map(i=>`${i.done?'[x]':'[ ]'} ${i.name}`).join('\n');try{if(navigator.share)await navigator.share({text:content});else if(navigator.clipboard)await navigator.clipboard.writeText(content);else throw Error('No share');toast('List shared or copied')}catch(e){if(e.name!=='AbortError')toast('Use Export backup if copying is unavailable')}});

// ---- Preferences & backup ----
$('savePrefs').addEventListener('click',()=>{state.avoid=$('avoid').value;state.calorieGoal=$('calorieGoal').value;persist();renderRecipes();renderDayPlans();toast('Preferences saved')});
function download(name,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000)}
$('exportData').addEventListener('click',()=>download('fridge-chef-backup.json',new Blob([JSON.stringify(state,null,2)],{type:'application/json'})));
$('importData').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data||typeof data!=='object'||!Array.isArray(data.pantry)||!Array.isArray(data.shopping))throw Error('Invalid backup');state={...defaults,...data};persist();location.reload()}catch{toast('Invalid Fridge Chef backup file')}});
$('exportHTML').addEventListener('click',()=>{const safe=JSON.stringify(state).replace(/</g,'\\u003c');const markup=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fridge Chef offline snapshot</title><style>body{font-family:system-ui;max-width:800px;margin:30px auto;padding:15px;background:#f5f8f2;color:#184a36}section{background:#fff;padding:18px;border-radius:14px;margin:12px 0}li{margin:7px 0}</style></head><body><h1>🥬 Fridge Chef — Offline Snapshot</h1><p>Saved data snapshot. For interactive cooking and planning, open the Fridge Chef app.</p><div id="content"></div><script>const s=${safe};const e=document.getElementById('content');const esc=x=>String(x).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));[['Pantry',s.pantry.map(i=>i.name+' — '+i.qty+' '+i.unit)],['Shopping list',s.shopping.map(i=>(i.done?'✓ ':'□ ')+i.name)],['Selected days',s.dayDates],['Meal plans',s.dayPlans.map(i=>i.date+' — '+i.meals.map(m=>m.meal+' recipe #'+m.recipeId).join(', '))]].forEach(([name,items])=>{const el=document.createElement('section');el.innerHTML='<h2>'+name+'</h2><ul>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';e.append(el)});<\/script></body></html>`;download('fridge-chef-offline-snapshot.html',new Blob([markup],{type:'text/html'}));toast('Offline snapshot saved')});
function connection(){const el=$('connection');el.textContent=navigator.onLine?'● Offline-ready':'● Offline'}addEventListener('online',connection);addEventListener('offline',connection);connection();
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});

// AI suggestions are an optional enhancement. Offline RECIPES, month and day plans stay independent.
const AI_KEY='fridge-chef-ai-v1';let aiRecipes=[];
try { const saved=JSON.parse(localStorage.getItem(AI_KEY)||'[]');if(Array.isArray(saved))aiRecipes=saved.slice(0,3) } catch {}
const aiStatus=$('aiStatus');const aiButton=$('generateAI');
function aiAllowed(r){
  const ingredients=r.ingredients.map(x=>String(x).toLowerCase());
  const joined=ingredients.join(' | ');
  // Conservative screening supplements server validation; always manually check allergens.
  const meat=/(\bchicken\b|\bbeef\b|\bpork\b|\bbacon\b|\bham\b|\bturkey\b|\blamb\b|\bgelatin\b|\bmeat\b|\bfish\b|\btuna\b|\bsalmon\b|\bshrimp\b|\bprawn\b|\boyster\b|\bancho(vy|vies)\b)/i;
  const egg=/(\begg(s)?\b|\bmayonnaise\b|\bmayo\b)/i;
  const dairy=/(\bmilk\b|\bcheese\b|\bbutter\b|\byogurt\b|\bcream\b|\bghee\b|\bwhey\b|\bcasein\b|\bhoney\b)/i;
  if(['vegetarian','no-eggs','vegan'].includes(state.diet)&&meat.test(joined))return false;
  if(['no-eggs','vegan'].includes(state.diet)&&egg.test(joined))return false;
  if(state.diet==='vegan'&&dairy.test(joined))return false;
  const avoids=state.avoid.toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);
  return !avoids.some(x=>ingredients.some(i=>i.includes(x)));
}
function renderAI(){
 const list=aiRecipes.filter(r=>aiAllowed(r));
 $('aiRecipes').innerHTML=list.length?list.map((r,i)=>`<article class="recipe" data-ai="${i}" style="--d:${i*60}ms" tabindex="0" role="button" aria-label="${escapeHTML(r.title)}"><span class="emoji">✨</span><h3>${escapeHTML(r.title)}</h3><p>${escapeHTML(r.benefits)}</p><div class="meta"><span class="tag">⏱ ${r.time} min</span><span class="tag">~${r.cal} kcal</span><span class="tag">${escapeHTML(r.meal)}</span></div><button class="secondary" data-ai="${i}">View recipe</button></article>`).join(''):(mode==='ai'?'<div class="panel">No AI ideas yet — tap “Generate 3 AI recipes” above.</div>':'');
 if(mode==='ai')$('recipeCount').textContent=list.length?`${list.length} AI idea${list.length===1?'':'s'}`:'';
}
function showAI(r){
 const d=$('recipeDetail');cook=null;d.innerHTML=`<div style="font-size:58px">✨</div><h2>${escapeHTML(r.title)}</h2><p>${escapeHTML(r.benefits)}</p><p>${r.time} minutes · Estimated ${r.cal} kcal · Protein ${r.protein}g · Carbs ${r.carbs}g · Fat ${r.fat}g</p><h3>Gather your ingredients</h3><ul class="gather">${r.ingredients.map(i=>`<li><input type="checkbox" aria-label="Gathered ${escapeHTML(i)}"><span>${escapeHTML(i)} ${pantryHas(i)?'✓ in your fridge':''}</span></li>`).join('')}</ul><p class="hint">AI estimates are not verified nutrition facts. Confirm labels, allergens and safe cooking temperatures.</p><button class="primary wide" id="aiCookBtn">▶ Start cook mode</button><button class="secondary wide" id="aiShop">Add missing ingredient names to shopping list</button>`;
 d.querySelectorAll('.gather input').forEach(cb=>cb.addEventListener('change',()=>cb.closest('li').classList.toggle('done',cb.checked)));
 $('aiShop').addEventListener('click',()=>{r.ingredients.filter(i=>!pantryHas(i)).forEach(shoppingAdd);persist();renderShopping();toast('Ingredients added')});
 $('aiCookBtn').addEventListener('click',()=>startCook(r.title,[`Gather everything: ${r.ingredients.join(', ')}.`,...r.steps],()=>showAI(r)));
 $('recipeDialog').showModal();
}
$('aiRecipes').addEventListener('click',e=>{const b=e.target.closest('[data-ai]');if(!b)return;const visible=aiRecipes.filter(r=>aiAllowed(r));if(visible[Number(b.dataset.ai)])showAI(visible[Number(b.dataset.ai)])});
function aiSkeleton(){$('aiRecipes').innerHTML=Array.from({length:3},()=>'<div class="skeleton"><div class="sk" style="width:44px;height:44px;border-radius:12px"></div><div class="sk" style="height:18px;margin-top:14px;width:75%"></div><div class="sk" style="height:13px;margin-top:10px;width:95%"></div><div class="sk" style="height:13px;margin-top:8px;width:60%"></div><div class="sk" style="height:36px;margin-top:16px"></div></div>').join('');$('recipeCount').textContent='Thinking…'}
aiButton.addEventListener('click',async()=>{
 syncFiltersFromUI();renderRecipes();setMode('ai');
 if(!navigator.onLine){aiStatus.textContent='Offline: enjoy the built-in recipes below or previously saved AI ideas.';renderAI();return}
 aiButton.disabled=true;aiStatus.textContent='Generating personalized recipes…';aiSkeleton();const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),28000);
 try{
  const res=await fetch('/api/recipes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pantry:state.pantry.slice(0,35),diet:state.diet,meal:state.mealType,maxTime:Number(state.maxTime),avoid:state.avoid.slice(0,250)}),signal:ctrl.signal,cache:'no-store'});
  if(!res.ok)throw Error(res.status===429?'Rate limit reached':res.status===503?'AI is not configured':'AI unavailable');
  const body=await res.json();if(!Array.isArray(body.recipes))throw Error('Invalid response');
  const clean=body.recipes.filter(r=>r&&typeof r.title==='string'&&Array.isArray(r.ingredients)&&Array.isArray(r.steps)&&Number.isFinite(r.cal)&&Number.isFinite(r.time)&&r.time<=Number(state.maxTime)&&aiAllowed(r));
  if(!clean.length)throw Error('No AI suggestions met your dietary filters');
  aiRecipes=clean.slice(0,3);localStorage.setItem(AI_KEY,JSON.stringify(aiRecipes));renderAI();aiStatus.textContent=`${aiRecipes.length} AI recipe(s) generated with ${body.provider==='groq'?'Groq (backup)':'Gemini'} and saved for offline viewing.`;
 }catch(err){aiStatus.textContent=`${err.message||'Could not connect'}. Built-in offline recipes remain in the Library tab.`;renderAI()}
 finally{clearTimeout(timer);aiButton.disabled=false}
});
addEventListener('offline',()=>{aiStatus.textContent='Offline: built-in recipes and saved AI ideas available.'});

// ---- Theme (System / Light / Dark) ----
const THEME_KEY='fridge-chef-theme';
function themePref(){try{return localStorage.getItem(THEME_KEY)||'system'}catch(e){return 'system'}}
function resolvedTheme(p){return p==='dark'?'dark':p==='light'?'light':(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function applyTheme(p){
 const r=resolvedTheme(p);document.documentElement.dataset.theme=r;
 const t=$('themeToggle');if(t){t.textContent=r==='dark'?'☀️ Light':'🌙 Dark';t.setAttribute('aria-label','Switch to '+(r==='dark'?'light':'dark')+' mode')}
 document.querySelectorAll('[data-theme-opt]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeOpt===p)));
 const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',r==='dark'?'#0e1712':'#174d3b');
}
function setTheme(p){try{localStorage.setItem(THEME_KEY,p)}catch(e){}applyTheme(p)}
const themeToggleEl=$('themeToggle');
if(themeToggleEl)themeToggleEl.addEventListener('click',()=>setTheme(resolvedTheme(themePref())==='dark'?'light':'dark'));
document.querySelectorAll('[data-theme-opt]').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.themeOpt)));
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(themePref()==='system')applyTheme('system')});
applyTheme(themePref());

// ---- Initial render ----
renderPantry();renderRecipes();renderMonth();renderSelectedDays();renderDayPlans();renderShopping();renderAI();
