const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const root = $("#viewRoot");
const pageTitle = $("#pageTitle");
const routeKicker = $("#routeKicker");
const searchInput = $("#globalSearch");
const searchResults = $("#searchResults");
const dialog = $("#detailDialog");
const dialogContent = $("#dialogContent");

const collections = {
  cases: DB.cases,
  clues: DB.clues,
  people: DB.people,
  curses: DB.curses,
  glossary: DB.glossary,
};

const collectionLabels = {
  cases: "Caso",
  clues: "Pista",
  people: "Pessoa",
  curses: "Maldição",
  glossary: "Glossário",
};

function allItems() {
  return Object.entries(collections).flatMap(([collection, items]) =>
    items.map(item => ({ ...item, collection, label: collectionLabels[collection] }))
  );
}

function getPins() {
  return JSON.parse(localStorage.getItem("kiyomiPins") || "[]");
}

function setPins(pins) {
  localStorage.setItem("kiyomiPins", JSON.stringify(pins));
}

function isPinned(id) {
  return getPins().includes(id);
}

function togglePin(id) {
  const pins = getPins();
  const next = pins.includes(id) ? pins.filter(pin => pin !== id) : [...pins, id];
  setPins(next);
  route();
}

function tags(tags = []) {
  return `<div class="badges">${tags.map(tag => `<span class="badge">${tag}</span>`).join("")}</div>`;
}

function riskBadge(item) {
  const risk = item.risk || item.danger || item.status || "Consulta";
  const type = /moderado|alto|perigo/i.test(risk) ? "danger" : /baixo|aberto|dúvida/i.test(risk) ? "warn" : "";
  return `<span class="badge ${type}">${risk}</span>`;
}

function card(item, collection) {
  return `
    <article class="card">
      <div class="badges">
        <span class="badge">${collectionLabels[collection] || item.category || "Arquivo"}</span>
        ${riskBadge(item)}
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary || item.text}</p>
      ${tags(item.tags?.slice(0, 4))}
      <div class="card-footer">
        <div class="card-actions">
          <button class="icon-btn" data-open="${collection}:${item.id}">Abrir</button>
          <button class="icon-btn" data-pin="${item.id}">${isPinned(item.id) ? "Fixado" : "Fixar"}</button>
        </div>
      </div>
    </article>
  `;
}

function setActive(routeName) {
  $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.route === routeName));
}

function setHeader(title, kicker = "Dossiê") {
  pageTitle.textContent = title;
  routeKicker.textContent = kicker;
}

function renderHome() {
  setActive("inicio");
  setHeader("Painel", "Arquivo Kiyomi");
  const stats = [
    [DB.cases.length, "casos antigos"],
    [DB.people.length, "pessoas públicas"],
    [DB.curses.length, "registros de maldição"],
    [DB.clues.length, "pistas catalogadas"],
  ];
  root.innerHTML = `
    <section class="hero">
      <article class="hero-card">
        <span class="mini-label">Consulta de campo</span>
        <h3>Arquivos para quando a sessão pedir investigação.</h3>
        <p>
          Este site funciona como uma base interna de pesquisa da Kiyomi: casos antigos, pessoas da instituição,
          pistas catalogadas, glossário jujutsu e registros de maldições conhecidas. Ele foi feito para seus players
          mexerem durante sessões sem precisar receber spoiler pesado.
        </p>
        <div class="toolbar">
          <a class="action-btn primary" href="#/casos">Ver casos antigos</a>
          <a class="action-btn" href="#/quadro">Abrir quadro fixado</a>
        </div>
      </article>
      <aside class="quick-panel">
        <img src="assets/img/kiyomi-arquivos.png" alt="Kiyomi no setor de arquivos" onerror="this.style.display='none'" />
        <div class="quick-body">
          <span class="mini-label">Kiyomi Fushizato</span>
          <p>Setor de arquivos, biblioteca e descriptografia. Registros pequenos demais para virar missão oficial ainda podem virar pista depois.</p>
        </div>
      </aside>
    </section>

    <section class="stats">
      ${stats.map(([num, label]) => `<div class="stat"><strong>${num}</strong><span>${label}</span></div>`).join("")}
    </section>

    <section class="layout-two">
      <div>
        <div class="toolbar">
          <button class="chip active" data-home-filter="cases">Casos</button>
          <button class="chip" data-home-filter="people">Pessoas</button>
          <button class="chip" data-home-filter="curses">Maldições</button>
        </div>
        <div id="homeCards" class="card-grid"></div>
      </div>
      <aside class="panel">
        <h3>Como usar em mesa</h3>
        <p>Peça para os players abrirem um caso específico, buscarem uma palavra ou fixarem pistas no quadro. Assim o site vira uma ferramenta de sessão, não só decoração.</p>
        <div class="document-note">
          Sugestão: entregue uma pista como “procurem por escadaria” ou “busquem por quarto inexistente” e deixe eles conectarem com o que está acontecendo.
        </div>
      </aside>
    </section>
  `;
  const homeCards = $("#homeCards");
  const render = (collection) => homeCards.innerHTML = collections[collection].slice(0, 4).map(item => card(item, collection)).join("");
  render("cases");
  $$('[data-home-filter]').forEach(button => button.addEventListener("click", () => {
    $$('[data-home-filter]').forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.homeFilter);
    attachCardEvents();
  }));
  attachCardEvents();
}

function renderCollection(routeName, title, collection, subtitle) {
  setActive(routeName);
  setHeader(title, subtitle);
  const data = collections[collection];
  const allTags = [...new Set(data.flatMap(item => item.tags || []))];
  root.innerHTML = `
    <section class="panel">
      <span class="mini-label">${subtitle}</span>
      <h3>${title}</h3>
      <p>Use os filtros para transformar o arquivo em ferramenta de mesa. Cada card pode ser aberto ou fixado no quadro.</p>
      <div class="toolbar" id="filterBar">
        <button class="chip active" data-filter="todos">Todos</button>
        ${allTags.map(tag => `<button class="chip" data-filter="${tag}">${tag}</button>`).join("")}
      </div>
    </section>
    <section class="card-grid" id="collectionGrid"></section>
  `;
  const grid = $("#collectionGrid");
  const draw = (tag = "todos") => {
    const filtered = tag === "todos" ? data : data.filter(item => item.tags?.includes(tag));
    grid.innerHTML = filtered.map(item => card(item, collection)).join("") || `<div class="empty">Nada encontrado nesse filtro.</div>`;
    attachCardEvents();
  };
  draw();
  $$("#filterBar .chip").forEach(button => button.addEventListener("click", () => {
    $$("#filterBar .chip").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    draw(button.dataset.filter);
  }));
}

function renderCaseDetail(id) {
  const c = DB.cases.find(item => item.id === id) || DB.cases[0];
  setActive("casos");
  setHeader(c.title.replace("Caso ", ""), "Arquivo de caso");
  root.innerHTML = `
    <section class="case-detail-hero">
      <div class="badges"><span class="badge">${c.status}</span>${riskBadge(c)}<span class="badge">${c.access}</span></div>
      <h3>${c.title}</h3>
      <p>${c.summary}</p>
      ${tags(c.tags)}
      <div class="toolbar">
        <button class="action-btn primary" data-pin="${c.id}">${isPinned(c.id) ? "Remover do quadro" : "Fixar no quadro"}</button>
        <a class="action-btn" href="#/casos">Voltar aos casos</a>
      </div>
    </section>
    <div class="tabs">
      <button class="tab-btn active" data-tab="resumo">Resumo</button>
      <button class="tab-btn" data-tab="linha">Linha do tempo</button>
      <button class="tab-btn" data-tab="relatos">Relatos</button>
      <button class="tab-btn" data-tab="pistas">Pistas</button>
      <button class="tab-btn" data-tab="perguntas">Perguntas abertas</button>
      <button class="tab-btn" data-tab="imagem">Prompt de imagem</button>
    </div>
    <section class="panel" id="caseTab"></section>
  `;
  const panel = $("#caseTab");
  const tabContent = {
    resumo: () => `
      <h3>Resumo operacional</h3>
      <p><strong>Local:</strong> ${c.location}</p>
      <p>${c.summary}</p>
      <div class="document-note"><strong>Anotação de Kiyomi:</strong><br>${c.kiyomiNote}</div>
    `,
    linha: () => `<h3>Linha do tempo</h3><div class="timeline">${c.timeline.map(item => `<div class="timeline-item"><span>${item}</span></div>`).join("")}</div>`,
    relatos: () => `<h3>Relatos conhecidos</h3><div class="witness-list">${c.witnesses.map(w => `<div class="witness"><strong>${w.name}</strong><span>${w.note}</span></div>`).join("")}</div>`,
    pistas: () => `<h3>Pistas do caso</h3><ul>${c.clues.map(item => `<li>${item}</li>`).join("")}</ul>`,
    perguntas: () => `<h3>Perguntas em aberto</h3><ul>${c.questions.map(item => `<li>${item}</li>`).join("")}</ul>`,
    imagem: () => `<h3>Prompt de imagem sugerido</h3><div class="prompt-box">${c.imageHint}</div><p>Esse prompt é só uma base. Dá para pedir depois uma imagem mais bonita ou mais específica para usar na sessão.</p>`
  };
  const drawTab = (tab) => panel.innerHTML = tabContent[tab]();
  drawTab("resumo");
  $$(".tab-btn").forEach(button => button.addEventListener("click", () => {
    $$(".tab-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    drawTab(button.dataset.tab);
  }));
  attachCardEvents();
}

function renderBoard() {
  setActive("quadro");
  setHeader("Quadro fixado", "Mesa de investigação");
  const pins = getPins();
  const items = allItems().filter(item => pins.includes(item.id));
  root.innerHTML = `
    <section class="panel">
      <span class="mini-label">Pistas salvas</span>
      <h3>Quadro dos players</h3>
      <p>Itens fixados ficam salvos no navegador. Bom para a mesa montar conexões sem você entregar resposta pronta.</p>
      <button class="action-btn" id="clearPins">Limpar quadro</button>
    </section>
    <section class="board">
      ${items.length ? items.map((item, i) => `<article class="pin-card" style="--r:${[-1,1.2,-.6,.8][i%4]}deg"><span class="mini-label">${item.label}</span><h3>${item.title}</h3><p>${item.summary || item.text}</p><button class="icon-btn" data-pin="${item.id}">Remover</button></article>`).join("") : `<div class="empty">Nada fixado ainda. Abra cards e clique em “Fixar”.</div>`}
    </section>
  `;
  $("#clearPins")?.addEventListener("click", () => { setPins([]); route(); });
  attachCardEvents();
}

function renderNotes() {
  setActive("notas");
  setHeader("Notas locais", "Anotações dos players");
  root.innerHTML = `
    <section class="panel">
      <span class="mini-label">Salvo neste navegador</span>
      <h3>Bloco de notas</h3>
      <p>Use para os players anotarem suspeitas, relações e perguntas. O texto fica salvo no navegador usado na sessão.</p>
      <textarea class="note-area" id="noteArea" placeholder="Ex.: escadaria, quarto 0-B e viela têm relação com rotas ou lugares sem registro oficial..."></textarea>
      <div class="toolbar" style="margin-top: 12px;">
        <button class="action-btn primary" id="saveNotes">Salvar notas</button>
        <button class="action-btn" id="clearNotes">Limpar</button>
      </div>
    </section>
  `;
  const area = $("#noteArea");
  area.value = localStorage.getItem("kiyomiNotes") || "";
  $("#saveNotes").addEventListener("click", () => {
    localStorage.setItem("kiyomiNotes", area.value);
    $("#saveNotes").textContent = "Salvo";
    setTimeout(() => $("#saveNotes").textContent = "Salvar notas", 900);
  });
  $("#clearNotes").addEventListener("click", () => { area.value = ""; localStorage.removeItem("kiyomiNotes"); });
}

function openDetail(collection, id) {
  const item = collections[collection]?.find(x => x.id === id);
  if (!item) return;
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <span class="mini-label">${collectionLabels[collection]}</span>
      <h2>${item.title}</h2>
      <div class="badges">${riskBadge(item)}${(item.tags || []).map(t => `<span class="badge">${t}</span>`).join("")}</div>
      <p>${item.summary || item.text}</p>
      ${item.location ? `<p><strong>Local:</strong> ${item.location}</p>` : ""}
      ${item.role ? `<p><strong>Função:</strong> ${item.role}</p>` : ""}
      ${item.source ? `<p><strong>Origem:</strong> ${item.source}</p>` : ""}
      ${item.kiyomiNote ? `<div class="document-note"><strong>Anotação de Kiyomi:</strong><br>${item.kiyomiNote}</div>` : ""}
      <div class="toolbar" style="margin-top:16px;">
        ${collection === "cases" ? `<a class="action-btn primary" href="#/caso/${item.id}" onclick="document.querySelector('#detailDialog').close()">Abrir página completa</a>` : ""}
        <button class="action-btn" data-pin="${item.id}">${isPinned(item.id) ? "Remover do quadro" : "Fixar no quadro"}</button>
      </div>
    </div>
  `;
  dialog.showModal();
  attachCardEvents(dialogContent);
}

function attachCardEvents(rootEl = document) {
  $$('[data-open]', rootEl).forEach(btn => btn.onclick = () => {
    const [collection, id] = btn.dataset.open.split(":");
    openDetail(collection, id);
  });
  $$('[data-pin]', rootEl).forEach(btn => btn.onclick = () => togglePin(btn.dataset.pin));
}

function globalSearch(term) {
  const q = term.trim().toLowerCase();
  if (!q) { searchResults.classList.add("hidden"); return; }
  const results = allItems().filter(item => JSON.stringify(item).toLowerCase().includes(q)).slice(0, 12);
  searchResults.classList.remove("hidden");
  searchResults.innerHTML = `
    <div class="result-header"><strong>Resultados para “${term}”</strong><span>${results.length} resultado(s)</span></div>
    <div class="card-grid">${results.length ? results.map(item => card(item, item.collection)).join("") : `<div class="empty">Nada encontrado.</div>`}</div>
  `;
  attachCardEvents(searchResults);
}

function route() {
  const hash = location.hash || "#/inicio";
  const parts = hash.replace("#/", "").split("/");
  const routeName = decodeURIComponent(parts[0]);
  const id = parts[1];
  searchResults.classList.add("hidden");
  searchInput.value = "";
  if (routeName === "inicio") renderHome();
  else if (routeName === "casos") renderCollection("casos", "Casos antigos", "cases", "Arquivo de ocorrências");
  else if (routeName === "caso") renderCaseDetail(id);
  else if (routeName === "pistas") renderCollection("pistas", "Pistas e objetos", "clues", "Catálogo de evidências");
  else if (routeName === "pessoas") renderCollection("pessoas", "Pessoas públicas", "people", "Instituição");
  else if (routeName === "maldições") renderCollection("maldições", "Maldições conhecidas", "curses", "Registro técnico");
  else if (routeName === "glossario") renderCollection("glossario", "Glossário", "glossary", "Termos de pesquisa");
  else if (routeName === "quadro") renderBoard();
  else if (routeName === "notas") renderNotes();
  else renderHome();
}

$("#dialogClose").addEventListener("click", () => dialog.close());
$("#openSidebar").addEventListener("click", () => $("#sidebar").classList.add("open"));
$("#closeSidebar").addEventListener("click", () => $("#sidebar").classList.remove("open"));
$$(".nav-link").forEach(a => a.addEventListener("click", () => $("#sidebar").classList.remove("open")));
searchInput.addEventListener("input", e => globalSearch(e.target.value));
$("#clearSearch").addEventListener("click", () => { searchInput.value = ""; globalSearch(""); });
window.addEventListener("hashchange", route);
route();
