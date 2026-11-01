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
const CUISINE_GROUPS={
  'Indian regional':['Punjabi','Gujarati','Rajasthani','Maharashtrian','Bengali','Kashmiri','Goan','Hyderabadi','Kerala','Tamil','Andhra','Telangana','Karnataka'],
  'Indian food styles':['Indian Street Food','Indian Fast Food','Indian Chaat','Indo-Chinese','North Indian Dhaba','South Indian Tiffin','Mughlai'],
  'International':['Italian','Mexican','Chinese','Japanese','Thai','Korean','Vietnamese','Mediterranean','Greek','Turkish','Lebanese','American','French']
};
const ALL_CUISINES=Object.values(CUISINE_GROUPS).flat();
// Each bundled recipe has a curated cuisine tag; generic dishes are not mislabelled.
const OFFLINE_CUISINE_TAGS={
  'Cheesy Bean Quesadilla':['Mexican'],'Vegetable Fried Rice':['Chinese','Indo-Chinese'],'Pasta with Tomato Sauce':['Italian'],
  'Black Bean Burrito Bowl':['Mexican'],'Garlic Mushroom Pasta':['Italian'],'Tofu Stir Fry':['Chinese'],
  'Chicken Rice Bowl':['American'],'Tuna Sandwich':['American'],'Greek Yogurt Fruit Bowl':['Greek']
};
const EXTRA_DISHES=[
 ['Punjabi Chole','🍛','dinner',40,['chickpeas','onion','tomato','ginger','garlic','garam masala'],2.2,'vegan',['Punjabi','North Indian Dhaba']],
 ['Punjabi Rajma Chawal','🍚','dinner',40,['kidney beans','rice','onion','tomato','garam masala'],2.5,'vegan',['Punjabi']],
 ['Aloo Paratha','🫓','breakfast',30,['flour','potato','cilantro','cumin','oil'],1.8,'vegan',['Punjabi','North Indian Dhaba']],
 ['Gujarati Sev Tameta','🍅','dinner',25,['tomato','sev','onion','turmeric','chili powder'],2.3,'vegan',['Gujarati']],
 ['Gujarati Dal Rice','🥣','dinner',35,['toor dal','rice','tomato','jaggery','turmeric'],2.1,'vegan',['Gujarati']],
 ['Gujarati Thepla','🫓','breakfast',25,['flour','fenugreek leaves','yogurt','turmeric'],1.7,'vegetarian',['Gujarati']],
 ['Pav Bhaji','🍞','dinner',35,['potato','peas','tomato','onion','pav','pav bhaji masala'],2.8,'vegan',['Indian Street Food','Indian Fast Food','Maharashtrian']],
 ['Bhel Puri','🥗','lunch',15,['puffed rice','sev','onion','tomato','tamarind chutney'],1.8,'vegan',['Indian Street Food','Indian Chaat','Indian Fast Food']],
 ['Masala Dosa','🥞','breakfast',35,['dosa batter','potato','onion','mustard seeds'],2.4,'vegan',['Tamil','Karnataka','South Indian Tiffin']],
 ['Idli Sambar','🥣','breakfast',35,['idli batter','toor dal','carrot','tamarind','sambar powder'],2.4,'vegan',['Tamil','Karnataka','South Indian Tiffin']],
 ['Kerala Vegetable Stew','🥥','dinner',35,['coconut milk','potato','carrot','green beans','ginger'],2.9,'vegan',['Kerala']],
 ['Andhra Tomato Pappu','🍲','dinner',30,['toor dal','tomato','green chili','turmeric'],2.1,'vegan',['Andhra','Telangana']],
 ['Rajasthani Gatte Curry','🍛','dinner',40,['besan','yogurt','cumin','turmeric','chili powder'],2.6,'vegetarian',['Rajasthani']],
 ['Maharashtrian Misal Pav','🍞','lunch',40,['sprouted beans','onion','tomato','pav','misal masala'],2.6,'vegan',['Maharashtrian','Indian Street Food']],
 ['Bengali Cholar Dal','🥣','dinner',40,['chana dal','coconut','ginger','cumin'],2.3,'vegan',['Bengali']],
 ['Kashmiri Dum Aloo','🥔','dinner',40,['potato','yogurt','fennel','ginger'],2.8,'vegetarian',['Kashmiri']],
 ['Goan Coconut Vegetable Curry','🥥','dinner',35,['coconut milk','mixed vegetables','tamarind','garlic'],2.9,'vegan',['Goan']],
 ['Hyderabadi Vegetable Biryani','🍚','dinner',45,['basmati rice','mixed vegetables','mint','yogurt','biryani masala'],3.2,'vegetarian',['Hyderabadi']],
 ['Karnataka Bisi Bele Bath','🍚','dinner',40,['rice','toor dal','mixed vegetables','tamarind','bisi bele bath powder'],2.5,'vegan',['Karnataka']],
 ['Indo-Chinese Veg Hakka Noodles','🍜','dinner',25,['noodles','cabbage','carrot','soy sauce','garlic'],2.6,'vegan',['Indo-Chinese','Indian Fast Food']],
 ['Mughlai Vegetable Korma','🍛','dinner',40,['mixed vegetables','cashews','yogurt','garam masala'],3.4,'vegetarian',['Mughlai']],
 ['Thai Basil Tofu','🥬','dinner',25,['tofu','basil','garlic','soy sauce','rice'],3.2,'vegan',['Thai']],
 ['Japanese Vegetable Miso Soup','🍜','lunch',20,['miso','tofu','mushrooms','scallions'],2.8,'vegan',['Japanese']],
 ['Korean Bibimbap Bowl','🍚','dinner',35,['rice','spinach','carrot','mushrooms','gochujang'],3.0,'vegan',['Korean']],
 ['Vietnamese Rice Noodle Salad','🥗','lunch',25,['rice noodles','cucumber','carrot','mint','lime'],2.8,'vegan',['Vietnamese']],
 ['Mediterranean Chickpea Bowl','🥗','lunch',20,['chickpeas','cucumber','tomato','lemon','olive oil'],2.6,'vegan',['Mediterranean','Lebanese']],
 ['Turkish Lentil Soup','🥣','lunch',30,['red lentils','onion','carrot','tomato paste'],2.0,'vegan',['Turkish']],
 ['French Ratatouille','🍆','dinner',40,['eggplant','zucchini','tomato','onion','olive oil'],2.7,'vegan',['French']],
 ['American Bean Chili','🥣','dinner',35,['kidney beans','tomato','onion','chili powder'],2.4,'vegan',['American']]
];
EXTRA_DISHES.forEach(([title,emoji,meal,time,ingredients,cost,diet,cuisines])=>RECIPES.push({id:RECIPES.length,title,emoji,meal,time,cal:400,protein:14,carbs:56,fat:13,ingredients,cost,diet,benefits:'Cuisine-specific home-cooked meal; nutrition estimated',cuisines}));
RECIPES.forEach(r=>{r.cuisines??=OFFLINE_CUISINE_TAGS[r.title]||[]});

const KEY='fridge-chef-data-v1';const defaults={pantry:[],diet:'any',mealType:'any',maxTime:'120',month:'',budget:100,eatOut:4,monthPlan:[],planMonth:'',dayDates:[],dayPlans:[],shopping:[],avoid:'',calorieGoal:'',cuisines:[],cuisineMode:'mix'};
let state;try{state={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{state={...defaults}};
state.diet=Object.hasOwn(FridgeDiet.labels,state.diet)?state.diet:'any';
state.cuisines=Array.isArray(state.cuisines)?state.cuisines.filter(x=>ALL_CUISINES.includes(x)):[];state.cuisineMode=['mix','rotate','single'].includes(state.cuisineMode)?state.cuisineMode:'mix';
delete state.aiProvider; // discard legacy provider preference
const $=id=>document.getElementById(id);const persist=()=>localStorage.setItem(KEY,JSON.stringify(state));const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let toastTimer;function toast(message){$('toast').textContent=message;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600)}
function tab(name){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===name));document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('selected',b.dataset.tab===name));scrollTo({top:0,behavior:'smooth'})}document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.tab)));
function valid(r){return FridgeDiet.allowed(r,state.diet,state.avoid)}
function eligible(meal='any',time=120){return RECIPES.filter(r=>(!state.cuisines.length||r.cuisines.some(c=>state.cuisines.includes(c)))&&valid(r)&&(meal==='any'||r.meal===meal)&&r.time<=time)}
function pantryHas(name){return state.pantry.some(p=>p.name.toLowerCase()===name.toLowerCase())}function match(r){return r.ingredients.filter(pantryHas).length}
function renderCuisines(){
 const q=$('cuisineSearch').value.trim().toLowerCase();
 $('cuisineCount').textContent=state.cuisines.length?`${state.cuisines.length} selected`:'All cuisines';
 $('cuisineMode').value=state.cuisineMode;
 $('cuisineOptions').innerHTML=Object.entries(CUISINE_GROUPS).map(([group,names])=>{const shown=names.filter(n=>n.toLowerCase().includes(q));return shown.length?`<div class="cuisine-group"><h3>${escapeHTML(group)}</h3><div class="cuisine-chips">${shown.map(n=>`<button type="button" class="cuisine-chip ${state.cuisines.includes(n)?'active':''}" data-cuisine="${escapeHTML(n)}" aria-pressed="${state.cuisines.includes(n)}">${state.cuisines.includes(n)?'✓ ':''}${escapeHTML(n)}</button>`).join('')}</div></div>`:''}).join('')||'<p class="hint">No cuisines match your search.</p>';
 $('cuisineNotice').textContent=state.cuisines.length?`Recipes and menus are restricted to ${state.cuisines.join(', ')}. If no offline recipes match a meal, the app will explain rather than substitute.`:'No selection means all cuisines.';
}
function refreshCuisine(){persist();renderCuisines();renderRecipes();renderAI?.()}
$('cuisineSearch').addEventListener('input',renderCuisines);
$('cuisineOptions').addEventListener('click',e=>{const b=e.target.closest('[data-cuisine]');if(!b)return;const n=b.dataset.cuisine;state.cuisines=state.cuisines.includes(n)?state.cuisines.filter(x=>x!==n):[...state.cuisines,n];refreshCuisine()});
$('clearCuisines').addEventListener('click',()=>{state.cuisines=[];refreshCuisine()});
$('selectVisibleCuisines').addEventListener('click',()=>{const q=$('cuisineSearch').value.trim().toLowerCase();state.cuisines=[...new Set([...state.cuisines,...ALL_CUISINES.filter(n=>n.toLowerCase().includes(q))])];refreshCuisine()});
$('cuisineMode').addEventListener('change',e=>{state.cuisineMode=e.target.value;refreshCuisine()});

function updateDiet(next){
 if(!Object.hasOwn(FridgeDiet.labels,next))next='any';
 if(state.diet!==next){state.diet=next;state.monthPlan=[];state.dayPlans=[];toast('Diet updated; regenerate menus to apply your restrictions');}
 $('diet').value=state.diet;$('dietPreference').value=state.diet;
 persist();
}
$('diet').addEventListener('change',e=>{updateDiet(e.target.value);renderRecipes();renderAI();renderMonth();renderDayPlans()});
$('dietPreference').addEventListener('change',e=>{updateDiet(e.target.value);renderRecipes();renderAI();renderMonth();renderDayPlans()});

function renderPantry(){$('pantryCount').textContent=`${state.pantry.length} ingredients`;$('ingredientChips').innerHTML=state.pantry.length?state.pantry.map((p,i)=>`<span class="chip">${escapeHTML(p.name)} · ${escapeHTML(p.qty)} ${escapeHTML(p.unit)} <button aria-label="Remove ${escapeHTML(p.name)}" data-remove-pantry="${i}">×</button></span>`).join(''):'<p class="hint">Add a few ingredients to start matching recipes.</p>'}
$('ingredientForm').addEventListener('submit',e=>{e.preventDefault();const name=$('ingredientName').value.trim().toLowerCase();if(!name)return;const qty=Number($('ingredientQty').value);if(!(qty>0))return;const existing=state.pantry.find(p=>p.name===name);if(existing){existing.qty=qty;existing.unit=$('ingredientUnit').value}else state.pantry.push({name,qty,unit:$('ingredientUnit').value});persist();renderPantry();$('ingredientForm').reset();$('ingredientQty').value=1;toast('Ingredient saved')});$('ingredientChips').addEventListener('click',e=>{const b=e.target.closest('[data-remove-pantry]');if(!b)return;state.pantry.splice(Number(b.dataset.removePantry),1);persist();renderPantry()});
function renderRecipes() {const arr=eligible(state.mealType,Number(state.maxTime)).sort((a,b)=>match(b)-match(a)||a.cost-b.cost);$('recipeCount').textContent=`${arr.length} ideas · ${FridgeDiet.labels[state.diet]}`;$('recipes').innerHTML=arr.length?arr.map(r=>`<article class="recipe"><span class="emoji">${r.emoji}</span><h3>${escapeHTML(r.title)}</h3><p>${escapeHTML(r.benefits)}</p><div class="meta"><span class="tag">⏱ ${r.time} min</span><span class="tag">${r.cal} kcal</span><span class="tag">${match(r)}/${r.ingredients.length} ingredients</span></div><button class="secondary" data-recipe="${r.id}">View recipe</button></article>`).join(''):'<div class="panel">No matches. Try another meal, time limit, or diet.</div>'}
function shoppingAdd(name){const n=name.trim();if(!n||state.shopping.some(i=>i.name.toLowerCase()===n.toLowerCase()))return;state.shopping.push({name:n,done:false})}function addMissing(r){r.ingredients.filter(n=>!pantryHas(n)).forEach(shoppingAdd);persist();renderShopping();toast('Missing ingredients added to shopping list')}
function showRecipe(id){const r=RECIPES.find(r=>r.id===Number(id));if(!r)return;$('recipeDetail').innerHTML=`<div style="font-size:58px">${r.emoji}</div><h2>${escapeHTML(r.title)}</h2><p>${escapeHTML(r.benefits)}</p><p><strong>Time:</strong> ${r.time} min · <strong>Estimated cost:</strong> $${r.cost.toFixed(2)}/serving</p><p><strong>Nutrition/serving:</strong> ${r.cal} kcal · ${r.protein}g protein · ${r.carbs}g carbs · ${r.fat}g fat</p><h3>Ingredients</h3><ul>${r.ingredients.map(i=>`<li>${escapeHTML(i)} ${pantryHas(i)?'✓':'(add to shopping list)'}</li>`).join('')}</ul><h3>Simple preparation</h3><p>Prepare and wash ingredients. Cook the main ingredient until fully done, adding aromatics and vegetables as appropriate. Season to taste and serve. Follow safe cooking temperatures for animal products.</p><p class="hint">Quantities and cooking instructions are general guidance, not tested instructions for a particular recipe.</p><button class="primary wide" id="addRecipeMissing">Add missing ingredients to shopping list</button>`;$('addRecipeMissing').addEventListener('click',()=>addMissing(r));$('recipeDialog').showModal()}
$('recipes').addEventListener('click',e=>{const b=e.target.closest('[data-recipe]');if(b)showRecipe(b.dataset.recipe)});$('suggestBtn').addEventListener('click',()=>{updateDiet($('diet').value);state.mealType=$('mealType').value;state.maxTime=$('maxTime').value;persist();renderRecipes();toast('Recipes updated')});
function toISODate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}const now=new Date();const currentMonth=toISODate(now).slice(0,7);$('monthInput').value=state.month||currentMonth;$('dayDate').value=toISODate(now);$('diet').value=state.diet;$('dietPreference').value=state.diet;$('mealType').value=state.mealType;$('maxTime').value=state.maxTime;$('budget').value=state.budget;$('eatOut').value=state.eatOut;$('avoid').value=state.avoid;$('calorieGoal').value=state.calorieGoal;
function renderMonth(){const grid=$('monthGrid');grid.innerHTML='';if(!state.monthPlan.length){$('monthSummary').innerHTML='<p class="muted">Create a plan to see your calendar.</p>';return}const total=state.monthPlan.filter(x=>x.recipeId!==null).reduce((s,x)=>s+RECIPES[x.recipeId].cost,0);const exceeded=total>state.budget;$('monthSummary').innerHTML=`<div class="summary-card"><strong>${state.monthPlan.length} days planned</strong><div>Estimated home-cooked dinner ingredients: $${total.toFixed(2)} for one serving per dinner ${exceeded?'· Over budget by $'+(total-state.budget).toFixed(2):'· Within target budget'}</div><small>Does not include breakfast, lunch, tax, food waste, pantry quantity or restaurant meals.</small></div>`;const [year,month]=state.planMonth.split('-').map(Number);const blanks=new Date(year,month-1,1).getDay();for(let i=0;i<blanks;i++){const node=document.createElement('div');grid.append(node)}state.monthPlan.forEach((d,i)=>{const candidate=d.recipeId===null?null:RECIPES[d.recipeId];const r=candidate&&valid(candidate)?candidate:null;const box=document.createElement('div');box.className='day-tile'+(!r?' rest':'');box.innerHTML=`<strong>${i+1}</strong><span>${r?`${r.emoji} ${escapeHTML(r.title)}`:'🍽️ Eat out'}</span>`;if(r){box.role='button';box.tabIndex=0;box.addEventListener('click',()=>showRecipe(r.id));box.addEventListener('keydown',e=>{if(e.key==='Enter')showRecipe(r.id)})}grid.append(box)})}
$('generateMonth').addEventListener('click',()=>{const month=$('monthInput').value||currentMonth;const [y,m]=month.split('-').map(Number);const days=new Date(y,m,0).getDate();const dinner=eligible('dinner');if(!dinner.length){toast('No dinner recipes match your restrictions');return}const budget=Math.max(1,Number($('budget').value)||100),eatOut=Math.min(days,Math.max(0,Math.trunc(Number($('eatOut').value)||0)));const ranked=[...dinner].sort((a,b)=>a.cost-b.cost);const plan=[];let current=0;for(let i=0;i<days;i++){const restaurant=eatOut>0&&Math.floor((i+1)*eatOut/days)>Math.floor(i*eatOut/days);let recipe=null;if(!restaurant){let candidates=ranked.filter(r=>!plan.slice(-3).some(p=>p.recipeId===r.id));if(!candidates.length)candidates=ranked;if(state.cuisines.length&&state.cuisineMode!=='mix'){const target=state.cuisines[state.cuisineMode==='single'?0:current%state.cuisines.length];const scoped=candidates.filter(r=>r.cuisines.includes(target));if(scoped.length)candidates=scoped;}recipe=candidates[current%candidates.length];current++}plan.push({recipeId:recipe?.id??null})}const cost=plan.reduce((sum,p)=>sum+(p.recipeId===null?0:RECIPES[p.recipeId].cost),0);state.month=month;state.planMonth=month;state.budget=budget;state.eatOut=eatOut;state.monthPlan=plan;persist();renderMonth();toast(cost>budget?'Created best-effort plan; cost exceeds target':'Monthly plan created')});
function renderSelectedDays(){$('selectedDates').innerHTML=state.dayDates.map((d,i)=>`<span class="chip">${escapeHTML(d)} <button data-remove-day="${i}" aria-label="Remove ${escapeHTML(d)}">×</button></span>`).join('')||'<span class="hint">No dates selected yet.</span>'}
$('addDay').addEventListener('click',()=>{const d=$('dayDate').value;if(d&&!state.dayDates.includes(d))state.dayDates.push(d);state.dayDates.sort();persist();renderSelectedDays()});$('selectedDates').addEventListener('click',e=>{const b=e.target.closest('[data-remove-day]');if(!b)return;state.dayDates.splice(Number(b.dataset.removeDay),1);persist();renderSelectedDays()});
$('generateDays').addEventListener('click',()=>{if(!state.dayDates.length){toast('Select at least one date');return}let sequence=0;const plans=[];for(const date of state.dayDates){const meals=[];for(const meal of ['breakfast','lunch','dinner']){const possible=eligible(meal);if(!possible.length){toast(`No ${meal} recipes match your diet`);return}possible.sort((a,b)=>match(b)-match(a));const target=state.cuisines.length?(state.cuisineMode==='single'?state.cuisines[0]:state.cuisineMode==='rotate'?state.cuisines[sequence%state.cuisines.length]:null):null;const scoped=target?possible.filter(r=>r.cuisines.includes(target)):possible;const pool=scoped.length?scoped:possible;const best=pool[sequence%Math.min(4,pool.length)];sequence++;meals.push({meal,recipeId:best.id})}plans.push({date,meals})}state.dayPlans=plans;persist();renderDayPlans();toast('Meal plan saved')});
function renderDayPlans(){$('dayPlans').innerHTML=state.dayPlans.map(p=>`<div class="day-plan"><h3>📅 ${escapeHTML(p.date)}</h3>${p.meals.map(m=>{const r=RECIPES[m.recipeId];if(!r||!valid(r))return '';return `<div class="meal-row"><div><strong>${m.meal[0].toUpperCase()+m.meal.slice(1)}</strong><div>${r.emoji} ${escapeHTML(r.title)}</div><small class="muted">${r.cal} kcal · P ${r.protein}g · C ${r.carbs}g · F ${r.fat}g</small></div><button class="secondary" data-recipe="${r.id}">Details</button></div>`}).join('')}<button class="secondary wide" data-shop-date="${escapeHTML(p.date)}">Add missing groceries</button></div>`).join('')||'<p class="muted">Your selected-day plans will appear here.</p>'}
$('dayPlans').addEventListener('click',e=>{const r=e.target.closest('[data-recipe]');if(r)return showRecipe(r.dataset.recipe);const b=e.target.closest('[data-shop-date]');if(b){const plan=state.dayPlans.find(p=>p.date===b.dataset.shopDate);plan?.meals.forEach(m=>RECIPES[m.recipeId].ingredients.filter(i=>!pantryHas(i)).forEach(shoppingAdd));persist();renderShopping();toast('Groceries added')}});
function renderShopping(){$('shoppingList').innerHTML=state.shopping.length?state.shopping.map((i,n)=>`<div class="shop-item ${i.done?'done':''}"><input type="checkbox" data-shop-check="${n}" ${i.done?'checked':''} aria-label="Mark ${escapeHTML(i.name)} purchased"><span>${escapeHTML(i.name)}</span><button data-shop-remove="${n}" aria-label="Remove ${escapeHTML(i.name)}">×</button></div>`).join(''):'<p class="hint">Your grocery list is empty. Add items or send missing recipe ingredients here.</p>'}
$('shoppingForm').addEventListener('submit',e=>{e.preventDefault();shoppingAdd($('shoppingName').value);$('shoppingName').value='';persist();renderShopping()});$('shoppingList').addEventListener('change',e=>{if(e.target.matches('[data-shop-check]')){state.shopping[Number(e.target.dataset.shopCheck)].done=e.target.checked;persist();renderShopping()}});$('shoppingList').addEventListener('click',e=>{const b=e.target.closest('[data-shop-remove]');if(!b)return;state.shopping.splice(Number(b.dataset.shopRemove),1);persist();renderShopping()});$('clearChecked').addEventListener('click',()=>{state.shopping=state.shopping.filter(i=>!i.done);persist();renderShopping()});$('shareList').addEventListener('click',async()=>{const content='Fridge Chef shopping list\n'+state.shopping.map(i=>`${i.done?'[x]':'[ ]'} ${i.name}`).join('\n');try{if(navigator.share)await navigator.share({text:content});else if(navigator.clipboard)await navigator.clipboard.writeText(content);else throw Error('No share');toast('List shared or copied')}catch(e){if(e.name!=='AbortError')toast('Use Export backup if copying is unavailable')}});
$('savePrefs').addEventListener('click',()=>{updateDiet($('dietPreference').value);if(state.avoid!==$('avoid').value){state.monthPlan=[];state.dayPlans=[];}state.avoid=$('avoid').value;state.calorieGoal=$('calorieGoal').value;persist();renderRecipes();renderAI();renderMonth();renderDayPlans();toast('Preferences saved')});function download(name,blob){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000)}$('exportData').addEventListener('click',()=>download('fridge-chef-backup.json',new Blob([JSON.stringify(state,null,2)],{type:'application/json'})));$('importData').addEventListener('change',async e=>{const f=e.target.files?.[0];if(!f)return;try{const data=JSON.parse(await f.text());if(!data||typeof data!=='object'||!Array.isArray(data.pantry)||!Array.isArray(data.shopping))throw Error('Invalid backup');state={...defaults,...data};state.diet=Object.hasOwn(FridgeDiet.labels,state.diet)?state.diet:'any';state.monthPlan=[];state.dayPlans=[];persist();location.reload()}catch{toast('Invalid Fridge Chef backup file')}});
$('exportHTML').addEventListener('click',()=>{const safe=JSON.stringify(state).replace(/</g,'\\u003c');const markup=`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Fridge Chef offline snapshot</title><style>body{font-family:system-ui;max-width:800px;margin:30px auto;padding:15px;background:#f5f8f2;color:#184a36}section{background:#fff;padding:18px;border-radius:14px;margin:12px 0}li{margin:7px 0}</style></head><body><h1>🥬 Fridge Chef — Offline Snapshot</h1><p>Saved data snapshot. For interactive cooking and planning, open the Fridge Chef app.</p><div id="content"></div><script>const s=${safe};const e=document.getElementById('content');const esc=x=>String(x).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));[['Pantry',s.pantry.map(i=>i.name+' — '+i.qty+' '+i.unit)],['Shopping list',s.shopping.map(i=>(i.done?'✓ ':'□ ')+i.name)],['Selected days',s.dayDates],['Meal plans',s.dayPlans.map(i=>i.date+' — '+i.meals.map(m=>m.meal+' recipe #'+m.recipeId).join(', '))]].forEach(([name,items])=>{const el=document.createElement('section');el.innerHTML='<h2>'+name+'</h2><ul>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';e.append(el)});<\/script></body></html>`;download('fridge-chef-offline-snapshot.html',new Blob([markup],{type:'text/html'}));toast('Offline snapshot saved')});
function connection(){const el=$('connection');el.textContent=navigator.onLine?'● Offline-ready':'● Offline';el.style.background=navigator.onLine?'#e7f1e7':'#fff0d7'}addEventListener('online',connection);addEventListener('offline',connection);connection();
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});

// AI suggestions are an optional enhancement. Offline RECIPES, month and day plans stay independent.
const AI_KEY='fridge-chef-ai-v1';let aiRecipes=[];
try { const saved=JSON.parse(localStorage.getItem(AI_KEY)||'[]');if(Array.isArray(saved))aiRecipes=saved.slice(0,3) } catch {}
const aiStatus=$('aiStatus');const aiButton=$('generateAI');
function aiAllowed(r){return FridgeDiet.allowed(r,state.diet,state.avoid)}
function renderAI(){
 const list=aiRecipes.filter(r=>aiAllowed(r));
 $('aiRecipes').innerHTML=list.map((r,i)=>`<article class="recipe"><span class="emoji">✨</span><h3>${escapeHTML(r.title)}</h3><p>${escapeHTML(r.benefits)}</p><div class="meta"><span class="tag">⏱ ${r.time} min</span><span class="tag">~${r.cal} kcal</span><span class="tag">${escapeHTML(r.meal)}</span></div><button class="secondary" data-ai="${i}">View recipe</button></article>`).join('');
}
function showAI(r){
 const d=$('recipeDetail');d.innerHTML=`<h2>${escapeHTML(r.title)}</h2><p>${escapeHTML(r.benefits)}</p><p>${r.time} minutes · Estimated ${r.cal} kcal · Protein ${r.protein}g · Carbs ${r.carbs}g · Fat ${r.fat}g</p><h3>Ingredients</h3><ul>${r.ingredients.map(i=>`<li>${escapeHTML(i)}</li>`).join('')}</ul><h3>Instructions</h3><ol>${r.steps.map(i=>`<li>${escapeHTML(i)}</li>`).join('')}</ol><p class="hint">AI estimates are not verified nutrition facts. Confirm labels, allergens and safe cooking temperatures.</p><button class="primary wide" id="aiShop">Add missing ingredient names to shopping list</button>`;
 $('aiShop').addEventListener('click',()=>{r.ingredients.filter(i=>!pantryHas(i)).forEach(shoppingAdd);persist();renderShopping();toast('Ingredients added')});$('recipeDialog').showModal();
}
$('aiRecipes').addEventListener('click',e=>{const b=e.target.closest('[data-ai]');if(!b)return;const visible=aiRecipes.filter(r=>aiAllowed(r));if(visible[Number(b.dataset.ai)])showAI(visible[Number(b.dataset.ai)])});
aiButton.addEventListener('click',async()=>{
 updateDiet($('diet').value);state.mealType=$('mealType').value;state.maxTime=$('maxTime').value;persist();renderRecipes();renderAI();
 if(!navigator.onLine){aiStatus.textContent='Offline: enjoy the built-in recipes below or previously saved AI ideas.';return}
 aiButton.disabled=true;aiStatus.textContent='Generating personalized recipes…';const ctrl=new AbortController();const timer=setTimeout(()=>ctrl.abort(),28000);
 try{
  const res=await fetch('/api/recipes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pantry:state.pantry.slice(0,35),diet:state.diet,meal:state.mealType,maxTime:Number(state.maxTime),avoid:state.avoid.slice(0,250),cuisines:state.cuisines.slice(0,15),cuisineMode:state.cuisineMode}),signal:ctrl.signal,cache:'no-store'});
  if(!res.ok)throw Error(res.status===429?'Rate limit reached':res.status===503?'AI is not configured':'AI unavailable');
  const body=await res.json();if(!Array.isArray(body.recipes))throw Error('Invalid response');
  const clean=body.recipes.filter(r=>r&&typeof r.title==='string'&&Array.isArray(r.ingredients)&&Array.isArray(r.steps)&&Number.isFinite(r.cal)&&Number.isFinite(r.time)&&r.time<=Number(state.maxTime)&&aiAllowed(r)&&(!state.cuisines.length||(Array.isArray(r.cuisines)&&r.cuisines.some(c=>state.cuisines.includes(c)))));
  if(!clean.length)throw Error('No AI suggestions met your dietary filters');
  aiRecipes=clean.slice(0,3);localStorage.setItem(AI_KEY,JSON.stringify(aiRecipes));renderAI();aiStatus.textContent=`${aiRecipes.length} AI recipe(s) generated with ${(body.provider==='gemini'?'Gemini':'AI')} and saved for offline viewing.`;
 }catch(err){aiStatus.textContent=`${err.message||'Could not connect'}. Built-in offline recipes remain below.`;renderRecipes()}
 finally{clearTimeout(timer);aiButton.disabled=false}
});
addEventListener('offline',()=>{aiStatus.textContent='Offline: built-in recipes and saved AI ideas available.'});renderAI();

renderCuisines();renderPantry();renderRecipes();renderMonth();renderSelectedDays();renderDayPlans();renderShopping();

// Dish-name guided cooking: use only curated offline guides or previously saved AI steps.
let activeDishGuide=null,activeDishStep=0;
const dishKey=s=>String(s||'').toLocaleLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim();
function dishCandidates(){
 const saved=Array.isArray(aiRecipes)?aiRecipes.filter(r=>r&&typeof r.title==='string'&&Array.isArray(r.steps)&&r.steps.length&&Array.isArray(r.ingredients)).map(r=>({...r,aliases:[],source:'Previously saved AI recipe',servings:r.servings||'Not specified'})):[];
 let custom=[];try{const a=JSON.parse(localStorage.getItem('fridge-chef-custom-guides-v1')||'[]');if(Array.isArray(a))custom=a.filter(x=>x&&typeof x.title==='string'&&Array.isArray(x.steps)&&Array.isArray(x.ingredients));}catch{}return [...DISH_GUIDES.map(r=>({...r,source:'Curated offline guide'})),...custom,...saved];
}
function findDish(q){const key=dishKey(q);if(!key)return null;const all=dishCandidates();return all.find(r=>dishKey(r.title)===key||(r.aliases||[]).some(a=>dishKey(a)===key))||all.find(r=>dishKey(r.title).includes(key)||(r.aliases||[]).some(a=>dishKey(a).includes(key)))||null}
function guideAllowed(r){return FridgeDiet.allowed(r,state.diet,state.avoid)}
function dishSuggestions(){const q=dishKey($('dishName').value);const candidates=dishCandidates().filter(r=>!q||dishKey(r.title).includes(q)||(r.aliases||[]).some(a=>dishKey(a).includes(q))).slice(0,8);$('dishSuggestions').innerHTML=candidates.map(r=>`<button class="secondary small" type="button" data-dish-name="${escapeHTML(r.title)}">${escapeHTML(r.title)}</button>`).join('');}
function renderDishStep(){if(!activeDishGuide)return;const r=activeDishGuide;const n=r.steps.length;const text=String(r.steps[activeDishStep]);$('dishStep').textContent=text;$('dishStepNumber').textContent=`Step ${activeDishStep+1} of ${n}`;$('dishProgress').value=activeDishStep+1;$('dishProgress').max=n;$('dishPrevious').disabled=activeDishStep===0;$('dishNext').textContent=activeDishStep===n-1?'Finish cooking ✓':'Next step →';$('dishGuideStatus').textContent=activeDishStep===n-1?'Final step — review and finish when ready.':'Follow each step at your own pace.';}
function startDish(r){
 if(!guideAllowed(r)){$('dishSearchStatus').textContent='This dish may conflict with your saved diet or avoid-ingredient preferences. Review your settings or search another dish.';return;}
 activeDishGuide=r;activeDishStep=0;$('dishSearchStatus').textContent=`Found: ${r.title} (${r.source}).`;
 const box=$('dishGuide');box.hidden=false;
 box.innerHTML=`<div class="guide-heading"><div><h3>${escapeHTML(r.title)}</h3><p class="muted">${escapeHTML(r.cuisine||'Saved AI recipe')} · About ${escapeHTML(r.time||'?')} min · Serves ${escapeHTML(r.servings||'not specified')}</p></div><span class="tag">${escapeHTML(r.source)}</span></div><h4>Ingredients</h4><p class="hint">Check off what you have; quantities are for the stated servings. Check allergens and packaging.</p><div class="guide-ingredients">${r.ingredients.map((i,n)=>`<label class="guide-ingredient"><input type="checkbox" data-guide-ingredient="${n}"><span>${escapeHTML(i)}</span></label>`).join('')}</div><button class="secondary small" type="button" id="dishShop">Add ingredients to shopping list</button><h4>Let's cook</h4><progress id="dishProgress" value="1" max="${r.steps.length}"></progress><strong id="dishStepNumber"></strong><div class="guide-step" id="dishStep" aria-live="polite"></div><div class="button-row guide-buttons"><button class="secondary" type="button" id="dishPrevious">← Previous</button><button class="primary" type="button" id="dishNext">Next step →</button></div><p class="hint" id="dishGuideStatus"></p><p class="hint">Cooking guidance is educational. Use safe handling and cooking temperatures; keep children away from hot surfaces.</p>`;
 $('dishPrevious').addEventListener('click',()=>{activeDishStep=Math.max(0,activeDishStep-1);renderDishStep()});
 $('dishNext').addEventListener('click',()=>{if(activeDishStep===r.steps.length-1){$('dishGuideStatus').textContent='Finished! Enjoy your meal. You can review any step with Previous.';toast('Enjoy your meal!');return}activeDishStep++;renderDishStep()});
 $('dishShop').addEventListener('click',()=>{r.ingredients.forEach(shoppingAdd);persist();renderShopping();toast('Ingredient list added to shopping')});renderDishStep();
 box.scrollIntoView({behavior:'smooth',block:'nearest'});
}
$('dishSearchForm').addEventListener('submit',async e=>{
 e.preventDefault();const name=$('dishName').value.trim();const r=findDish(name);if(r){startDish(r);return;}
 const status=$('dishSearchStatus');if(!navigator.onLine){status.textContent='Offline: no saved guide for this dish. Try a suggested dish.';return;}
 const button=$('dishSearchForm').querySelector('button[type=submit]');button.disabled=true;status.textContent='Asking AI for a step-by-step guide…';
 try{
  const response=await fetch('/api/recipes',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({mode:'dish',dish:name,diet:state.diet,avoid:state.avoid,cuisines:state.cuisines})});
  if(!response.ok)throw Error(response.status===503?'AI backend not configured':response.status===429?'Too many requests':`AI request failed (${response.status})`);
  const data=await response.json(),guide=data.recipes?.[0];
  if(!guide||!Array.isArray(guide.ingredients)||!Array.isArray(guide.steps)||guide.steps.length<3)throw Error('AI returned an incomplete guide');
  const generated={...guide,source:(data.provider==='gemini'?'Gemini':'AI')+' AI guide'};
  if(!guideAllowed(generated))throw Error('Generated ingredients may conflict with your diet/avoid preferences');
  startDish(generated);
  // Persist a bounded list of recent generated dish guides for offline access.
  try{const key='fridge-chef-custom-guides-v1';const existing=JSON.parse(localStorage.getItem(key)||'[]');localStorage.setItem(key,JSON.stringify([generated,...(Array.isArray(existing)?existing:[]).filter(x=>dishKey(x.title)!==dishKey(generated.title))].slice(0,12)));}catch{}
 }catch(err){status.textContent=`${err.message}. Offline guides remain available.`;}
 finally{button.disabled=false;}
});
$('dishName').addEventListener('input',dishSuggestions);
$('dishSuggestions').addEventListener('click',e=>{const b=e.target.closest('[data-dish-name]');if(!b)return;$('dishName').value=b.dataset.dishName;const r=findDish(b.dataset.dishName);if(r)startDish(r)});
dishSuggestions();

// Appearance is stored separately from recipe data so toggling never resets plans.
(function initThemePreferences(){
  const choices=document.querySelectorAll('input[name="themePreference"]');
  const valid=['light','dark','system'];
  function setTheme(value,save){
    const theme=valid.includes(value)?value:'system';
    document.documentElement.dataset.theme=theme;
    choices.forEach(input=>{input.checked=input.value===theme});
    const status=document.getElementById('themeStatus');
    if(status)status.textContent=theme==='system'?'Using your device appearance setting.':theme==='dark'?'Dark mode enabled.':'Light mode enabled.';
    if(save){try{localStorage.setItem('fridge-chef-theme',theme)}catch(e){/* Storage may be disabled. */}}
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('--page-bg').trim()||'#174d3b');
  }
  setTheme(document.documentElement.dataset.theme,false);
  choices.forEach(input=>input.addEventListener('change',()=>{if(input.checked)setTheme(input.value,true)}));
  const media=window.matchMedia?.('(prefers-color-scheme: dark)');
  media?.addEventListener?.('change',()=>{if(document.documentElement.dataset.theme==='system')setTheme('system',false)});
})();
