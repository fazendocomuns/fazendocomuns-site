import { newsItemsForHome } from '@/features/noticias/data/noticiasContent'
import {
  asCriancasFalamEvent,
} from '@/features/eventos/data/asCriancasFalamContent'
import {
  recrearMundosOutrosEvent,
} from '@/features/eventos/data/recrearMundosOutrosContent'

export { footerContent } from '@/features/home/data/footerContent'
export { mainNavigation } from '@/features/home/data/navigation'

const supabaseStorage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public'

const homeImg = (file: string) =>
  `${supabaseStorage}/biblioteca-de-imagens/pagina-home/${file}`

const livrosImg = (file: string) =>
  `${supabaseStorage}/biblioteca-de-imagens/capas-de-livros/${file}`

const eventoImg = (folder: string, file: string) =>
  `${supabaseStorage}/biblioteca-de-imagens/capa-de-eventos/${folder}/${file}`

export const carouselSlides = [
  {
    id: '1',
    src: homeImg('banner001.jpg'),
    alt: 'Estudantes montando quebra-cabeça em sala de aula',
    caption: 'Construção coletiva de conhecimento nas escolas públicas',
  },
  {
    id: '2',
    src: homeImg('banner002.jpg'),
    alt: 'Atividade do projeto Fazendo Comuns em escola parceira',
    caption: 'Pesquisa sobre recreio e convivência escolar',
  },
]

export const mainTitle = {
  line1: 'Fazendo Comuns na escola:',
  line2: 'Vamos falar sobre o recreio!',
}

export interface BubbleItem {
  id: string
  title: string
  href: string
  image: string
  imageAlt: string
  variant?: 'photo' | 'graphic'
}

export const bubbleItems: BubbleItem[] = [
  {
    id: 'video-recreio',
    title: 'Vídeo: Vamos falar do recreio?',
    href: '/video-vamos-falar-do-recreio',
    image: homeImg('Video-Vamos-falar-do-recreio.jpg'),
    imageAlt: 'Estudantes no pátio escolar durante o recreio',
    variant: 'photo',
  },
  {
    id: 'historias',
    title: 'Histórias do recreio',
    href: '/historias-do-recreio',
    image: homeImg('historias-do-recreio-004.png'),
    imageAlt: 'Crianças correndo pelo corredor da escola',
    variant: 'photo',
  },
  {
    id: 'debate',
    title: 'Debate: Recreio em Cena',
    href: '/video-debate-o-recreio-em-cena-final',
    image: homeImg('Video-Debate-o-Recreio-em-Cena.png'),
    imageAlt: 'Arte do debate Recreio em Cena',
    variant: 'graphic',
  },
  {
    id: 'combinacao',
    title: 'O Projeto Combinação',
    href: '/o-projeto-falatorio',
    image: homeImg('O-Projeto-Combinacao.png'),
    imageAlt: 'Logo do Projeto Combinação',
    variant: 'graphic',
  },
  {
    id: 'jornalzino',
    title: 'Jornalzino da escola DB',
    href: '/jornalzinho-da-escola-db',
    image: livrosImg('capa-do-livro-jornal-db.jpeg'),
    imageAlt: 'Capa do Jornalzino da escola DB',
    variant: 'graphic',
  },
]

export const featuredEditorial = {
  title: 'As professoras discutem o recreio',
  excerpt:
    '“Você entende que é direito da criança ter professor, antes mesmo do recreio?” Deparamo-nos com esta pergunta em uma roda de conversa com professoras¹ do ensino público municipal carioca quando discutíamos como elas viam a questão da falta de recreio nas escolas. O impacto desse questionamento nos levou à reflexão, trazida pelo presente editorial, que discute as perspectivas das docentes acerca do recreio como pauta política das crianças. Entendemos que a participação delas no cotidiano escolar está intrinsecamente ligada às possibilidades de se efetivar o recreio das crianças nas instituições públicas de ensino. Neste sentido, a existência do recreio nas escolas, enquanto um espaço de liberdade e recreação infantil, está condicionado ao modo como as docentes compreendem a importância desse momento na experiência escolar da criança. O presente editorial deseja discutir, antes de tudo, a conjuntura de interesses e poderes que perpassa a oferta do recreio nas escolas e como esses se articulam ao exercício da docência no ensino público brasileiro. Ele se baseia no trabalho que desenvolvemos com as professoras ao longo do projeto de pesquisa Fazendo Comuns, tendo em vista que a oferta do recreio escolar depende de como as professoras compreendem sua importância na vida escolar da criança.',
  slug: 'editorial-03-2025',
}

/** Imagem decorativa da seção de editoriais na home. */
export const editoriaisHomeImage = homeImg('editoriais.png')

export interface HomeNewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  imageAlt: string
}

export interface HomeFeaturedEditorial {
  title: string
  excerpt: string
  slug: string
}

export interface HomeEventItem {
  id: string
  title: string
  date: string
  location: string
  href: string
  image: string
  imageAlt: string
}

export const newsItems: HomeNewsItem[] = newsItemsForHome

export const eventItems: HomeEventItem[] = [
  {
    id: 'criancas-falam',
    title: 'As Crianças Falam?',
    date: asCriancasFalamEvent.date,
    location: asCriancasFalamEvent.location,
    href: '/eventos/as-criancas-falam',
    image: eventoImg(
      'capa-evento-as-criancas-falam',
      'as-criancas-falam-flyer.jpg',
    ),
    imageAlt: asCriancasFalamEvent.imageAlt,
  },
  {
    id: 'recrear-mundos',
    title: 'Em Comuns…Recrear em mundos outros',
    date: recrearMundosOutrosEvent.date,
    location: recrearMundosOutrosEvent.location,
    href: '/eventos/recrear-mundos-outros',
    image: eventoImg(
      'capa-evento-em-comum-recrear-em-mundos-outros',
      'em-comum-recrear-em-mundos-outros-flyer.png',
    ),
    imageAlt: recrearMundosOutrosEvent.posters[0].alt,
  },
]

export const featureCards = [
  {
    id: 'criancas',
    title: 'As crianças falam',
    href: '/criancas-falam',
    color: 'red' as const,
    image: homeImg('as-criancas-falam.jpg'),
    imageAlt: 'As crianças falam sobre o recreio',
  },
  {
    id: 'professoras',
    title: 'As professoras e os professores falam',
    href: '/professores-falam',
    color: 'yellow' as const,
    image: homeImg('as-professoras-e-os-professores-falam.jpg'),
    imageAlt: 'As professoras e os professores falam',
    secondaryLink: {
      label: 'Manifesto das professoras',
      href: '/manifesto-das-professoras',
    },
  },
  {
    id: 'sociedade',
    title: 'A sociedade fala',
    href: '/a-sociedade-fala',
    color: 'orange' as const,
    image: homeImg('sociedadefala.jpeg'),
    imageAlt: 'A sociedade fala sobre o recreio e a brincadeira',
  },
]
