// Shared defensive ingredient screening. Not a substitute for allergy/medical certification.
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.FridgeDiet=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const labels={any:'No restriction',vegetarian:'Vegetarian (eggs and dairy allowed)','no-eggs':'Vegetarian, egg-free',vegan:'Vegan',pescatarian:'Pescatarian','dairy-free':'Dairy-free','gluten-free':'Gluten-free','egg-free':'Egg-free'};
 const meat=/\b(chicken|beef|pork|bacon|ham|turkey|lamb|mutton|meat|gelatin|pepperoni|sausage)\b/i;
 const seafood=/\b(fish|tuna|salmon|shrimp|prawn|oyster|anchov(?:y|ies)|crab|lobster|sardine)\b/i;
 const egg=/\b(egg|eggs|mayonnaise|mayo)\b/i;
 const dairy=/\b(milk|cheese|paneer|butter|yogurt|yoghurt|curd|cream|ghee|whey|casein)\b/i;
 const gluten=/\b(wheat|flour|maida|semolina|sooji|rava|pasta|bread|roti|chapati|naan|pita|couscous|bulgur|barley|rye|seitan|soy sauce|tortilla|oats)\b/i;
 function allowed(recipe,diet='any',avoid=''){
  if(!recipe||!Array.isArray(recipe.ingredients))return false;
  const items=recipe.ingredients.map(x=>String(x).toLowerCase());const joined=items.join(' | ');
  if(avoid.toLowerCase().split(',').map(s=>s.trim()).filter(Boolean).some(term=>items.some(i=>i.includes(term))))return false;
  if(['vegetarian','no-eggs','vegan'].includes(diet)&&(meat.test(joined)||seafood.test(joined)))return false;
  if(diet==='pescatarian'&&meat.test(joined))return false;
  if(['no-eggs','egg-free','vegan'].includes(diet)&&egg.test(joined))return false;
  if(['dairy-free','vegan'].includes(diet)&&dairy.test(joined))return false;
  if(diet==='vegan'&&/\b(honey)\b/i.test(joined))return false;
  if(diet==='gluten-free'&&gluten.test(joined))return false;
  // Unknown packaged ingredients can contain hidden allergens; display label warning in UI.
  return true;
 }
 return {labels,allowed};
});
