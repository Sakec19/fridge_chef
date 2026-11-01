// Non-invasive dashboard shortcuts; existing application state and navigation remain owned by app.js.
document.addEventListener('click', event => {
 const button = event.target.closest('[data-quick]');
 if (!button) return;
 const action = button.dataset.quick;
 if (action === 'dish') {
   document.getElementById('cookGuidePanel')?.scrollIntoView({behavior:'smooth',block:'start'});
   document.getElementById('dishName')?.focus({preventScroll:true});
 } else {
   document.querySelector(`.tab[data-tab="${action}"]`)?.click();
   window.scrollTo({top:0,behavior:'smooth'});
 }
});
