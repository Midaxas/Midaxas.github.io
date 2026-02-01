document.addEventListener('DOMContentLoaded', ()=>{
  const themeToggle = document.getElementById('themeToggle');
  const emailBtn = document.getElementById('emailBtn');
  const EMAIL = 'hi@example.com';

  // Theme toggle (simple: toggles a data-theme attr)
  const setTheme = t=>{ if(t==='light') document.documentElement.setAttribute('data-theme','light'); else document.documentElement.removeAttribute('data-theme'); localStorage.setItem('theme',t)}
  const cur = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  setTheme(cur);
  themeToggle.addEventListener('click', ()=> setTheme(document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light'));

  // Copy email
  if(emailBtn){
    emailBtn.addEventListener('click', async ()=>{
      try{
        await navigator.clipboard.writeText(EMAIL);
        const original = emailBtn.textContent;
        emailBtn.textContent = 'Copied!';
        setTimeout(()=> emailBtn.textContent = original,1500);
      }catch(e){
        window.location.href = `mailto:${EMAIL}`;
      }
    })
  }
});
