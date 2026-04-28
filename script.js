const cases = [
  {
    title: "Rua Kamimori — Placa Sem Nome",
    type: "Fenômeno de rota / dobra local",
    status: "Encerrado parcialmente",
    risk: "Moderado",
    description:
      "Três desaparecimentos temporários foram ligados a uma rua comercial antiga. O ponto comum entre os relatos era uma placa metálica completamente sem nome."
  },
  {
    title: "Escadaria sem número",
    type: "Rota instável",
    status: "Arquivo antigo",
    risk: "Baixo",
    description:
      "Uma escadaria apareceu em três relatos diferentes entre prédios próximos. Nenhum mapa registrava sua existência."
  },
  {
    title: "Quarto 0-B",
    type: "Espaço lembrado / não registrado",
    status: "Não confirmado",
    risk: "Em análise",
    description:
      "Pacientes de um hospital antigo lembravam de um quarto inexistente. Funcionários negavam que o local tivesse existido."
  },
  {
    title: "Viela do Sino Mudo",
    type: "Fenômeno auditivo",
    status: "Arquivo antigo",
    risk: "Baixo",
    description:
      "Moradores ouviam um sino tocar em uma viela sem templo, igreja, escola ou estrutura que justificasse o som."
  }
];

const victims = [
  {
    title: "Entregador",
    status: "Vivo",
    risk: "Confuso",
    description:
      "Sumiu por cerca de três horas durante uma entrega. Disse ter apenas virado na rua errada. O aplicativo registrou distância incoerente."
  },
  {
    title: "Dona da floricultura",
    status: "Viva",
    risk: "Abalada",
    description:
      "Ouviu a voz da filha chamando, mesmo sabendo que ela morava em outra cidade. Retornou com as mãos sujas de terra escura."
  },
  {
    title: "Segurança noturno",
    status: "Vivo",
    risk: "Resistente a falar",
    description:
      "Relatou ter visto alguém no fim da rua. Não viu o rosto, mas disse que a presença sabia seu nome verdadeiro."
  }
];

const clues = [
  {
    title: "Placa sem nome",
    status: "Recuperada",
    risk: "Objeto de análise",
    description:
      "A placa da maldição caiu no chão após a derrota da criatura. Por instantes, nomes incompletos surgiram em sua superfície."
  },
  {
    title: "Papel encontrado",
    status: "Importante",
    risk: "Possível interferência externa",
    description:
      "Anotação humana encontrada nos restos da Loja Sem Nome. Menciona locais sem nome, rotas instáveis e observação de estudantes."
  },
  {
    title: "Risco de estrela incompleta",
    status: "Pista visual",
    risk: "Em análise",
    description:
      "No verso da placa antiga da rua havia um risco fino parecido com metade de uma estrela de oito pontas."
  },
  {
    title: "Linha 00 — Retorno",
    status: "Pista local",
    risk: "Baixo",
    description:
      "O letreiro do ponto de ônibus indicava uma linha estranha. Após o evento, foi encontrado um aviso antigo de retorno suspenso."
  }
];

const menuButtons = document.querySelectorAll(".menu-btn");
const views = document.querySelectorAll(".view");
const viewTitle = document.getElementById("view-title");
const searchInput = document.getElementById("searchInput");

const titles = {
  overview: "Visão Geral",
  cases: "Casos",
  victims: "Vítimas",
  clues: "Pistas",
  notes: "Anotações"
};

function createCard(item) {
  return `
    <article class="case-card searchable-card">
      <div class="case-meta">
        <span class="tag">${item.status}</span>
        <span class="tag danger">${item.risk}</span>
      </div>
      <h3>${item.title}</h3>
      ${item.type ? `<p><strong>Tipo:</strong> ${item.type}</p>` : ""}
      <p>${item.description}</p>
    </article>
  `;
}

function renderList(id, data) {
  const element = document.getElementById(id);
  element.innerHTML = data.map(createCard).join("");
}

function changeView(viewName) {
  menuButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  views.forEach((view) => {
    view.classList.toggle("active-view", view.id === viewName);
  });

  viewTitle.textContent = titles[viewName];
  searchInput.value = "";
  filterCards("");
}

function filterCards(term) {
  const cards = document.querySelectorAll(".searchable-card");
  const normalizedTerm = term.toLowerCase().trim();

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(normalizedTerm) ? "grid" : "none";
  });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    changeView(button.dataset.view);
  });
});

searchInput.addEventListener("input", (event) => {
  filterCards(event.target.value);
});

renderList("caseList", cases);
renderList("victimList", victims);
renderList("clueList", clues);
