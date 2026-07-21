import banner01Img from '@/assets/imgs/bannerr01.jpg'
import banner02Img from '@/assets/imgs/banner02.jpg'
import videoRecreioImg from '@/assets/imgs/vídeoVamosFalar.jpeg'
import historiasRecreioImg from '@/assets/imgs/históriasDoRecreio.png'
import combinacaoImg from '@/assets/imgs/combinacao.png'
import { assetSrc } from '@/lib/assetSrc'

const wixBase = 'https://static.wixstatic.com/media'

function wixHeroImage(fileId: string, ext: 'jpg' | 'jpeg' | 'png', width = 2500) {
  const file = `${fileId}~mv2.${ext}`
  return `${wixBase}/${file}/v1/fit/w_${width},h_${width},al_c,q_90,usm_0.66_1.00_0.01/${file}`
}

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
    title: 'Ouça o podcast “Direito ao Recreio” — HUMANAMENTE/CNPq',
    excerpt:
      'Divulgação científica em humanidades sobre o direito das crianças ao recreio escolar.',
    date: '2025-06-16',
    listImage: assetSrc(videoRecreioImg),
    listImageAlt: 'Podcast Direito ao Recreio',
    heroImage: wixHeroImage('92a7cc_cee8db8384d946149a3cc7e8f638322a', 'jpg'),
    paragraphs: [
      'Ouça o podcast “Direito ao Recreio” realizado por HUMANAMENTE, Divulgação Científica em Humanidades/CNPq.',
      'A produção aborda o direito das crianças ao recreio escolar e dialoga com as pesquisas e intervenções do projeto Fazendo Comuns nas escolas públicas municipais do Rio de Janeiro.',
      'O episódio integra o esforço de divulgação científica em humanidades e amplia o debate público sobre o recreio como demanda coletiva das crianças na escola.',
    ],
    audio: {
      url: 'https://music.wixstatic.com/mp3/92a7cc_fdffb6f5f48c42cabd1e490f23c719da.mp3',
      duration: '10:41',
      label: 'Podcast “Direito ao Recreio” — HUMANAMENTE/CNPq',
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
    listImage: assetSrc(banner02Img),
    listImageAlt: 'Evento As Crianças Falam? na EMERJ',
    heroImage: wixHeroImage('92a7cc_2007c70687ce4d128235ab8e1a5d6297', 'jpg'),
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
    date: '2024-10-01',
    listImage: assetSrc(banner01Img),
    listImageAlt: 'Reunião com vereadora Thais Ferreira',
    heroImage: wixHeroImage('92a7cc_6c801e721f6b47f09ddb991436012b68', 'jpeg'),
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
    listImage: assetSrc(combinacaoImg),
    listImageAlt: 'Apresentação pública no CMDCA Rio',
    heroImage: wixHeroImage('92a7cc_ab14a7c529c34d6b9485f5d44732d392', 'png'),
    paragraphs: [
      'No dia 12 de Agosto, a equipe do Projeto Fazendo Comuns pôde realizar uma apresentação pública dos resultados das pesquisas que vem realizando nas escolas públicas do Rio de Janeiro para o Conselho Municipal dos Direitos da Criança e do Adolescente do Rio de Janeiro. Dando seguimento às nossas incursões em vista de estabelecermos parceiros para a discussão pública sobre a questão do recreio escolar, pudemos apresentar o histórico do projeto, nossos principais direcionamentos e questões que vêm emergindo no nosso trabalho. Pudemos prestar esclarecimentos sobre as dúvidas acerca da evidente falta de tempo e espaço de qualidade para o recreio escolar nas escolas públicas do município e de como as crianças puderam manifestar sua demanda convincente de que o recreio possa constar como uma de suas atividades na escola. Nossa apresentação também trouxe os diferentes materiais audiovisuais que as crianças construíram no âmbito do nosso projeto.',
    ],
  },
  {
    id: '5',
    slug: 'festa-agostina',
    title: 'Participação na Festa Agostina — escola parceira',
    excerpt:
      'Presença do projeto em evento promovido por escola parceira da rede municipal.',
    date: '2024-08-13',
    listImage: assetSrc(historiasRecreioImg),
    listImageAlt: 'Participação na Festa Agostina',
    heroImage: assetSrc(historiasRecreioImg),
    paragraphs: [
      'O projeto Fazendo Comuns participou da Festa Agostina, evento promovido por escola parceira da rede municipal de ensino do Rio de Janeiro.',
      'A presença no encontro permitiu dialogar com crianças, famílias e profissionais da escola sobre o recreio e as vivências coletivas no espaço escolar.',
      'Atividades como esta aproximam a pesquisa do cotidiano das comunidades escolares e fortalecem os vínculos do projeto com as escolas parceiras.',
    ],
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
