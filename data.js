const DB = {
  site: {
    title: "Arquivo Kiyomi",
    subtitle: "Setor de Arquivos / Biblioteca — Colégio Jujutsu",
    notice: "Arquivo de consulta interna. Informações sensíveis foram omitidas ou marcadas como restritas."
  },
  homeCases: [
    {
      id: "possivel-maldicao-sem-nome",
      title: "Possível Maldição Sem Nome",
      status: "Aberto",
      priority: "Alta",
      clickable: true,
      summary: "Agrupamento de três ocorrências antigas que compartilham o mesmo padrão: lugares lembrados por civis, mas ausentes em mapas, registros oficiais ou estrutura física verificável."
    },
    {
      id: "almas-e-contratos",
      title: "Caso Almas e Contratos",
      status: "Não liberado",
      priority: "Restrito",
      clickable: false,
      summary: "Arquivo listado no índice, mas indisponível para consulta comum. Requer autorização superior."
    },
    {
      id: "lagrimas-de-sangue",
      title: "Lágrimas de Sangue",
      status: "Não liberado",
      priority: "Restrito",
      clickable: false,
      summary: "Arquivo listado no índice, mas indisponível para consulta comum. Conteúdo em revisão."
    },
    {
      id: "cavaleiros-divinos",
      title: "Cavaleiros Divinos",
      status: "Não liberado",
      priority: "Restrito",
      clickable: false,
      summary: "Arquivo listado no índice, mas indisponível para consulta comum. Acesso bloqueado pelo setor administrativo."
    }
  ],
  caseGroups: {
    "possivel-maldicao-sem-nome": {
      title: "Possível Maldição Sem Nome",
      classification: "Fenômenos de rota / espaço lembrado / nome ausente",
      status: "Aberto",
      curator: "Kiyomi Fushizato",
      risk: "Baixo a moderado, com potencial de escalada",
      summary: "Três ocorrências antigas foram agrupadas por semelhança estrutural. Nenhuma delas, isoladamente, justificava mobilização pesada. Juntas, sugerem um padrão: lugares sem registro que parecem existir apenas para certas pessoas, em certos horários ou sob determinadas condições emocionais.",
      notes: [
        "Nenhum dos três locais consta de mapas oficiais recentes.",
        "Todos os relatos envolvem memória civil inconsistente.",
        "O padrão pode indicar uma maldição ainda sem corpo definido, ou um conjunto de dobras alimentadas pelo mesmo mecanismo.",
        "Evitar divulgar como 'domínio' antes de confirmação técnica."
      ],
      subcases: ["escadaria-sem-numero", "quarto-0-b", "viela-do-sino-mudo"]
    }
  },
  subcases: {
    "escadaria-sem-numero": {
      title: "Caso 1 — Escadaria sem número",
      status: "Arquivo antigo / reaberto",
      place: "Entre dois prédios comerciais antigos",
      risk: "Baixo, enquanto não investigado presencialmente",
      summary: "Uma escadaria entre dois prédios apareceu em três relatos diferentes. Nenhum mapa registrava o lugar.",
      report: "Os relatos descrevem uma escadaria estreita, de concreto gasto, com corrimão metálico frio e degraus que pareciam aumentar durante a subida. Nenhuma câmera de rua registrou a entrada. Os três civis que afirmaram ter visto a escadaria não se conheciam, mas descreveram a mesma sensação: a impressão de que estavam indo para um andar que não existia.",
      timeline: [
        "Primeiro relato: funcionário de entrega relata ter subido seis lances e retornado ao térreo pela mesma porta.",
        "Segundo relato: estudante afirma ter ouvido vozes no topo da escada, mas não encontrou porta.",
        "Terceiro relato: morador diz ter visto a escada desaparecer quando tentou fotografar."
      ],
      clues: [
        "Ausência total em plantas prediais.",
        "Relatos coincidem no cheiro de cimento molhado.",
        "Todos os civis relataram esquecimento parcial após sair.",
        "A palavra 'número' aparece repetidamente nos depoimentos, mesmo sem pergunta direta."
      ],
      kiyomi: "A escadaria parece menos uma passagem e mais um teste de orientação. Se o padrão estiver correto, ela talvez só apareça para pessoas que procuram um atalho ou sentem que estão atrasadas.",
      gm: "Bom caso para sessão curta de investigação. Pode virar uma dobra vertical, onde subir demais leva ao mesmo ponto emocional do personagem."
    },
    "quarto-0-b": {
      title: "Caso 2 — Quarto 0-B",
      status: "Não confirmado / monitoramento",
      place: "Hospital antigo reformado parcialmente",
      risk: "Médio se houver permanência noturna",
      summary: "Um hospital antigo tinha um quarto que pacientes lembravam, mas funcionários negavam existir.",
      report: "Pacientes internados em alas diferentes mencionaram o Quarto 0-B como se fosse um espaço comum. Alguns diziam ter visto uma porta branca no fim de um corredor de serviço. Outros afirmavam ter escutado um equipamento cardíaco vindo de dentro. A administração do hospital negou a existência do quarto, e as plantas mostram apenas uma parede de manutenção no local descrito.",
      timeline: [
        "Primeira menção: paciente idoso pergunta por 'quem ficou no 0-B'.",
        "Segunda menção: técnica de enfermagem temporária relata ter visto uma porta, mas não a encontrou novamente.",
        "Terceira menção: criança internada desenha um quarto com janela para um céu escuro, apesar de o corredor não ter janelas."
      ],
      clues: [
        "A numeração 0-B não combina com o padrão do hospital.",
        "Relatos associados a pacientes em estado vulnerável.",
        "Algumas testemunhas descrevem cheiro de álcool hospitalar muito forte.",
        "Nenhuma câmera mostra a porta, mas há falhas de imagem no corredor."
      ],
      kiyomi: "O nome '0-B' é estranho. Não parece uma sala esquecida; parece uma sala tentando se encaixar em uma lógica administrativa. Isso é mais preocupante do que uma aparição comum.",
      gm: "Bom caso para suspense investigativo, envolvendo memória hospitalar, pacientes que lembram de alguém que nunca existiu e registros apagados."
    },
    "viela-do-sino-mudo": {
      title: "Caso 3 — Viela do Sino Mudo",
      status: "Arquivo antigo / baixa prioridade aparente",
      place: "Viela residencial estreita",
      risk: "Baixo, exceto em horários específicos",
      summary: "Moradores ouviam um sino tocar numa viela onde não havia templo, escola ou igreja.",
      report: "A viela não possui templo, igreja, escola, torre, sino, poste sonoro ou estrutura metálica que justifique o som. Ainda assim, moradores relataram badaladas em noites úmidas. O som não parecia alto, mas era sentido como algo muito próximo. Pessoas que tentavam seguir o som chegavam sempre ao mesmo muro sem saída.",
      timeline: [
        "Primeiros relatos surgem após uma semana de chuva constante.",
        "Morador tenta gravar o som; o áudio registra apenas ruído baixo.",
        "Uma senhora afirma ter contado treze badaladas, embora o som tenha durado menos de um minuto."
      ],
      clues: [
        "Som percebido de forma mais forte por pessoas sozinhas.",
        "A viela parece mais longa em relatos noturnos.",
        "Animais evitam o muro final durante as noites de chuva.",
        "O termo 'mudo' foi usado por mais de uma testemunha, sem combinação prévia."
      ],
      kiyomi: "O sino não precisa existir fisicamente para orientar uma rota. Sons também podem funcionar como placa. Isso torna o caso mais próximo da Rua Kamimori do que parecia no relatório antigo.",
      gm: "Bom caso para investigação sensorial. Pode ser usado para provocar dúvida sem precisar de combate imediato."
    }
  },
  professors: [
    {
      id: "daiki-arashiro",
      name: "Daiki Arashiro",
      role: "Diretor da instituição",
      type: "Direção",
      portrait: "assets/portraits/daiki-arashiro.svg",
      public: "Diretor do Colégio Jujutsu. Figura administrativa máxima da instituição e responsável por decisões de risco elevado.",
      kiyomi: "Daiki mantém mais arquivos fora do sistema comum do que admite. Não parece negligência; parece controle. Trata funcionários e alunos como recursos preciosos, não de forma fria, mas estratégica. Sabe mais sobre chaves, selos e rotas do que costuma registrar em documentos compartilhados.",
      technique: "Presença e ordem. Registros antigos indicam uma técnica de imposição de presença capaz de nocautear, pressionar e forçar obediência em certas condições.",
      notes: ["Acesso restrito a documentos de realidade dobrada.", "Decisões de campo raramente são improvisadas.", "Evitar confrontar sem prova concreta."]
    },
    {
      id: "sakura-gojo",
      name: "Sakura Gojo",
      role: "Professora de teoria amaldiçoada",
      type: "Professora",
      portrait: "assets/portraits/sakura-gojo.svg",
      public: "Responsável por aulas teóricas avançadas sobre energia amaldiçoada, leitura de fenômenos e fundamentos de técnicas.",
      kiyomi: "Sakura percebe detalhes que outras pessoas não sabem que revelaram. Mantém postura ocupada e irônica, mas evita ser cruel com alunos. Só reconhece autoridade quando considera a pessoa realmente acima dela em competência ou força.",
      technique: "Seis Olhos / leitura avançada de energia. Capacidade elevada de análise, precisão e interpretação de fenômenos.",
      notes: ["Boa fonte para validar hipóteses técnicas.", "Não pedir resposta simples para problema complexo.", "Pode esconder preocupação atrás de sarcasmo."]
    },
    {
      id: "sayuri-aozora",
      name: "Sayuri Aozora",
      role: "Professora de combate",
      type: "Professora",
      portrait: "assets/portraits/sayuri-aozora.svg",
      public: "Responsável por treinamento físico, combate aplicado e reação em campo.",
      kiyomi: "Sayuri parece relaxada quando não há perigo, mas muda muito rápido quando percebe ameaça real. A leitura corporal dela é assustadoramente precisa. É uma das melhores pessoas para avaliar se um aluno está pronto para uma missão perigosa.",
      technique: "Liberação de gases pela pele. Pode controlar tipo e quantidade, incluindo substâncias incapacitantes.",
      notes: ["Extremamente rápida.", "Perigosa em ambiente fechado.", "Confiável para treino prático e contenção física."]
    },
    {
      id: "akane-kurogami",
      name: "Akane Kurogami",
      role: "Enfermeira da instituição",
      type: "Suporte médico",
      portrait: "assets/portraits/akane-kurogami.svg",
      public: "Responsável pela enfermaria, recuperação pós-missão e triagem médica dos alunos e funcionários.",
      kiyomi: "Akane sabe curar, mas também entende como ferimentos se tornam armas. Ela não demonstra interesse em usar a técnica ofensivamente, o que talvez seja exatamente o que a torna segura para a enfermaria. Guarda registros médicos melhor do que muitos professores guardam relatórios.",
      technique: "Manipulação de feridas, doenças e ferimentos graves. Registros indicam capacidade de curar quadros severos com treinamento e vontade adequados.",
      notes: ["Nunca subestimar o conhecimento clínico dela.", "Pode detectar mentiras fisiológicas simples.", "Acesso a dados sensíveis de alunos e staff."]
    },
    {
      id: "akiya",
      name: "Akiya",
      role: "Professora e ferreira",
      type: "Professora / Forja",
      portrait: "assets/portraits/akiya.svg",
      public: "Responsável por armas, manutenção de equipamentos e orientação prática sobre objetos amaldiçoados.",
      kiyomi: "Akiya não gosta de rodeios. Quando recusa um pedido, normalmente é porque sabe o que aquele objeto faria com a pessoa. Seu trabalho na forja mostra mais cuidado do que suas falas deixam parecer.",
      technique: "Não registrada em detalhes no arquivo comum. Competência física e técnica de forja acima da média.",
      notes: ["Boa fonte sobre armas amaldiçoadas.", "Fala pouco, observa muito.", "Pode reconhecer material amaldiçoado raro pelo desgaste."]
    },
    {
      id: "aventurine",
      name: "Aventurine",
      role: "Professor, alfaiate e especialista em probabilidade",
      type: "Professor / Alfaiataria",
      portrait: "assets/portraits/aventurine.svg",
      public: "Professor conhecido por elegância, riqueza e produção de roupas amaldiçoadas com efeitos discretos de sorte e desvio de azar.",
      kiyomi: "Aventurine age como se tudo fosse jogo, mas sua paciência com pessoas solitárias ou quebradas é mais consistente do que ele admite. A alfaiataria dele é uma forma de ajudar sem depender exclusivamente da própria sorte.",
      technique: "Manipulação de probabilidade. Pode distorcer sorte própria e influenciar a sorte de outros com encantamentos. Domínios podem existir por aspecto compreendido da técnica.",
      notes: ["Muito rico.", "Vaidoso, mas útil.", "Roupas dele devem ser avaliadas como objetos de suporte, não apenas estética."]
    },
    {
      id: "yuka-okkotsu",
      name: "Yuka Okkotsu",
      role: "Professora e feiticeira jujutsu",
      type: "Professora",
      portrait: "assets/portraits/yuka-okkotsu.svg",
      public: "Professora de alto nível, conhecida por postura séria, calma e atuação em técnicas de invocação/sombra.",
      kiyomi: "Yuka controla a própria presença muito bem. Não costuma desperdiçar palavras. Quando ela intervém, é porque já avaliou que a situação passou do limite aceitável.",
      technique: "Técnica das Dez Sombras, conforme registros internos de combate e treinamento.",
      notes: ["Evitar confundir relações familiares com favoritismo.", "Alta disciplina.", "Boa fonte para teoria prática de invocações."]
    }
  ],
  studentsAndStaff: [
    {
      id: "kiyomi-fushizato",
      name: "Kiyomi Fushizato",
      role: "Arquivista, bibliotecária e descriptografia",
      category: "Arquivo",
      summary: "Responsável por organizar registros, cruzar padrões, descriptografar documentos e manter dossiês de consulta. Normalmente não atua em missões de campo."
    },
    {
      id: "haruki-kisaragi",
      name: "Haruki Kisaragi",
      role: "Aluno destaque em barreiras e selos",
      category: "Aluno / suporte técnico",
      summary: "Referência interna para contenção, barreiras e selos. Pode explicar anomalias com linguagem técnica mais clara do que muitos relatórios oficiais."
    },
    {
      id: "marcao",
      name: "Marcão",
      role: "Condutor e ex-feiticeiro",
      category: "Transporte / extração",
      summary: "Motorista associado a rotas e deslocamento seguro. Evita letalidade direta e prefere retirada, proteção e neutralização."
    },
    {
      id: "shiori-kisaragi",
      name: "Shiori Kisaragi",
      role: "Condutora de operações externas",
      category: "Transporte / reconhecimento",
      summary: "Feiticeira utilitária focada em rotas seguras, travessia e leitura espacial de trajetos anormais."
    },
    {
      id: "yuri-itadori",
      name: "Yuri Itadori",
      role: "Feiticeira grau 2",
      category: "Aluna / combate",
      summary: "Extrovertida, forte e adaptável. Arquivos indicam alto potencial em combate corpo a corpo e leitura de impacto."
    }
  ],
  curses: [
    {
      id: "rua-sem-nome",
      name: "Maldição da Rua Sem Nome",
      status: "Associada ao dossiê Possível Maldição Sem Nome",
      threat: "Moderada",
      summary: "Entidade ligada a rotas erradas, placas vazias, nomes chamados e espaços que aparentam aprender o caminho de quem entra."
    },
    {
      id: "nome-raspado",
      name: "Nome Raspado",
      status: "Registro menor",
      threat: "Baixa a moderada",
      summary: "Maldições humanoides incompletas, associadas a nomes apagados e identidades parcialmente corroídas."
    },
    {
      id: "couro-vivo",
      name: "Maldição do Couro Vivo",
      status: "Arquivo de contenção",
      threat: "Alta",
      summary: "Maldição física de resistência elevada. Registros recomendam cuidado com investidas e ataques de chicoteamento."
    },
    {
      id: "carcereiro-oitava-direcao",
      name: "Carcereiro da Oitava Direção",
      status: "Registro ritual",
      threat: "Variável",
      summary: "Entidade de contenção e controle de campo. Pode surgir associada a selos, direções e prisões amaldiçoadas."
    }
  ],
  glossary: [
    { term: "Dobra", text: "Anomalia espacial menor que não necessariamente alcança o nível de domínio. Pode distorcer caminho, memória, percepção ou retorno." },
    { term: "Lugar sem nome", text: "Local sem registro estável, frequentemente associado a esquecimento, ausência em mapas ou placas vazias." },
    { term: "Placa vazia", text: "Objeto recorrente em fenômenos de rota. Pode funcionar como âncora, isca ou marcador de identidade." },
    { term: "Rota instável", text: "Caminho que muda conforme observação, medo, intenção ou energia amaldiçoada ao redor." },
    { term: "Arquivo restrito", text: "Documento listado no sistema, mas inacessível sem autorização específica." }
  ]
};
