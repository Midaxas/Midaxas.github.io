function $(s,el=document){return el.querySelector(s)}
function $all(s,el=document){return Array.from(el.querySelectorAll(s))}

const DEFAULT = {
  name: 'Midaxas',
  tag: 'Developer · Researcher',
  email: 'hi@example.com',
  avatar: '/favicon.svg',
  links: [
    {label:'GitHub', href:'https://github.com/Midaxas'},
    {label:'Twitter', href:'https://twitter.com/'},
    {label:'Projects', href:'/'}
  ]
}

function loadConfig(){
  try{return JSON.parse(localStorage.getItem('site_config')||'null')||DEFAULT}catch(e){return DEFAULT}
}

function saveConfig(cfg){localStorage.setItem('site_config',JSON.stringify(cfg));}

function makeLinkRow(link, idx){
  const row = document.createElement('div'); row.className='row';
  const linput = document.createElement('input'); linput.type='text'; linput.value=link.label; linput.placeholder='Label'; linput.className='small';
  const hinput = document.createElement('input'); hinput.type='text'; hinput.value=link.href; hinput.placeholder='https://...';
  const rem = document.createElement('button'); rem.className='ghost'; rem.textContent='Remove';
  rem.onclick = ()=>{ row.remove(); };
  row.appendChild(linput); row.appendChild(hinput); row.appendChild(rem);
  row.querySelectorAll('input')[0].dataset.idx = idx;
  return row;
}

function renderLinks(listEl, cfg){ listEl.innerHTML=''; cfg.links.forEach((ln,i)=> listEl.appendChild(makeLinkRow(ln,i))); }

document.addEventListener('DOMContentLoaded', ()=>{
  const cfg = loadConfig();
  const nameEl = $('#name');
  const tagEl = $('#tag');
  const emailEl = $('#email');
  const avatarEl = $('#avatar');
  const linksList = $('#linksList');

  nameEl.value = cfg.name || '';
  tagEl.value = cfg.tag || '';
  emailEl.value = cfg.email || '';
  renderLinks(linksList, cfg);

  $('#addLink').addEventListener('click', ()=>{
    linksList.appendChild(makeLinkRow({label:'New',href:''}, linksList.children.length));
  });

  avatarEl.addEventListener('change', (ev)=>{
    const f = ev.target.files && ev.target.files[0];
    if(!f) return;
    const r = new FileReader(); r.onload = ()=>{
      // temporarily show base64 in avatar preview by storing to a hidden field
      avatarEl.dataset.preview = r.result;
    }; r.readAsDataURL(f);
  });

  $('#saveBtn').addEventListener('click', ()=>{
    const newCfg = {name:nameEl.value||DEFAULT.name, tag:tagEl.value||DEFAULT.tag, email:emailEl.value||DEFAULT.email, avatar: avatarEl.dataset.preview || DEFAULT.avatar, links:[]};
    $all('.links-list .row', linksList).forEach(r=>{
      const inputs = r.querySelectorAll('input');
      const lab = inputs[0].value.trim(); const href = inputs[1].value.trim();
      if(href) newCfg.links.push({label: lab || href, href});
    });
    saveConfig(newCfg);
    alert('Saved to localStorage — open the main page to preview.');
  });

  $('#exportBtn').addEventListener('click', ()=>{
    const exportCfg = loadConfig();
    const blob = new Blob([JSON.stringify(exportCfg, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download='site_config.json'; a.click();
    URL.revokeObjectURL(url);
  });

  $('#clearConfig').addEventListener('click', ()=>{
    if(!confirm('Clear saved config and restore defaults?')) return; localStorage.removeItem('site_config');
    location.reload();
  });
});
