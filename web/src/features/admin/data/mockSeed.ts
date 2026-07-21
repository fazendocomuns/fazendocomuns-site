import luciaRabelloImg from '@/assets/imgs/equipe/lucia-rabello.jpg'
import { assetSrc } from '@/lib/assetSrc'
import adelaideRezendeImg from '@/assets/imgs/equipe/adelaide-rezende.jpg'
import anaLeticiaLimaImg from '@/assets/imgs/equipe/ana-leticia-lima.jpg'
import andreaSzulcImg from '@/assets/imgs/consultores/andrea-szulc.jpg'
import lucianaGageiroImg from '@/assets/imgs/consultores/luciana-gageiro.jpg'
import anaPaulaPedroImg from '@/assets/imgs/colaboradores/ana-paula-pedro.jpg'
import banner01Img from '@/assets/imgs/bannerr01.jpg'
import banner02Img from '@/assets/imgs/banner02.jpg'
import videoRecreioImg from '@/assets/imgs/vídeoVamosFalar.jpeg'
import combinacaoImg from '@/assets/imgs/combinacao.png'
import type {
  ActivityItem,
  Assistente,
  Colaborador,
  Consultor,
  Editorial,
  Evento,
  MediaItem,
  Noticia,
  Pesquisador,
} from '@/features/admin/types'

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 86400000).toISOString()

export const mockPesquisadores: Pesquisador[] = [
  {
    id: 'pes-1',
    name: 'Lucia Rabello de Castro',
    photo: assetSrc(luciaRabelloImg),
    role: 'Coordenadora-Geral',
    miniBio: 'Professora Titular do Instituto de Psicologia da UFRJ.',
    fullBio:
      'Professora Titular do Instituto de Psicologia da Universidade Federal do Rio de Janeiro. Pesquisadora Senior do CNPQ e coordenadora científica do NIPIAC/UFRJ.',
    email: 'lucia.rabello@ufrj.br',
    linkedin: 'https://linkedin.com/in/lucia-rabello',
    lattes: 'http://lattes.cnpq.br/123456789',
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(120),
    updatedAt: daysAgo(2),
  },
]

export const mockAssistentes: Assistente[] = [
  {
    id: 'ass-1',
    name: 'Adelaide Rezende de Souza',
    photo: assetSrc(adelaideRezendeImg),
    role: 'Pesquisadora Assistente',
    miniBio: 'Pós-doutoranda em Psicologia na UFRJ.',
    fullBio:
      'Pós-doutoranda em Psicologia no Instituto de Psicologia da UFRJ. Pesquisadora da ONG Redes da Maré.',
    email: 'adelaide.rezende@ufrj.br',
    linkedin: 'https://linkedin.com/in/adelaide-rezende',
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(5),
  },
  {
    id: 'ass-2',
    name: 'Ana Letícia Lima Silva',
    photo: assetSrc(anaLeticiaLimaImg),
    role: 'Pesquisadora Assistente',
    miniBio: 'Graduanda de Psicologia na UFRJ.',
    fullBio:
      'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ).',
    email: 'ana.leticia@ufrj.br',
    linkedin: '',
    displayOrder: 2,
    status: 'active',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(10),
  },
]

export const mockConsultores: Consultor[] = [
  {
    id: 'con-1',
    name: 'Andrea Szulc',
    photo: assetSrc(andreaSzulcImg),
    role: 'Consultora Científica',
    institution: 'Universidad de Buenos Aires / CONICET',
    bio: 'Doutora em Antropologia pela Universidade de Buenos Aires. Pesquisadora do CONICET/Argentina.',
    email: 'andrea.szulc@uba.ar',
    linkedin: '',
    lattes: '',
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(100),
    updatedAt: daysAgo(15),
  },
  {
    id: 'con-2',
    name: 'Luciana Gageiro',
    photo: assetSrc(lucianaGageiroImg),
    role: 'Consultora Científica',
    institution: 'Universidade Federal do Rio de Janeiro',
    bio: 'Professora do Instituto de Psicologia da UFRJ. Pesquisadora na área de infância e juventude.',
    email: 'luciana.gageiro@ufrj.br',
    linkedin: '',
    lattes: 'http://lattes.cnpq.br/2308234336807405',
    displayOrder: 2,
    status: 'inactive',
    createdAt: daysAgo(80),
    updatedAt: daysAgo(20),
  },
]

export const mockColaboradores: Colaborador[] = [
  {
    id: 'col-1',
    name: 'Ana Paula Pedro',
    photo: assetSrc(anaPaulaPedroImg),
    institution: 'Instituto Superior de Educação Pró-Saber',
    role: 'Coordenadora de Arte',
    description:
      'Psicóloga Clínica e Diretora de projetos. Coordenadora de Arte do Projeto Fazendo Comuns.',
    website: 'https://pro-saber.org',
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(70),
    updatedAt: daysAgo(3),
  },
]

export const mockNoticias: Noticia[] = [
  {
    id: 'not-1',
    title: 'Ouça o podcast "Direito ao Recreio" — HUMANAMENTE/CNPq',
    summary:
      'Divulgação científica em humanidades sobre o direito das crianças ao recreio escolar.',
    content:
      '<p>Ouça o podcast "Direito ao Recreio" realizado por HUMANAMENTE, Divulgação Científica em Humanidades/CNPq.</p><p>A produção aborda o direito das crianças ao recreio escolar e dialoga com as pesquisas do projeto Fazendo Comuns.</p>',
    coverImage: assetSrc(videoRecreioImg),
    author: 'Equipe Fazendo Comuns',
    date: '2025-06-16',
    category: 'Podcast',
    tags: ['recreio', 'podcast', 'divulgação'],
    featured: true,
    heroImage: '',
    heroImageAlt: '',
    audioUrl: 'https://music.wixstatic.com/mp3/92a7cc_fdffb6f5f48c42cabd1e490f23c719da.mp3',
    audioDuration: '10:41',
    audioLabel: 'Podcast “Direito ao Recreio” — HUMANAMENTE/CNPq',
    relatedLinkHref: '/multimidia/podcast',
    relatedLinkLabel: 'Ver página do podcast',
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 'not-2',
    title:
      'O Projeto Fazendo Comuns em parceria com a Escola de Magistratura do Estado do Rio de Janeiro realiza evento sobre as mobilizações públicas acerca do recreio',
    summary:
      'No dia 05 de novembro, a EMERJ sediará o evento ‘As Crianças Falam?’, realizado pelo Projeto Fazendo Comuns.',
    content:
      '<p>Qual é o lugar das crianças na construção do projeto de educação pública? Como se dá a resposta dos adultos à fala e à ação coletiva das crianças nas suas reivindicações sobre a educação que recebem? No dia 05 de novembro, a Escola de Magistratura do Estado do Rio de Janeiro (EMERJ) sediará o evento ‘As Crianças Falam?’, realizado pelo Projeto Fazendo Comuns. A proposta é debater, de forma interdisciplinar e co-geracional, a demanda política das crianças acerca do recreio com diferentes atores da sociedade civil, como profissionais da educação, pesquisadores e representantes das entidades organizadas que cuidam e se interessam pela população infantil, suas demandas e sua saúde física e mental.</p><p>Dia do Evento: 5 de novembro de 2024</p><p>Horário: 9:30 às 13:00</p><p>Local: Escola de Magistratura do Estado do Rio de Janeiro</p><p>Rua Dom Manuel 25 – Centro – Rio de Janeiro</p>',
    coverImage: assetSrc(banner02Img),
    author: 'Equipe Fazendo Comuns',
    date: '2024-10-03',
    category: 'Evento',
    tags: ['recreio', 'EMERJ', 'mobilização'],
    featured: false,
    heroImage: '',
    heroImageAlt: '',
    audioUrl: '',
    audioDuration: '',
    audioLabel: '',
    relatedLinkHref: '',
    relatedLinkLabel: '',
    displayOrder: 2,
    status: 'active',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(30),
  },
  {
    id: 'not-3',
    title:
      '“Fazendo Comuns” participa de reunião com a vereadora Thais Ferreira, presidente da Comissão de Direitos da Criança e do Adolescente da Câmara Municipal do Rio de Janeiro.',
    summary:
      'Equipe do projeto apresentou a pesquisa à vereadora Thais Ferreira (Psol/RJ) em seu gabinete na Câmara Municipal do Rio de Janeiro.',
    content:
      '<p>No dia 17 de setembro de 2024, a Equipe do Projeto Fazendo Comuns pôde apresentar este projeto de pesquisa e intervenção social à vereadora Thais Ferreira (Psol/RJ) em seu gabinete na Câmara Municipal do Rio de Janeiro. No momento, a vereadora Thais Ferreira é presidente da Comissão de Direitos da Criança e do Adolescente da mesma Câmara e está se candidatando à reeleição. A vereadora se disse comprometida com as pautas políticas das crianças, reforçou a necessidade da construção e cobrança coletiva para que as demandas públicas conquistem o comprometimento dos legisladores e se disse disposta a construir essa parceria para mobilizar interlocuções públicas acerca da importante pauta do recreio escolar. Além disso, a vereadora Thais Ferreira se colocou à disposição para construir junto a Equipe do Projeto Fazendo Comuns, junto às crianças e aos diversos setores da sociedade civil, ferramentas que possibilitem que essa demanda seja pautada e debatida a fim de gerar mobilizações coletivas, inclusive, dos parlamentares, cobrando para que também se posicionem diante das demandas políticas das crianças.</p>',
    coverImage: assetSrc(banner01Img),
    author: 'Equipe Fazendo Comuns',
    date: '2024-10-01',
    category: 'Institucional',
    tags: ['CMDCA', 'Thais Ferreira', 'política'],
    featured: false,
    heroImage: '',
    heroImageAlt: '',
    audioUrl: '',
    audioDuration: '',
    audioLabel: '',
    relatedLinkHref: '',
    relatedLinkLabel: '',
    displayOrder: 3,
    status: 'active',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(60),
  },
  {
    id: 'not-4',
    title: '‘Fazendo Comuns’ realiza apresentação pública no CMDCA Rio',
    summary:
      'Apresentação dos resultados das pesquisas nas escolas públicas ao Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro.',
    content:
      '<p>No dia 12 de Agosto, a equipe do Projeto Fazendo Comuns pôde realizar uma apresentação pública dos resultados das pesquisas que vem realizando nas escolas públicas do Rio de Janeiro para o Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro. Dando seguimento às nossas incursões em vista de estabelecermos parceiros para a discussão pública sobre a questão do recreio escolar, pudemos apresentar o histórico do projeto, nossos principais direcionamentos e questões que vêm emergindo no nosso trabalho. Pudemos prestar esclarecimentos sobre as dúvidas acerca da evidente falta de tempo e espaço de qualidade para o recreio escolar nas escolas públicas do município e de como as crianças puderam manifestar sua demanda convincente de que o recreio possa constar como uma de suas atividades na escola. Nossa apresentação também trouxe os diferentes materiais audiovisuais que as crianças construíram no âmbito do nosso projeto.</p>',
    coverImage: assetSrc(combinacaoImg),
    author: 'Equipe Fazendo Comuns',
    date: '2024-08-13',
    category: 'Institucional',
    tags: ['CMDCA', 'apresentação'],
    featured: false,
    heroImage: '',
    heroImageAlt: '',
    audioUrl: '',
    audioDuration: '',
    audioLabel: '',
    relatedLinkHref: '',
    relatedLinkLabel: '',
    displayOrder: 4,
    status: 'active',
    createdAt: daysAgo(90),
    updatedAt: daysAgo(90),
  },
]

export const mockEditoriais: Editorial[] = [
  {
    id: 'edi-1',
    title: 'Editorial 03/2025',
    subtitle: 'As professoras discutem o recreio',
    summary:
      'Editorial sobre as perspectivas das docentes acerca do recreio como pauta política das crianças.',
    content:
      '<p>"Você entende que é direito da criança ter professor, antes mesmo do recreio?" Deparamo-nos com esta pergunta em uma roda de conversa com professoras do ensino público municipal carioca quando discutíamos como elas viam a questão da falta de recreio nas escolas. O impacto desse questionamento nos levou à reflexão, trazida pelo presente editorial, que discute as perspectivas das docentes acerca do recreio como pauta política das crianças.</p>',
    image: assetSrc(banner01Img),
    author: 'Lara de Oliveira Moreira',
    date: '2024-12-17',
    tags: ['professoras', 'recreio', 'política'],
    closingText: 'Rio de Janeiro, 17 de dezembro de 2024.',
    signatures: [
      {
        name: 'Lara de Oliveira Moreira',
        lines: ['Graduanda de Psicologia no Instituto de Psicologia da UFRJ'],
      },
      {
        name: 'Sophia Aguiar Gimenez Corrêa',
        lines: ['Graduanda de Psicologia no Instituto de Psicologia da UFRJ'],
      },
      {
        name: 'Lucia Rabello de Castro',
        lines: [
          'Professora Titular da UFRJ',
          'Coordenadora Geral do Projeto “Fazendo Comuns”',
        ],
      },
    ],
    references: [],
    referencesTitle: '',
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(45),
  },
  {
    id: 'edi-2',
    title: 'Editorial 02/2024',
    subtitle: 'As crianças são sujeitos políticos?',
    summary:
      'Reflexão sobre crianças como sujeitos políticos e a convivência coletiva.',
    content:
      '<p>Fazer esta pergunta é preciso. Talvez porque a política resume essencialmente os desafios invariantes da convivência coletiva.</p>',
    image: assetSrc(banner02Img),
    author: 'Lucia Rabello de Castro',
    date: '2024-05-22',
    tags: ['política', 'infância', 'direitos'],
    closingText: 'Rio de Janeiro, 22 de maio de 2024.',
    signatures: [
      {
        name: 'Lucia Rabello de Castro',
        lines: [
          'Professora Titular da UFRJ',
          'Coordenadora Geral do Projeto “Fazendo Comuns”',
        ],
      },
    ],
    references: [],
    referencesTitle: 'Referências',
    displayOrder: 2,
    status: 'active',
    createdAt: daysAgo(120),
    updatedAt: daysAgo(90),
  },
]

export const mockEventos: Evento[] = [
  {
    id: 'evt-1',
    name: 'As Crianças Falam',
    shortDescription: 'Evento de escuta e expressão das crianças sobre o recreio.',
    fullDescription:
      '<p>Encontro público com crianças de escolas municipais do Rio de Janeiro para discutir o recreio como direito e pauta política.</p>',
    image: assetSrc(banner01Img),
    date: '2024-11-20',
    time: '14:00',
    location: 'Instituto de Psicologia — UFRJ',
    link: '/eventos/as-criancas-falam',
    featured: true,
    displayOrder: 1,
    status: 'active',
    createdAt: daysAgo(50),
    updatedAt: daysAgo(10),
  },
  {
    id: 'evt-2',
    name: 'Em Comuns… Recrear em mundos outros',
    shortDescription: 'Mesa de debate sobre recreação e comuns na escola pública.',
    fullDescription:
      '<p>Evento acadêmico com pesquisadores, professoras e crianças debatendo práticas de recreação coletiva.</p>',
    image: assetSrc(banner02Img),
    date: '2024-09-15',
    time: '10:00',
    location: 'Auditório IP-UFRJ',
    link: '/eventos/recrear-mundos-outros',
    featured: false,
    displayOrder: 2,
    status: 'active',
    createdAt: daysAgo(80),
    updatedAt: daysAgo(40),
  },
]

export const mockMediaLibrary: MediaItem[] = [
  {
    id: 'med-1',
    name: 'banner-principal.jpg',
    url: assetSrc(banner01Img),
    type: 'image',
    size: '245 KB',
    uploadedAt: daysAgo(5),
    alt: 'Banner principal do site',
  },
  {
    id: 'med-2',
    name: 'evento-recreio.jpg',
    url: assetSrc(banner02Img),
    type: 'image',
    size: '312 KB',
    uploadedAt: daysAgo(12),
    alt: 'Evento sobre recreio',
  },
  {
    id: 'med-3',
    name: 'podcast-recreio.jpg',
    url: assetSrc(videoRecreioImg),
    type: 'image',
    size: '189 KB',
    uploadedAt: daysAgo(1),
    alt: 'Capa do podcast Direito ao Recreio',
  },
  {
    id: 'med-4',
    name: 'lucia-rabello.jpg',
    url: assetSrc(luciaRabelloImg),
    type: 'image',
    size: '156 KB',
    uploadedAt: daysAgo(30),
    alt: 'Foto de Lucia Rabello de Castro',
  },
  {
    id: 'med-5',
    name: 'equipe-evento.jpg',
    url: assetSrc(adelaideRezendeImg),
    type: 'image',
    size: '198 KB',
    uploadedAt: daysAgo(20),
    alt: 'Equipe em evento',
  },
  {
    id: 'med-6',
    name: 'consultora-andrea.jpg',
    url: assetSrc(andreaSzulcImg),
    type: 'image',
    size: '167 KB',
    uploadedAt: daysAgo(45),
    alt: 'Andrea Szulc',
  },
]

export const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    action: 'Criou',
    entity: 'Notícia',
    entityName: 'Podcast "Direito ao Recreio"',
    timestamp: daysAgo(1),
  },
  {
    id: 'act-2',
    action: 'Editou',
    entity: 'Pesquisador(a)',
    entityName: 'Lucia Rabello de Castro',
    timestamp: daysAgo(2),
  },
  {
    id: 'act-3',
    action: 'Desativou',
    entity: 'Consultor',
    entityName: 'Luciana Gageiro',
    timestamp: daysAgo(5),
  },
  {
    id: 'act-4',
    action: 'Reordenou',
    entity: 'Assistentes',
    entityName: 'Lista de assistentes',
    timestamp: daysAgo(7),
  },
  {
    id: 'act-5',
    action: 'Criou',
    entity: 'Evento',
    entityName: 'As Crianças Falam',
    timestamp: daysAgo(10),
  },
]

export const newsCategories = [
  'Institucional',
  'Evento',
  'Podcast',
  'Publicação',
  'Parceria',
] as const
