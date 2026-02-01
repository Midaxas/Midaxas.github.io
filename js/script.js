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
    // ripple + copy
    emailBtn.addEventListener('click', async (ev)=>{
      const rect = emailBtn.getBoundingClientRect();
      const r = document.createElement('span');
      r.className = 'ripple';
      const size = Math.max(rect.width, rect.height) * 1.2;
      r.style.width = r.style.height = size + 'px';
      r.style.left = (ev.clientX - rect.left - size/2) + 'px';
      r.style.top = (ev.clientY - rect.top - size/2) + 'px';
      emailBtn.appendChild(r);
      requestAnimationFrame(()=>{ r.style.transform='scale(1)'; r.style.transition='transform 450ms cubic-bezier(.2,.9,.2,1),opacity 450ms'; r.style.opacity='0'; });
      setTimeout(()=> r.remove(),600);
      try{
        await navigator.clipboard.writeText(EMAIL);
        const orig = emailBtn.querySelector('.label').textContent;
        emailBtn.querySelector('.label').textContent = 'Copied!';
        setTimeout(()=> emailBtn.querySelector('.label').textContent = orig,1500);
      }catch(e){
        window.location.href = `mailto:${EMAIL}`;
      }
    });
  }
});
