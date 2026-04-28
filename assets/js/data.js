const DB = {
  cases: [
    {
      id: "escadaria-sem-numero",
      title: "Caso 1 — Escadaria sem número",
      category: "Caso antigo",
      status: "Aberto",
      risk: "Baixo a moderado",
      access: "Público interno",
      location: "Passagem entre dois prédios comerciais antigos",
      summary: "Uma escadaria entre dois prédios apareceu em três relatos diferentes. Nenhum mapa registrava o lugar.",
      tags: ["rota instável", "espaço não mapeado", "degraus", "relatos repetidos"],
      imageHint: "Escadaria estreita entre prédios, sem número, arquitetura urbana japonesa, fim de tarde, atmosfera discreta e estranha.",
      timeline: [
        "Primeiro relato: estudante civil diz ter subido uma escada que não levava ao andar esperado.",
        "Segundo relato: entregador usa a escada como atalho e retorna ao ponto de partida.",
        "Terceiro relato: morador lembra de vinte e sete degraus, mas o espaço físico comportaria no máximo doze.",
        "Após vistoria comum, a escadaria não foi encontrada. O beco existe, mas a passagem lateral não."
      ],
      witnesses: [
        { name: "Estudante civil", note: "Lembrou do corrimão frio e da sensação de subir sem ganhar altura." },
        { name: "Entregador", note: "Registrou atraso de 18 minutos sem sair do quarteirão." },
        { name: "Morador antigo", note: "Afirmou que a escada 'sempre esteve ali', mas não soube indicar exatamente onde." }
      ],
      clues: ["Degraus lembrados em número diferente por cada testemunha.", "Ausência em mapas comuns e digitais.", "Relato recorrente de corrimão úmido mesmo em dia seco."],
      questions: ["A escadaria aparece apenas quando alguém procura atalho?", "O número de degraus muda conforme a pessoa?", "A escada leva a algum lugar ou apenas devolve o alvo?"],
      kiyomiNote: "Esse caso parece pequeno, mas o padrão é limpo demais. Três relatos parecidos, nenhum registro físico. Eu não descartaria uma dobra curta."
    },
    {
      id: "quarto-0b",
      title: "Caso 2 — Quarto 0-B",
      category: "Caso antigo",
      status: "Arquivado com dúvida",
      risk: "Moderado",
      access: "Público interno",
      location: "Hospital antigo em ala parcialmente reformada",
      summary: "Um hospital antigo tinha um quarto que pacientes lembravam, mas funcionários negavam existir.",
      tags: ["memória coletiva", "hospital", "quarto inexistente", "registro ausente"],
      imageHint: "Corredor de hospital antigo, placa de quarto 0-B quase apagada, luz fluorescente fria, sem gore.",
      timeline: [
        "Pacientes de longa internação mencionam o Quarto 0-B em conversas independentes.",
        "Funcionários negam a existência do quarto e afirmam que a numeração da ala nunca usou zero.",
        "Uma ficha antiga cita '0-B' em uma anotação lateral, mas a página foi danificada por umidade.",
        "Vistoria jujutsu não encontrou maldição ativa, apenas resíduo fraco de energia em uma parede sem porta."
      ],
      witnesses: [
        { name: "Paciente idosa", note: "Disse que o quarto era usado para 'gente que não podia ser visitada'." },
        { name: "Técnico de enfermagem", note: "Não lembrava do quarto, mas evitava passar pela parede final da ala." },
        { name: "Ex-interno", note: "Lembrou de uma campainha tocando de madrugada, vinda de trás da parede." }
      ],
      clues: ["Numeração hospitalar incompatível.", "Ficha médica com anotação lateral quase ilegível.", "Resíduo fraco em parede sem porta."],
      questions: ["O quarto foi apagado fisicamente ou apenas da memória institucional?", "Por que pacientes lembram e funcionários não?", "O quarto ainda existe em alguma camada da ala?"],
      kiyomiNote: "Hospitais acumulam medo, esperança e culpa. Não gosto quando um lugar desses começa a guardar números que a planta nega."
    },
    {
      id: "viela-do-sino-mudo",
      title: "Caso 3 — Viela do Sino Mudo",
      category: "Caso antigo",
      status: "Sem ameaça ativa",
      risk: "Baixo",
      access: "Público interno",
      location: "Viela residencial sem templo, igreja ou escola próxima",
      summary: "Moradores ouviam um sino tocar numa viela onde não havia templo, escola ou igreja.",
      tags: ["fenômeno auditivo", "viela", "sino", "rotina urbana"],
      imageHint: "Viela estreita residencial à noite, cabos, pequenas casas, sensação calma e estranha, sino invisível sugerido por sombras.",
      timeline: [
        "Moradores relatam som de sino sempre às 03:12.",
        "Nenhum objeto físico capaz de produzir o som é encontrado.",
        "O som para por três noites após uma moradora trocar o caminho de volta para casa.",
        "Registro encerrado como fenômeno residual de baixa ameaça, mas sem explicação completa."
      ],
      witnesses: [
        { name: "Moradora local", note: "Disse que o sino 'tocava para alguém que ainda ia chegar'." },
        { name: "Criança do bairro", note: "Afirmou que o som vinha de cima, mas a viela não tinha torre ou sino." },
        { name: "Comerciante", note: "Parou de ouvir o som depois de mudar o horário de fechamento." }
      ],
      clues: ["Horário recorrente: 03:12.", "Som percebido por moradores em casas diferentes.", "Ausência de fonte física."],
      questions: ["O sino marcava chegada, partida ou repetição?", "A alteração de rotina enfraqueceu o fenômeno?", "O som era chamado ou aviso?"],
      kiyomiNote: "Baixa ameaça não significa irrelevante. Às vezes, fenômenos pequenos são só versões educadas de algo maior."
    }
  ],
  clues: [
    { id: "escada-corrimao", title: "Corrimão úmido", category: "Pista", source: "Escadaria sem número", risk: "Baixo", tags: ["objeto", "sensação"], text: "Todas as testemunhas lembram do corrimão como frio e úmido, mesmo em dias secos." },
    { id: "ficha-0b", title: "Ficha com anotação 0-B", category: "Pista", source: "Quarto 0-B", risk: "Moderado", tags: ["documento", "hospital"], text: "Uma ficha médica danificada contém a marcação 0-B em uma anotação lateral." },
    { id: "sino-0312", title: "Horário 03:12", category: "Pista", source: "Viela do Sino Mudo", risk: "Baixo", tags: ["horário", "fenômeno auditivo"], text: "O sino era ouvido sempre às 03:12, mas não havia fonte física identificada." },
    { id: "rotina-quebrada", title: "Rotina quebrada", category: "Pista", source: "Viela do Sino Mudo", risk: "Baixo", tags: ["padrão", "comportamento"], text: "O fenômeno parou temporariamente quando uma moradora alterou seu caminho de volta para casa." },
    { id: "parede-sem-porta", title: "Parede sem porta", category: "Pista", source: "Quarto 0-B", risk: "Moderado", tags: ["local", "resíduo"], text: "Resíduo fraco de energia foi localizado numa parede que, segundo pacientes, deveria conter uma porta." }
  ],
  people: [
    { id: "kiyomi", title: "Kiyomi Fushizato", group: "Arquivos", role: "Biblioteca / arquivos / descriptografia", visibility: "Público interno", tags: ["arquivo", "pesquisa", "suporte"], text: "Aluna investigadora que normalmente não vai em missões. Organiza registros, cruza padrões e preserva casos menores para consulta futura." },
    { id: "haruki", title: "Haruki Kisaragi", group: "Aluno especialista", role: "Contenção, barreiras e selos", visibility: "Público interno", tags: ["barreiras", "selos", "aula"], text: "Aluno de destaque em contenção. Frequentemente consultado em fenômenos que envolvem espaços instáveis, dobras e ancoragem." },
    { id: "daiki", title: "Daiki Arashiro", group: "Direção", role: "Diretor da instituição", visibility: "Público institucional", tags: ["diretor", "gestão", "autoridade"], text: "Responsável pela direção da escola. Figura forte, estratégica e protetora da estrutura institucional." },
    { id: "sakura", title: "Sakura Gojo", group: "Professora", role: "Teoria amaldiçoada", visibility: "Público institucional", tags: ["teoria", "seis olhos", "aula"], text: "Professora de teoria amaldiçoada. Costuma se manter ocupada e é usada como referência técnica em aulas complexas." },
    { id: "sayuri", title: "Sayuri Aozora", group: "Professora", role: "Combate", visibility: "Público institucional", tags: ["combate", "treino", "professora"], text: "Professora de luta. Extremamente forte e rápida, responsável por treino prático e avaliação física dos alunos." },
    { id: "akane", title: "Akane Kurogami", group: "Enfermaria", role: "Enfermeira / medicina", visibility: "Público institucional", tags: ["cura", "enfermaria", "medicina"], text: "Responsável pela enfermaria. Técnica ligada a feridas, doenças e tratamento de danos graves." },
    { id: "akiya", title: "Akiya", group: "Professora", role: "Forja e armas amaldiçoadas", visibility: "Público institucional", tags: ["forja", "equipamento", "professora"], text: "Professora e ferreira da instituição. Atua com manutenção, criação e avaliação de armas amaldiçoadas." },
    { id: "aventurine", title: "Aventurine", group: "Professor", role: "Alfaiataria amaldiçoada / probabilidade", visibility: "Público institucional", tags: ["roupas", "probabilidade", "professor"], text: "Professor rico e vaidoso, conhecido por criar roupas amaldiçoadas com efeitos sutis ligados à sorte e probabilidade." },
    { id: "yuri", title: "Yuri Itadori", group: "Aluna", role: "Feiticeira grau 2", visibility: "Público interno", tags: ["corpo a corpo", "kokusen", "aluna"], text: "Aluna de combate corpo a corpo, extrovertida e determinada. Frequentemente ajuda professores em missões e tarefas práticas." },
    { id: "marcao", title: "Marcão", group: "Transporte", role: "Motorista / ex-feiticeiro", visibility: "Público interno", tags: ["rotas", "extração", "transporte"], text: "Motorista da escola e ex-feiticeiro. Conhecido por atuar em travessia, retirada e transporte seguro de equipes." }
  ],
  curses: [
    { id: "baixa-forma", title: "Maldição de baixa forma", category: "Maldição conhecida", danger: "Baixo", tags: ["comum", "baixa ameaça"], text: "Manifestação simples de medo ou desconforto acumulado. Normalmente fraca, mas perigosa para civis desprotegidos." },
    { id: "rota-instavel", title: "Maldição de rota instável", category: "Tipo observado", danger: "Moderado", tags: ["caminhos", "espaço", "orientação"], text: "Tipo associado a caminhos falsos, sensação de repetição e alterações em rotas curtas. Nem sempre forma domínio completo." },
    { id: "residual-auditiva", title: "Manifestação auditiva residual", category: "Fenômeno menor", danger: "Baixo", tags: ["som", "memória", "repetição"], text: "Fenômeno que repete sons ligados a rotina, medo ou luto. Pode ser apenas resíduo ou sinal de algo mais antigo." },
    { id: "ancora-espaco", title: "Âncora de espaço", category: "Conceito técnico", danger: "Variável", tags: ["barreiras", "dobras", "selos"], text: "Objeto, placa, número, porta ou nome que ajuda um espaço instável a manter forma por mais tempo." }
  ],
  glossary: [
    { id: "dobra", title: "Dobra de caminho", category: "Glossário", tags: ["espaço", "rota"], text: "Fenômeno em que uma rota comum passa a repetir, substituir ou apagar trechos do caminho. Não é necessariamente um domínio." },
    { id: "ancora", title: "Âncora", category: "Glossário", tags: ["selos", "estabilidade"], text: "Elemento que estabiliza um fenômeno: nome, porta, placa, objeto, número, memória ou marca ritual." },
    { id: "barreira", title: "Barreira", category: "Glossário", tags: ["técnica", "contenção"], text: "Estrutura de energia que separa, oculta, limita ou organiza uma área. Pode proteger ou prender." },
    { id: "selo", title: "Selo", category: "Glossário", tags: ["contenção", "correntes"], text: "Método de prisão ou contenção. No mundo da campanha, correntes frequentemente simbolizam selos." },
    { id: "residuo", title: "Resíduo amaldiçoado", category: "Glossário", tags: ["energia", "pista"], text: "Resto de energia deixado por técnica, maldição ou fenômeno. Pode indicar que algo aconteceu, mesmo sem ameaça ativa." },
    { id: "cortina", title: "Cortina", category: "Glossário", tags: ["ocultação", "missão"], text: "Barreira comum para ocultar atividade jujutsu de civis e limitar interferência externa." }
  ]
};
