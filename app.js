function $(sel){ return document.querySelector(sel); }
function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; }
function getParam(name){ return new URLSearchParams(location.search).get(name); }
function slugLabel(s){ return String(s||'').replaceAll('-', ' '); }
function setActive(){ document.querySelectorAll('.nav a').forEach(a=>{ const href=a.getAttribute('href'); if(location.pathname.endsWith(href) || (href==='index.html' && location.pathname.endsWith('/'))) a.classList.add('active'); }); }
function layout(active=''){
  document.body.innerHTML = `
  <div class="layout">
    <aside class="sidebar">
      <div class="brand"><div class="brand-mark">档</div><div><h1>${DB.site.title}</h1><p>${DB.site.subtitle}</p></div></div>
      <nav class="nav">
        <a href="index.html">Índice de casos</a>
        <a href="professores.html">Professores</a>
        <a href="pessoas.html">Pessoas públicas</a>
        <a href="maldicoes.html">Maldições conhecidas</a>
        <a href="glossario.html">Glossário</a>
        <a href="notas.html">Notas da mesa</a>
      </nav>
      <div class="sidebar-card"><small>Aviso</small><p>${DB.site.notice}</p></div>
    </aside>
    <main class="content" id="app"></main>
  </div>`;
  setActive();
}
function tags(items){ return `<div class="meta">${items.map(x=>`<span class="tag ${x.cls||''}">${x.text}</span>`).join('')}</div>`; }
function searchable(){
  const input=$('#search'); if(!input) return;
  input.addEventListener('input',()=>{ const q=input.value.toLowerCase().trim(); document.querySelectorAll('[data-search]').forEach(card=>{ card.style.display = card.dataset.search.includes(q) ? '' : 'none'; }); });
}
function renderIndex(){
  layout(); const app=$('#app');
  app.innerHTML=`
  <div class="top"><div><p class="eyebrow">Consulta principal</p><h2>Índice de casos</h2><p class="lead">Este é o painel que Kiyomi manteria para consulta recorrente: casos antigos, anomalias reabertas e arquivos restritos que aparecem no índice, mas ainda não podem ser acessados.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Buscar no índice..." /></div></div>
  <section class="grid two" id="homeCases"></section>
  <div class="footer">Arquivo feito para uso em sessão. A página inicial lista apenas o caso acessível e arquivos extras bloqueados.</div>`;
  const wrap=$('#homeCases');
  DB.homeCases.forEach(c=>{
    const classes=`card ${c.clickable?'clickable':'disabled'}`;
    wrap.appendChild(el(`<article class="${classes}" data-search="${(c.title+' '+c.summary+' '+c.status).toLowerCase()}">
      ${tags([{text:c.status,cls:c.clickable?'ok':'danger'},{text:c.priority,cls:c.priority==='Alta'?'warn':'danger'}])}
      <h3>${c.title}</h3><p>${c.summary}</p>${c.clickable?`<a class="overlay" href="caso.html?id=${c.id}" aria-label="Abrir ${c.title}"></a>`:`<span class="locked">🔒 arquivo sem página liberada</span>`}
    </article>`));
  }); searchable();
}
function renderCaseGroup(){
  layout(); const id=getParam('id')||'possivel-maldicao-sem-nome'; const c=DB.caseGroups[id]; const app=$('#app');
  if(!c){ app.innerHTML='<p class="empty">Caso não encontrado.</p>'; return; }
  app.innerHTML=`
  <p class="crumb"><a href="index.html">Índice</a> / ${c.title}</p>
  <section class="hero"><img src="assets/cases/${id}.svg" alt="${c.title}"><div class="hero-body"><p class="eyebrow">Dossiê acessível</p><h2>${c.title}</h2>${tags([{text:c.status,cls:'ok'},{text:c.risk,cls:'warn'}])}<p class="lead">${c.summary}</p></div></section>
  <section class="grid two"><article class="panel"><h3>Classificação</h3><p>${c.classification}</p><p><strong>Curadoria:</strong> ${c.curator}</p></article><article class="panel"><h3>Leitura de Kiyomi</h3><p>O padrão não deve ser tratado como três histórias isoladas. O mais útil é observar o que se repete: ausência de registro, memória civil instável e espaços que parecem responder a nomes, sons ou orientação.</p></article></section>
  <h3 style="margin-top:26px">Ocorrências dentro do dossiê</h3><section class="grid" id="subs"></section>
  <h3 style="margin-top:26px">Notas gerais</h3><section class="list">${c.notes.map(n=>`<div class="list-item">${n}</div>`).join('')}</section>`;
  const subs=$('#subs');
  c.subcases.forEach(id=>{ const s=DB.subcases[id]; subs.appendChild(el(`<article class="card clickable case-tile" data-search="${(s.title+' '+s.summary).toLowerCase()}"><img src="assets/cases/${id}.svg" alt="${s.title}"><div>${tags([{text:s.status,cls:'warn'},{text:s.risk,cls:''}])}<h3>${s.title}</h3><p>${s.summary}</p></div><a class="overlay" href="subcaso.html?id=${id}" aria-label="Abrir ${s.title}"></a></article>`)); });
}
function renderSubcase(){
  layout(); const id=getParam('id'); const s=DB.subcases[id]; const app=$('#app');
  if(!s){ app.innerHTML='<p class="empty">Subcaso não encontrado.</p>'; return; }
  app.innerHTML=`
  <p class="crumb"><a href="index.html">Índice</a> / <a href="caso.html?id=possivel-maldicao-sem-nome">Possível Maldição Sem Nome</a> / ${s.title}</p>
  <section class="hero"><img src="assets/cases/${id}.svg" alt="${s.title}"><div class="hero-body"><p class="eyebrow">Ocorrência antiga</p><h2>${s.title}</h2>${tags([{text:s.status,cls:'warn'},{text:s.risk,cls:''}])}<p class="lead">${s.summary}</p></div></section>
  <section class="grid two"><article class="panel"><h3>Local indicado</h3><p>${s.place}</p></article><article class="panel"><h3>Resumo técnico</h3><p>${s.report}</p></article></section>
  <section class="grid two" style="margin-top:18px"><article class="panel"><h3>Linha do tempo</h3><div class="list">${s.timeline.map(t=>`<div class="list-item">${t}</div>`).join('')}</div></article><article class="panel"><h3>Pistas registradas</h3><div class="list">${s.clues.map(t=>`<div class="list-item">${t}</div>`).join('')}</div></article></section>
  <section class="grid two" style="margin-top:18px"><article class="panel"><h3>Anotação de Kiyomi</h3><p class="note">${s.kiyomi}</p></article><article class="panel"><h3>Uso em sessão</h3><p>${s.gm}</p></article></section>`;
}
function renderProfessores(){
  layout(); const app=$('#app'); app.innerHTML=`<div class="top"><div><p class="eyebrow">Arquivo institucional</p><h2>Professores e direção</h2><p class="lead">Páginas individuais com dados públicos, técnica conhecida e anotações extras úteis de investigação.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Buscar professor..." /></div></div><section class="grid three" id="profList"></section>`;
  const wrap=$('#profList'); DB.professors.forEach(p=>wrap.appendChild(el(`<article class="card clickable" data-search="${(p.name+' '+p.role+' '+p.type+' '+p.public).toLowerCase()}"><img class="portrait portrait-card" src="${p.portrait}" alt="Retrato de ${p.name}">${tags([{text:p.type,cls:''}])}<h3>${p.name}</h3><p>${p.role}</p><a class="overlay" href="professor.html?id=${p.id}" aria-label="Abrir ${p.name}"></a></article>`))); searchable();
}
function renderProfessor(){
  layout(); const id=getParam('id'); const p=DB.professors.find(x=>x.id===id); const app=$('#app');
  if(!p){ app.innerHTML='<p class="empty">Professor não encontrado.</p>'; return; }
  app.innerHTML=`<div class="toolbar" style="margin-bottom:14px"><a class="btn" href="professores.html">← Voltar para professores</a></div><p class="crumb"><a href="professores.html">Professores</a> / ${p.name}</p><section class="person"><img class="portrait portrait-page" src="${p.portrait}" alt="Retrato de ${p.name}"><div><p class="eyebrow">${p.type}</p><h2>${p.name}</h2>${tags([{text:p.role,cls:''}])}<p class="lead">${p.public}</p><h3>Anotações extras</h3><p class="note">${p.kiyomi}</p><h3>Técnica conhecida ou inferida</h3><p>${p.technique}</p><h3>Observações de arquivo</h3><div class="list">${p.notes.map(n=>`<div class="list-item">${n}</div>`).join('')}</div></div></section>`;
}
function renderPessoas(){
  layout(); const app=$('#app'); app.innerHTML=`<div class="top"><div><p class="eyebrow">Arquivo público interno</p><h2>Pessoas públicas da instituição</h2><p class="lead">Registros gerais de staff, alunos de suporte e funções úteis. O site não registra informações sobre personagens de jogadores.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Buscar pessoa..." /></div></div><section class="grid two" id="people"></section>`;
  const wrap=$('#people'); DB.studentsAndStaff.forEach(p=>wrap.appendChild(el(`<article class="card" data-search="${(p.name+' '+p.role+' '+p.category+' '+p.summary).toLowerCase()}">${tags([{text:p.category,cls:''}])}<h3>${p.name}</h3><p><strong>${p.role}</strong></p><p>${p.summary}</p></article>`))); searchable();
}
function renderMaldicoes(){
  layout(); const app=$('#app'); app.innerHTML=`<div class="top"><div><p class="eyebrow">Catálogo de ameaças</p><h2>Maldições conhecidas</h2><p class="lead">Registros resumidos para consulta durante investigação. Alguns nomes podem ser rótulos provisórios de arquivo.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Buscar maldição..." /></div></div><section class="grid two" id="curses"></section>`;
  const wrap=$('#curses'); DB.curses.forEach(c=>wrap.appendChild(el(`<article class="card" data-search="${(c.name+' '+c.status+' '+c.threat+' '+c.summary).toLowerCase()}">${tags([{text:c.status,cls:'warn'},{text:'Ameaça: '+c.threat,cls:'danger'}])}<h3>${c.name}</h3><p>${c.summary}</p></article>`))); searchable();
}
function renderGlossario(){
  layout(); const app=$('#app'); app.innerHTML=`<div class="top"><div><p class="eyebrow">Consulta rápida</p><h2>Glossário</h2><p class="lead">Termos que aparecem nos arquivos de Kiyomi, com explicações curtas para consulta em mesa.</p></div><div class="toolbar"><input id="search" class="search" placeholder="Buscar termo..." /></div></div><section class="grid two" id="terms"></section>`;
  const wrap=$('#terms'); DB.glossary.forEach(g=>wrap.appendChild(el(`<article class="card" data-search="${(g.term+' '+g.text).toLowerCase()}"><h3>${g.term}</h3><p>${g.text}</p></article>`))); searchable();
}
function renderNotas(){
  layout(); const app=$('#app'); app.innerHTML=`<div class="top"><div><p class="eyebrow">Ferramenta local</p><h2>Notas da mesa</h2><p class="lead">Espaço para os jogadores anotarem hipóteses no próprio navegador. O texto fica salvo localmente no dispositivo.</p></div></div><textarea id="notes" class="notes-area" placeholder="Anotações, teorias, nomes, pistas..."></textarea><div class="toolbar" style="margin-top:12px"><button class="btn" id="save">Salvar notas</button><button class="btn" id="clear">Limpar</button></div><p class="footer">As notas usam localStorage. Não são enviadas para lugar nenhum.</p>`;
  const area=$('#notes'); area.value=localStorage.getItem('kiyomi-notes')||''; $('#save').onclick=()=>{localStorage.setItem('kiyomi-notes',area.value); alert('Notas salvas.');}; $('#clear').onclick=()=>{if(confirm('Limpar notas?')){area.value=''; localStorage.removeItem('kiyomi-notes');}};
}
