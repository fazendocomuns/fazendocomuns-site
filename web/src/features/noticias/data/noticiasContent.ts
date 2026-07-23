const supabaseStorage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public'

const cover = (file: string) =>
  `${supabaseStorage}/biblioteca-de-imagens/capas-de-noticias/${file}`

const podcastDireitoAoRecreioCover = `${supabaseStorage}/biblioteca-de-imagens/capas-podcast/Direito-Ao-Recreio.jpg`
const podcastDireitoAoRecreioAudio = `${supabaseStorage}/podcast/podcast/Direito-Ao-Recreio.mp3`

export interface NoticiaAudio {
  url: string
  duration: string
  label: string
}

export interface NoticiaLink {
  href: string
  label: string
}

export interface Noticia {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  listImage: string
  listImageAlt: string
  heroImage: string
  paragraphs: string[]
  audio?: NoticiaAudio
  relatedLink?: NoticiaLink
}

export const noticiasHubIntro = {
  title: 'Notícias',
  subtitle:
    'Registros de parcerias, eventos, apresentações públicas e produções do projeto Fazendo Comuns.',
}

export const noticias = [
  {
    id: '1',
    slug: 'podcast-direito-ao-recreio',
    title:
      'Ouça o podcast “Direito ao Recreio” realizado por HUMANAMENTE, Divulgação Científica em Humanidades/CNPQ',
    excerpt:
      'Divulgação científica em humanidades sobre o direito das crianças ao recreio escolar.',
    date: '2025-06-16',
    listImage: podcastDireitoAoRecreioCover,
    listImageAlt: 'Capa do podcast Direito ao Recreio — HUMANAMENTE/CNPQ',
    heroImage: podcastDireitoAoRecreioCover,
    paragraphs: [
      'Ouça o podcast “Direito ao Recreio” realizado por HUMANAMENTE, Divulgação Científica em Humanidades/CNPQ.',
      'A produção aborda o direito das crianças ao recreio escolar e dialoga com as pesquisas e intervenções do projeto Fazendo Comuns nas escolas públicas municipais do Rio de Janeiro.',
      'O episódio integra o esforço de divulgação científica em humanidades e amplia o debate público sobre o recreio como demanda coletiva das crianças na escola.',
    ],
    audio: {
      url: podcastDireitoAoRecreioAudio,
      duration: '10:41',
      label: 'Podcast “Direito ao Recreio” — HUMANAMENTE/CNPQ',
    },
    relatedLink: {
      href: '/multimidia/podcast',
      label: 'Ver página do podcast',
    },
  },
  {
    id: '2',
    slug: 'evento-emerj-recreio',
    title:
      'O Projeto Fazendo Comuns em parceria com a Escola de Magistratura do Estado do Rio de Janeiro realiza evento sobre as mobilizações públicas acerca do recreio',
    excerpt:
      'No dia 05 de novembro, a EMERJ sediará o evento ‘As Crianças Falam?’, realizado pelo Projeto Fazendo Comuns.',
    date: '2024-10-03',
    listImage: cover(
      'Evento-debate-mobilizacoes-pelo-recreio-em-parceria-entre-Projeto-Fazendo-Comuns-e-EMERJ.jpg',
    ),
    listImageAlt: 'Evento As Crianças Falam? na EMERJ',
    heroImage: cover(
      'Evento-debate-mobilizacoes-pelo-recreio-em-parceria-entre-Projeto-Fazendo-Comuns-e-EMERJ.jpg',
    ),
    paragraphs: [
      'Qual é o lugar das crianças na construção do projeto de educação pública? Como se dá a resposta dos adultos à fala e à ação coletiva das crianças nas suas reivindicações sobre a educação que recebem? No dia 05 de novembro, a Escola de Magistratura do Estado do Rio de Janeiro (EMERJ) sediará o evento ‘As Crianças Falam?’, realizado pelo Projeto Fazendo Comuns. A proposta é debater, de forma interdisciplinar e co-geracional, a demanda política das crianças acerca do recreio com diferentes atores da sociedade civil, como profissionais da educação, pesquisadores e representantes das entidades organizadas que cuidam e se interessam pela população infantil, suas demandas e sua saúde física e mental.',
      'Dia do Evento: 5 de novembro de 2024',
      'Horário: 9:30 às 13:00',
      'Local: Escola de Magistratura do Estado do Rio de Janeiro',
      'Rua Dom Manuel 25 – Centro – Rio de Janeiro',
    ],
  },
  {
    id: '3',
    slug: 'reuniao-thais-ferreira',
    title:
      '“Fazendo Comuns” participa de reunião com a vereadora Thais Ferreira, presidente da Comissão de Direitos da Criança e do Adolescente da Câmara Municipal do Rio de Janeiro.',
    excerpt:
      'Equipe do projeto apresentou a pesquisa à vereadora Thais Ferreira (Psol/RJ) em seu gabinete na Câmara Municipal do Rio de Janeiro.',
    date: '2024-09-18',
    listImage: cover(
      'Fazendo-Comuns-participa-de-reuniao-com-a-vereadora-Thais-Ferreira-presidente-da-Comissao-de-Direitos-da-Crianca-e-do-Ad.jpg',
    ),
    listImageAlt: 'Reunião com vereadora Thais Ferreira',
    heroImage: cover(
      'Fazendo-Comuns-participa-de-reuniao-com-a-vereadora-Thais-Ferreira-presidente-da-Comissao-de-Direitos-da-Crianca-e-do-Ad.jpg',
    ),
    paragraphs: [
      'No dia 17 de setembro de 2024, a Equipe do Projeto Fazendo Comuns pôde apresentar este projeto de pesquisa e intervenção social à vereadora Thais Ferreira (Psol/RJ) em seu gabinete na Câmara Municipal do Rio de Janeiro. No momento, a vereadora Thais Ferreira é presidente da Comissão de Direitos da Criança e do Adolescente da mesma Câmara e está se candidatando à reeleição. A vereadora se disse comprometida com as pautas políticas das crianças, reforçou a necessidade da construção e cobrança coletiva para que as demandas públicas conquistem o comprometimento dos legisladores e se disse disposta a construir essa parceria para mobilizar interlocuções públicas acerca da importante pauta do recreio escolar. Além disso, a vereadora Thais Ferreira se colocou à disposição para construir junto a Equipe do Projeto Fazendo Comuns, junto às crianças e aos diversos setores da sociedade civil, ferramentas que possibilitem que essa demanda seja pautada e debatida a fim de gerar mobilizações coletivas, inclusive, dos parlamentares, cobrando para que também se posicionem diante das demandas políticas das crianças.',
    ],
  },
  {
    id: '4',
    slug: 'apresentacao-cmdca-rio',
    title: '‘Fazendo Comuns’ realiza apresentação pública no CMDCA Rio',
    excerpt:
      'Apresentação dos resultados das pesquisas nas escolas públicas ao Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro.',
    date: '2024-08-13',
    listImage: cover('Fazendo-Comuns-realiza-apresentacao-publica-no-CMDCA-Rio.png'),
    listImageAlt: 'Apresentação pública no CMDCA Rio',
    heroImage: cover('Fazendo-Comuns-realiza-apresentacao-publica-no-CMDCA-Rio.png'),
    paragraphs: [
      'No dia 12 de Agosto, a equipe do Projeto Fazendo Comuns pôde realizar uma apresentação pública dos resultados das pesquisas que vem realizando nas escolas públicas do Rio de Janeiro para o Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro. Dando seguimento às nossas incursões em vista de estabelecermos parceiros para a discussão pública sobre a questão do recreio escolar, pudemos apresentar o histórico do projeto, nossos principais direcionamentos e questões que vêm emergindo no nosso trabalho. Pudemos prestar esclarecimentos sobre as dúvidas acerca da evidente falta de tempo e espaço de qualidade para o recreio escolar nas escolas públicas do município e de como as crianças puderam manifestar sua demanda convincente de que o recreio possa constar como uma de suas atividades na escola. Nossa apresentação também trouxe os diferentes materiais audiovisuais que as crianças construíram no âmbito do nosso projeto.',
    ],
  },
  {
    id: '5',
    slug: 'festa-agostina',
    title: 'Projeto Fazendo Comuns participa de Festa Agostina promovida por escola parceira',
    excerpt:
      'Participação na comemoração agostina de escola parceira na Zona Norte do Rio de Janeiro.',
    date: '2024-08-09',
    listImage: cover('Projeto-Fazendo-Comuns-participa-de-Festa-Agostina.png'),
    listImageAlt: 'Participação na Festa Agostina',
    heroImage: cover('Projeto-Fazendo-Comuns-participa-de-Festa-Agostina.png'),
    paragraphs: [
      'No dia 09 de agosto, o Projeto Fazendo Comuns foi convidado a participar da comemoração agostina em uma de nossas escolas parceiras, localizada na Zona Norte da Cidade do Rio de Janeiro. A participação possibilitou um maior contato com a comunidade escolar, além de promover uma interlocução com pais e responsáveis dos estudantes acerca da demanda do recreio feita pelas crianças desta escola e por muitas outras escolas públicas do município do Rio de Janeiro. Foi possível conversar com os pais e a comunidade escolar sobre os futuros encaminhamentos deste projeto de pesquisa.',
    ],
  },
  {
    id: '6',
    slug: 'reuniao-mesa-diretora-cmdca-rio',
    title: '‘Fazendo Comuns’ participa de reunião com Mesa Diretora do CMDCA Rio',
    excerpt:
      'Apresentação do projeto à mesa diretora do Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro.',
    date: '2024-08-05',
    listImage: cover('Fazendo-Comuns-participa-de-reuniao-com-Mesa-Diretora-do-CMDCA-Rio.png'),
    listImageAlt: 'Reunião com Mesa Diretora do CMDCA Rio',
    heroImage: cover('Fazendo-Comuns-participa-de-reuniao-com-Mesa-Diretora-do-CMDCA-Rio.png'),
    paragraphs: [
      'No dia 05 de Agosto de 2024, a Equipe do Projeto Fazendo Comuns pôde apresentar nosso projeto de pesquisa à mesa diretora do Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro. O encontro fez parte de nossa agenda de interlocuções públicas com a sociedade civil acerca da demanda dos estudantes sobre o recreio escolar. Neste encontro, foi possível dialogar com diferentes atores da sociedade - como pedagogos, assistentes sociais e guardas municipais presentes nessa reunião - sobre as questões que a falta do recreio acarreta para as criança e discutir como poderíamos tornar o CMDCA um parceiro para as próximas etapas do projeto.',
    ],
  },
  {
    id: '7',
    slug: 'entrevista-renato-cinco',
    title:
      'Ex-vereador Renato Cinco (PSOL) é entrevistado pela equipe do Projeto Fazendo Comuns',
    excerpt:
      'Entrevista com o autor do Projeto de Lei 1519/2019 sobre a obrigatoriedade do recreio escolar.',
    date: '2024-05-25',
    listImage: cover('Imagem-Noticia-Renato-Cinco.jpg'),
    listImageAlt: 'Entrevista com Renato Cinco',
    heroImage: cover('Imagem-Noticia-Renato-Cinco.jpg'),
    paragraphs: [
      'No dia 24 de maio último, a equipe do projeto Fazendo Comuns entrevistou o sociólogo, ativista político e ex-vereador Renato “Cinco” Athayde Silva, autor do Projeto de Lei 1519/2019, que previa o estabelecimento da obrigatoriedade do recreio escolar de pelo menos vinte minutos para os estudantes das escolas municipais do Rio de Janeiro. Renato Cinco conta que a criação do Projeto de Lei se deu a partir da constatação de que em algumas escolas no interior e nas periferias, tanto da rede estadual quanto municipal, não ofereciam tempo de recreio. Ao longo da conversa, Cinco esclareceu que o projeto não pôde seguir pois em 2020 a agenda da Câmara Municipal se organizou apenas em torno do enfrentamento à Covid-19 e, como o sociólogo não foi reeleito, o projeto segue arquivado. Ao fim do encontro, o ex-vereador nos apontou possibilidades de parcerias na sociedade civil organizada para prosseguirmos nossas interlocuções públicas acerca da importante pauta do recreio escolar.',
    ],
  },
  {
    id: '8',
    slug: 'encontro-ubes',
    title:
      'Projeto “Fazendo Comuns” realiza encontro com a representante da União Brasileirados Estudantes Secundaristas (UBES)',
    excerpt:
      'Diálogo com Isabella Gandolfi (UBES/AERJ) sobre a demanda dos estudantes pelo recreio escolar.',
    date: '2024-05-02',
    listImage: cover(
      'image-Projeto-Fazendo-Comuns-realiza-encontro-com-a-representante-da-Uniao-Brasileirados-Estudantes-Secundaristas-UBES.png',
    ),
    listImageAlt: 'Encontro com representante da UBES',
    heroImage: cover(
      'image-Projeto-Fazendo-Comuns-realiza-encontro-com-a-representante-da-Uniao-Brasileirados-Estudantes-Secundaristas-UBES.png',
    ),
    paragraphs: [
      'No dia 02 de Maio, a equipe do Projeto Fazendo Comuns recebeu a visita de Isabella Gandolfi, diretora executiva e vice-presidente nacional da União Brasileira dos Estudantes Secundaristas (UBES) e da Associação dos Estudantes Secundaristas do Rio de Janeiro (AERJ). O encontro visa à construção de um diálogo e parcerias entre o grupo de pesquisa e as entidades que atuam na representação política dos estudantes dos ensinos fundamental, médio e técnico. Isabella apresentou o modo de funcionamento das organizações, sua abrangência e atuais desafios em vista das questões que atravessam o cotidiano das escolas públicas, frente ao significativo processo de sucateamento do ensino público. O diálogo e a parceria têm em vista a demanda dos estudantes do Ensino Fundamental referente ao tempo e ao espaço do recreio escolar. Isabela confirmou que tal demanda tem sido frequentemente colocada pelos estudantes das escolas onde tem atuado. Ao fim do encontro pudemos pensar na construção de ações que visem a publicização desta demanda dos estudantes das escolas públicas do Rio de Janeiro.',
    ],
  },
  {
    id: '9',
    slug: 'evento-10-anos-desidades',
    title:
      'Evento comemorativo de 10 anos da Revista DESIDADES promove troca de experiências e reflexões sobre o atual contexto de ‘esperanças e destroços’ da infância eda adolescência',
    excerpt:
      'Encontro do NIAJ e da UFRJ celebra uma década da Revista DESIDADES com diálogo multidisciplinar.',
    date: '2024-04-12',
    listImage: cover('Evento-comemorativo-de-10-anos-da-Revista-DESIDADES.jpg'),
    listImageAlt: 'Evento comemorativo dos 10 anos da Revista DESIDADES',
    heroImage: cover('Evento-comemorativo-de-10-anos-da-Revista-DESIDADES.jpg'),
    paragraphs: [
      'No último dia 11, para celebrar uma década da Revista Científica da Infância, Adolescência e Juventude - DESIDADES - o NIAJ e a UFRJ promoveram um encontro entre profissionais de diversas instituições nacionais para discutir as dinâmicas sociais, políticas e geracionais que têm impactado as experiências de ser criança ou jovem no mundo atual. A discussão proporcionou um diálogo multidisciplinar entre pesquisadores da Antropologia, Sociologia, Pedagogia, Psiquiatria e Psicologia, assim como intelectuais de saberes populares. Ao final, tivemos uma intervenção político-artística do líder indígena e pesquisador na Universidade Indígena Pluriétnica Aldeia Maracanã, Cacique Urutau Guajajara, que narrou as experiências comunitárias formativas dos Guajajaras como resistência às imposições coloniais de ser criança, pois, segundo ele, “um aldeamento já é uma sala de aula”.',
    ],
  },
  {
    id: '10',
    slug: 'jornada-10-anos-desidades',
    title:
      'DESIDADES e NIAJ promovem Jornada Comemorativa dos 10 anos da RevistaDESIDADES',
    excerpt:
      'Evento gratuito no campus Praia Vermelha da UFRJ: “Crianças e Jovens em um Mundo de Esperanças e Destroços”.',
    date: '2024-04-01',
    listImage: cover('desidades-1.jpg'),
    listImageAlt: 'Jornada Comemorativa dos 10 anos da Revista DESIDADES',
    heroImage: cover('desidades-1.jpg'),
    paragraphs: [
      'No próximo dia 11 de Abril acontecerá no campus Praia Vermelha da Universidade Federal do Rio de Janeiro (UFRJ) o evento “Crianças e Jovens em um Mundo de Esperanças e Destroços”, em comemoração aos 10 anos da Revista Científica da Infância, Adolescência e Juventude - DESIDADES. A Jornada pretende trazer à discussão, a partir da fala de estudiosos do campo da infância e juventude, análises sobre as dinâmicas sociais, políticas e geracionais que têm impactado as experiências de ser criança ou jovem no mundo atual. O evento é aberto ao público e gratuito.',
    ],
  },
  {
    id: '11',
    slug: 'evento-recreio-em-cena',
    title:
      'Evento “O Recreio em Cena” promove conversa sobre a importância do recreio para crianças e professores com comunidade escolar',
    excerpt:
      'Conversa na Escola Municipal Castelnuovo a partir do vídeo “E aí, vamos falar sobre o recreio?”.',
    date: '2023-12-08',
    listImage: cover(
      'image-Evento-O-Recreio-em-Cena-promove-conversa-sobre-a-importancia-do-ecreio-para-criancas-e-professores-com-comunidade.jpg',
    ),
    listImageAlt: 'Evento O Recreio em Cena',
    heroImage: cover(
      'image-Evento-O-Recreio-em-Cena-promove-conversa-sobre-a-importancia-do-ecreio-para-criancas-e-professores-com-comunidade.jpg',
    ),
    paragraphs: [
      'No dia 07 de dezembro de 2023, a equipe do projeto Fazendo Comuns, em colaboração com a coordenação da Escola Municipal Castelnuovo realizou o evento “O Recreio em Cena”, possibilitando que estudantes, funcionários, professores e responsáveis conversassem sobre o recreio a partir do vídeo “E aí, vamos falar sobre o recreio?”. O vídeo, produzido sob a supervisão da equipe de pesquisadores do projeto, roteirizado e protagonizado por estudantes do 7º ano da escola localizada na Zona Sul do Rio de Janeiro, apresenta um grupo de alunos da rede municipal de educação insatisfeitos com a falta de tempo e espaço de qualidade para o recreio.',
    ],
    relatedLink: {
      href: '/multimidia',
      label: 'Ver multimídia do projeto',
    },
  },
] satisfies Noticia[]

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  return noticias.find((noticia) => noticia.slug === slug)
}

export const newsItemsForHome = noticias.map(
  ({ id, title, excerpt, date, slug, heroImage, listImageAlt }) => ({
    id,
    title,
    excerpt,
    date,
    slug,
    image: heroImage,
    imageAlt: listImageAlt,
  }),
)
