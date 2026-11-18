/**
 * TODOS os dados do estúdio ficam aqui.
 * Edite este arquivo para atualizar textos, contatos, horários, modalidades e avaliações.
 * Tudo marcado com [CONFIRMAR] precisa ser validado com a cliente antes de publicar.
 */

export const empresa = {
  nome: 'Ponto de Equilíbrio Pilates by Susy Aguiar',
  nomeCurto: 'Ponto de Equilíbrio Pilates',
  sigla: 'PEP', // como as alunas chamam o estúdio nas avaliações
  responsavel: 'Susy Aguiar',
  registro: '[CONFIRMAR: formação e registro profissional (CREFITO/CREF) da Susy e da equipe]',
  categoria: 'Estúdio de pilates',

  // [CONFIRMAR: domínio definitivo — também em index.html, robots.txt e sitemap.xml]
  site: 'https://www.pontodeequilibriopilates.com.br',

  telefone: '(48) 99921-2062',
  telefoneE164: '+5548999212062',
  whatsapp: '5548999212062',
  email: '[CONFIRMAR: e-mail de contato]',
  instagram: '', // [CONFIRMAR: @ do Instagram — deixe vazio para ocultar]

  endereco: {
    predio: 'Centro Executivo Ernesto Pausewang · Comercial São Francisco',
    rua: 'R. Lauro Linhares, 2010 – Torre A, sala 302',
    bairro: 'Trindade',
    cidade: 'Florianópolis',
    uf: 'SC',
    cep: '88036-002',
    completo: 'R. Lauro Linhares, 2010 – Torre A, sala 302 – Trindade, Florianópolis – SC, 88036-002',
    curto: 'Lauro Linhares, 2010 · Torre A, sala 302 · Trindade',
    complemento: 'No Centro Executivo Ernesto Pausewang (Comercial São Francisco).',
  },
  // [CONFIRMAR: coordenadas exatas — copie do Google Maps (clique direito no pino)]
  geo: null as null | { lat: number; lng: number },

  // O Google Maps só informa "fecha 20:30".
  horarios: [
    { dias: 'Segunda a sexta', horas: '[CONFIRMAR: abertura] às 20:30' },
    { dias: 'Sábado', horas: '[CONFIRMAR]' },
    { dias: 'Domingo', horas: '[CONFIRMAR]' },
  ],
  horarioResumo: 'Aulas até as 20h30 · [CONFIRMAR: dias e horário de abertura]',
  // formato schema.org — preencher quando os horários forem confirmados
  horariosSchema: [] as { dayOfWeek: string[]; opens: string; closes: string }[],

  google: { nota: 5.0, avaliacoes: 43 },

  // Atributos informados no perfil do Google
  atributos: ['Empresa que acolhe a comunidade LGBTQ+', 'Empresa de empreendedoras'],

  /**
   * Agenda de aula experimental (página Planos e horários).
   * [CONFIRMAR: dias, horário de abertura, duração da aula e horários de turma].
   * Só "fecha às 20:30" veio do Google; o restante é um ponto de partida para validar.
   */
  agenda: {
    fuso: 'America/Sao_Paulo',
    diasSemana: [1, 2, 3, 4, 5],
    inicio: '07:00', // [CONFIRMAR]
    fim: '20:30',
    intervaloMin: 60, // [CONFIRMAR: duração da aula]
    antecedenciaMin: 180,
    semanas: 2,
    feriados: [
      '2026-11-20', '2026-12-25', '2027-01-01', '2027-02-08', '2027-02-09', '2027-03-23', // 23/03: aniversário de Florianópolis
      '2027-03-26', '2027-04-21', '2027-05-27', '2027-09-07', '2027-10-12', '2027-11-02', '2027-11-15', '2027-12-25',
    ], // [CONFIRMAR: recesso de fim de ano e férias do estúdio]
  },

  fundacao: '[CONFIRMAR: ano de fundação — uma aluna fala em "quase duas décadas de tradição"]',
  novoEspaco: 'janeiro de 2023', // citado em avaliação; [CONFIRMAR]
  estacionamento: '[CONFIRMAR: estacionamento no prédio, conveniado ou na rua?]',
  pagamento: '[CONFIRMAR: formas de pagamento (Pix, cartão, plano recorrente)]',
  valores: '[CONFIRMAR: valores dos planos ou se prefere informar só pelo WhatsApp]',
  turma: '[CONFIRMAR: número máximo de alunos por aula (individual, dupla, trio…)]',
  duracaoAula: '[CONFIRMAR: duração da aula]',
  experimental: '[CONFIRMAR: a aula experimental é gratuita ou paga?]',
  reposicao: '[CONFIRMAR: regra de reposição de aulas]',
}

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  'Ponto de Equilíbrio Pilates by Susy Aguiar, ' + empresa.endereco.completo,
)}`
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  'Ponto de Equilíbrio Pilates by Susy Aguiar, ' + empresa.endereco.completo,
)}&output=embed`

/* ------------------------------------------------------------------ */
/* Avaliações reais do Google (coladas pela vendedora). Não inventar.   */
/* Média 5,0 em 43 avaliações. [CONFIRMAR: nota individual de cada uma] */
/* ------------------------------------------------------------------ */
export type Avaliacao = { nome: string; nota: number; texto: string; detalhe?: string }
export const avaliacoes: Avaliacao[] = [
  {
    nome: 'Elisa',
    nota: 5,
    detalhe: 'Aluna há 8 anos',
    texto:
      'As profissionais do PEP são super qualificadas e gentis, é um ótimo lugar para fazer pilates! Estou no PEP há 8 anos. O pilates melhora minha respiração, postura, alongamento, fortalecimento, percepção corporal, aliviando dores.',
  },
  {
    nome: 'Katia',
    nota: 5,
    texto:
      'É um Studio de Pilates com quase duas décadas de tradição em Florianópolis, e que acabou de inaugurar, em Janeiro de 2023, um novo ambiente, lindo, moderno e aconchegante! Além disso, as instrutoras são profissionais extremamente capacitadas, atenciosas e de uma energia positiva incrível!!',
  },
  {
    nome: 'Andrea',
    nota: 5,
    texto:
      'Sou aluna há alguns meses e super indico o Ponto de Equilíbrio Pilates. Atendimento de qualidade, espaço todo novinho, sempre limpo e agradável. Os aparelhos são bem higienizados e excelentes profissionais!',
  },
]

/* ------------------------------------------------------------------ */
/* Modalidades                                                         */
/* [CONFIRMAR: lista de modalidades] — o Google só diz "Estúdio de      */
/* pilates". "Pilates nos aparelhos" é certo (fotos). As outras foram   */
/* montadas a partir das avaliações (postura, dores, respiração) e do   */
/* que estúdios desse perfil costumam oferecer. Validar com a Susy.     */
/* ------------------------------------------------------------------ */
export type Servico = {
  slug: string
  nome: string
  resumo: string
  beneficio: string
  descricao: string[]
  paraQuem: string[]
  comoFunciona: { titulo: string; texto: string }[]
  faq: { p: string; r: string }[]
  seoTitle: string
  seoDescription: string
  imagem: { src: string; w: number; h: number; alt: string }
}

export const servicos: Servico[] = [
  {
    slug: 'pilates-nos-aparelhos',
    nome: 'Pilates nos aparelhos',
    resumo: 'Reformer, Cadillac, Chair e Barrel, com instrutora acompanhando de perto.',
    beneficio: 'Força, alongamento e controle do corpo, no seu ritmo.',
    descricao: [
      'É o pilates clássico de estúdio: os exercícios usam molas, barras e alças que ajudam ou desafiam o movimento, conforme o que o seu corpo precisa naquele dia.',
      'As aulas acontecem em grupos pequenos, com a instrutora ajustando cada exercício. Assim dá para evoluir com segurança, seja você iniciante ou aluna de muitos anos.',
    ],
    paraQuem: [
      'Quem quer começar uma atividade física com acompanhamento',
      'Quem já faz academia e quer mais controle e mobilidade',
      'Quem passa o dia sentado e sente o corpo travado',
      'Quem quer uma rotina de exercício que dá vontade de manter',
    ],
    comoFunciona: [
      { titulo: 'Conversa inicial', texto: 'Contamos o seu histórico, objetivos e qualquer dor ou limitação antes da primeira aula.' },
      { titulo: 'Aula experimental', texto: 'Você conhece os aparelhos, o espaço e o jeito de dar aula do estúdio.' },
      { titulo: 'Plano de frequência', texto: 'Escolhe quantas vezes por semana quer vir e os horários que cabem na sua rotina.' },
      { titulo: 'Evolução acompanhada', texto: 'Os exercícios avançam conforme você ganha força, controle e confiança.' },
    ],
    faq: [
      { p: 'Nunca fiz pilates. Consigo acompanhar?', r: 'Consegue. Os aparelhos ajudam o movimento no começo, e a instrutora adapta cada exercício ao seu nível.' },
      { p: 'Quantas alunas por aula?', r: empresa.turma },
      { p: 'Quanto tempo dura a aula?', r: empresa.duracaoAula },
    ],
    seoTitle: 'Pilates nos Aparelhos na Trindade, Florianópolis | Ponto de Equilíbrio',
    seoDescription: 'Aulas de pilates em Reformer, Cadillac, Chair e Barrel na Trindade, Florianópolis. Turmas pequenas e instrutoras qualificadas. Agende uma aula experimental.',
    imagem: { src: '/images/aparelhos-831.webp', w: 831, h: 565, alt: 'Sala do estúdio com Cadillac, banquinho e Ladder Barrel de madeira sobre piso emborrachado verde' },
  },
  {
    slug: 'pilates-para-postura-e-dores',
    nome: 'Pilates para postura e dores',
    resumo: 'Para costas, pescoço e ombros que pedem atenção.',
    beneficio: 'Menos dor no dia a dia e mais consciência de como você se move.',
    descricao: [
      'Muita gente chega ao pilates por causa de uma dor nas costas, no pescoço ou nos ombros. O trabalho começa entendendo a sua postura e os movimentos que incomodam.',
      'As aulas fortalecem o centro do corpo, alongam o que está encurtado e ensinam a respirar melhor. Uma aluna de 8 anos resume bem: respiração, postura, alongamento, fortalecimento e alívio das dores.',
    ],
    paraQuem: [
      'Quem tem dor lombar, cervical ou nos ombros',
      'Quem trabalha muitas horas sentado ou no computador',
      'Quem terminou a fisioterapia e quer manter os ganhos',
      'Quem quer melhorar a postura e a respiração',
    ],
    comoFunciona: [
      { titulo: 'Escuta e avaliação', texto: 'Entendemos onde dói, quando piora e o que você já fez para tratar.' },
      { titulo: 'Exercícios escolhidos', texto: 'Nada de série pronta: a aula é montada para o seu corpo e o seu momento.' },
      { titulo: 'Respiração e consciência', texto: 'Você aprende a perceber o próprio corpo e levar isso para o dia a dia.' },
      { titulo: 'Progressão', texto: 'Conforme a dor diminui, o treino ganha força e amplitude.' },
    ],
    faq: [
      { p: 'Preciso de liberação médica?', r: 'Se você tem uma lesão recente, cirurgia ou condição específica, traga a orientação do seu médico ou fisioterapeuta. [CONFIRMAR: o estúdio exige atestado?]' },
      { p: 'Pilates substitui a fisioterapia?', r: 'Não. Ele complementa e ajuda a manter os resultados. Em caso de dor forte ou lesão, o primeiro passo é a avaliação com um profissional de saúde.' },
      { p: 'Em quanto tempo sinto diferença?', r: 'Muitas alunas percebem o corpo mais solto nas primeiras semanas. O tempo varia de pessoa para pessoa e com a frequência das aulas.' },
    ],
    seoTitle: 'Pilates para Dor nas Costas e Postura em Florianópolis | Trindade',
    seoDescription: 'Pilates para dor lombar, cervical e postura na Trindade, Florianópolis. Aulas montadas para o seu corpo, com respiração e fortalecimento do centro.',
    imagem: { src: '/images/alunos-praticando-663.webp', w: 663, h: 750, alt: 'Aluna alongando sobre a Chair enquanto outro aluno faz exercício no Cadillac ao fundo' },
  },
  {
    slug: 'pilates-para-gestantes',
    nome: 'Pilates para gestantes',
    resumo: 'Movimento seguro na gravidez e na volta depois do parto.',
    beneficio: 'Mais conforto na gestação e uma recuperação mais tranquila.',
    descricao: [
      'Durante a gravidez o corpo muda rápido: o peso se desloca, a lombar trabalha mais e a respiração fica curta. O pilates ajuda a acompanhar essas mudanças com conforto.',
      'Os exercícios são adaptados a cada trimestre e, depois do parto, ajudam a reconectar o abdômen e o assoalho pélvico, sempre com liberação médica.',
    ],
    paraQuem: [
      'Gestantes com liberação do obstetra',
      'Quem já fazia pilates e quer continuar na gravidez',
      'Mães no pós-parto, após a liberação médica',
      'Quem sente dor lombar ou inchaço na gestação',
    ],
    comoFunciona: [
      { titulo: 'Liberação médica', texto: 'Antes de começar, pedimos a liberação do obstetra.' },
      { titulo: 'Aula adaptada', texto: 'Posições e cargas pensadas para cada fase da gestação.' },
      { titulo: 'Respiração e assoalho pélvico', texto: 'Trabalho de respiração e consciência corporal que ajuda no dia a dia e na preparação para o parto.' },
      { titulo: 'Pós-parto', texto: 'Retorno gradual, com foco em abdômen, postura e assoalho pélvico.' },
    ],
    faq: [
      { p: 'A partir de quantas semanas posso começar?', r: 'Depende da liberação do seu obstetra. Converse com ele e traga a orientação na primeira aula.' },
      { p: 'Nunca fiz pilates. Posso começar grávida?', r: 'Em geral, sim, com liberação médica e exercícios adaptados. [CONFIRMAR: política do estúdio]' },
      { p: 'Quando posso voltar depois do parto?', r: 'Após a liberação médica, que costuma acontecer algumas semanas depois do parto.' },
    ],
    seoTitle: 'Pilates para Gestantes em Florianópolis | Trindade',
    seoDescription: 'Pilates na gravidez e no pós-parto na Trindade, Florianópolis. Exercícios adaptados a cada fase, com foco em respiração, postura e assoalho pélvico.',
    imagem: { src: '/images/cadillac-acessorios-589.webp', w: 589, h: 786, alt: 'Cadillac com alças pretas ao lado de uma estante de madeira com arcos, bolas e molas do estúdio' },
  },
  {
    slug: 'pilates-na-maturidade',
    nome: 'Pilates na maturidade',
    resumo: 'Força e equilíbrio para quem tem 60 anos ou mais.',
    beneficio: 'Mais firmeza para caminhar, subir escadas e seguir independente.',
    descricao: [
      'Com o passar dos anos, força e equilíbrio diminuem se não forem treinados. O pilates trabalha os dois com exercícios seguros, sem impacto e sempre com acompanhamento.',
      'Além do corpo, a aula é um momento de cuidado e convivência, num espaço tranquilo e bem cuidado na Trindade.',
    ],
    paraQuem: [
      'Pessoas com 60 anos ou mais',
      'Quem tem medo de cair ou sente as pernas fracas',
      'Quem tem osteopenia ou osteoporose, com orientação médica',
      'Quem quer manter a autonomia nas tarefas do dia a dia',
    ],
    comoFunciona: [
      { titulo: 'Conversa inicial', texto: 'Entendemos sua rotina, limitações e o que você quer melhorar.' },
      { titulo: 'Exercícios sem impacto', texto: 'Os aparelhos dão apoio e segurança para cada movimento.' },
      { titulo: 'Equilíbrio no dia a dia', texto: 'Exercícios que lembram situações reais: levantar, alcançar, virar.' },
      { titulo: 'Acompanhamento', texto: 'Ajustes constantes conforme a força e a confiança aumentam.' },
    ],
    faq: [
      { p: 'Tenho 75 anos. Ainda posso começar?', r: 'Pode. Os exercícios são adaptados à sua condição e o corpo responde ao treino em qualquer idade.' },
      { p: 'O prédio tem elevador?', r: '[CONFIRMAR: acesso por elevador e acessibilidade da Torre A]' },
      { p: 'Preciso de atestado?', r: '[CONFIRMAR: o estúdio pede atestado médico?]' },
    ],
    seoTitle: 'Pilates para Idosos em Florianópolis | Equilíbrio e Força na Trindade',
    seoDescription: 'Pilates para pessoas com 60 anos ou mais na Trindade, Florianópolis. Força, equilíbrio e prevenção de quedas com exercícios seguros e sem impacto.',
    imagem: { src: '/images/sala-frase-1200.webp', w: 1200, h: 758, alt: 'Sala de pilates com Chairs, Reformer e bolas suíças na parede de cimento queimado com uma frase de Joseph Pilates' },
  },
]

/* ------------------------------------------------------------------ */
/* Estrutura (aparelhos vistos nas fotos)                              */
/* ------------------------------------------------------------------ */
export const aparelhos = [
  { nome: 'Reformer', texto: 'A cama com molas e carrinho deslizante. Trabalha o corpo inteiro, deitado, sentado ou em pé.' },
  { nome: 'Cadillac', texto: 'A torre com barras e alças. Permite exercícios suspensos e muita variedade para alongar e fortalecer.' },
  { nome: 'Chair', texto: 'A cadeira com pedal de molas. Pede equilíbrio e controle, ótima para pernas e centro do corpo.' },
  { nome: 'Ladder Barrel', texto: 'O barril com escada. Alonga a coluna e abre o peito, com apoio firme.' },
  { nome: 'Espaldar', texto: 'A barra de parede para alongamentos e exercícios com molas.' },
  { nome: 'Acessórios', texto: 'Bolas suíças, arcos, faixas, rolos e bolinhas para variar as aulas.' },
]

/* ------------------------------------------------------------------ */
/* Galeria                                                             */
/* ------------------------------------------------------------------ */
export const galeria = [
  { src: '/images/sala-frase-1200.webp', w: 1200, h: 758, alt: 'Sala principal com Chairs, Reformer e bolas suíças; na parede, a frase de Joseph Pilates' },
  { src: '/images/recepcao-663.webp', w: 663, h: 785, alt: 'Recepção com parede verde-menta, logo do Ponto de Equilíbrio Pilates e cadeiras de espera' },
  { src: '/images/alunos-praticando-663.webp', w: 663, h: 750, alt: 'Alunos praticando na Chair e no Cadillac com piso emborrachado verde' },
  { src: '/images/aparelhos-831.webp', w: 831, h: 565, alt: 'Cadillac, banquinho e Ladder Barrel de madeira perto das janelas' },
  { src: '/images/cadillac-acessorios-589.webp', w: 589, h: 786, alt: 'Estante de madeira com arcos, faixas e bolas ao lado do Cadillac' },
  { src: '/images/copa-663.webp', w: 663, h: 768, alt: 'Copa com armários de madeira, filtro de água e bancada com chás' },
]

/* ------------------------------------------------------------------ */
/* Perguntas frequentes gerais                                         */
/* ------------------------------------------------------------------ */
export const faqGeral: { p: string; r: string }[] = [
  { p: 'Como faço para começar?', r: `Agende uma aula experimental pelo WhatsApp ${empresa.telefone} ou pela página Planos e horários. Você conhece o estúdio e combinamos sua frequência.` },
  { p: 'A aula experimental é gratuita?', r: empresa.experimental },
  { p: 'Quanto custa?', r: empresa.valores },
  { p: 'Quantas alunas por aula?', r: empresa.turma },
  { p: 'Quais os horários?', r: `As aulas vão até as 20h30. ${empresa.horarioResumo}` },
  { p: 'Posso repor uma aula que perdi?', r: empresa.reposicao },
  { p: 'Onde fica o estúdio? Tem estacionamento?', r: `${empresa.endereco.completo}. ${empresa.endereco.complemento} ${empresa.estacionamento}` },
  { p: 'Quais as formas de pagamento?', r: empresa.pagamento },
]

export const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/sobre', label: 'O estúdio' },
  { to: '/modalidades', label: 'Modalidades' },
  { to: '/planos-e-horarios', label: 'Planos e horários' },
  { to: '/contato', label: 'Contato' },
]
