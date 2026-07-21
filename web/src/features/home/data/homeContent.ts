import { newsItemsForHome } from '@/features/noticias/data/noticiasContent'

export { footerContent } from '@/features/home/data/footerContent'
export { mainNavigation } from '@/features/home/data/navigation'

import banner01Img from '@/assets/imgs/bannerr01.jpg'
import banner02Img from '@/assets/imgs/banner02.jpg'
import videoRecreioImg from '@/assets/imgs/vídeoVamosFalar.jpeg'
import historiasRecreioImg from '@/assets/imgs/históriasDoRecreio.png'
import debateImg from '@/assets/imgs/debate.png'
import combinacaoImg from '@/assets/imgs/combinacao.png'
import jornalzinhoImg from '@/assets/imgs/img-jornalziho-db.png'
import asCriancasFalamImg from '@/assets/imgs/asCriancasFalam.jpg'
import asProfessorasFalamImg from '@/assets/imgs/asProfessorasEProfessoresFalam.jpg'
import {
  asCriancasFalamEvent,
  asCriancasFalamHeroImage,
} from '@/features/eventos/data/asCriancasFalamContent'
import {
  recrearMundosOutrosEvent,
  recrearMundosOutrosPoster1,
} from '@/features/eventos/data/recrearMundosOutrosContent'
import { sociedadeFalamHeroImage } from '@/features/sociedade-falam/data/sociedadeFalamContent'
import { assetSrc } from '@/lib/assetSrc'

export const carouselSlides = [
  {
    id: '1',
    src: assetSrc(banner01Img),
    alt: 'Estudantes montando quebra-cabeça em sala de aula',
    caption: 'Construção coletiva de conhecimento nas escolas públicas',
  },
  {
    id: '2',
    src: assetSrc(banner02Img),
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
    image: assetSrc(videoRecreioImg),
    imageAlt: 'Estudantes no pátio escolar durante o recreio',
    variant: 'photo',
  },
  {
    id: 'historias',
    title: 'Histórias do recreio',
    href: '/historias-do-recreio',
    image: assetSrc(historiasRecreioImg),
    imageAlt: 'Crianças correndo pelo corredor da escola',
    variant: 'photo',
  },
  {
    id: 'debate',
    title: 'Debate: Recreio em Cena',
    href: '/video-debate-o-recreio-em-cena-final',
    image: assetSrc(debateImg),
    imageAlt: 'Arte do debate Recreio em Cena',
    variant: 'graphic',
  },
  {
    id: 'combinacao',
    title: 'O Projeto Combinação',
    href: '/o-projeto-falatorio',
    image: assetSrc(combinacaoImg),
    imageAlt: 'Logo do Projeto Combinação',
    variant: 'graphic',
  },
  {
    id: 'jornalzino',
    title: 'Jornalzino da escola DB',
    href: '/jornalzinho-da-escola-db',
    image: assetSrc(jornalzinhoImg),
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
    image: asCriancasFalamHeroImage,
    imageAlt: asCriancasFalamEvent.imageAlt,
  },
  {
    id: 'recrear-mundos',
    title: 'Em Comuns…Recrear em mundos outros',
    date: recrearMundosOutrosEvent.date,
    location: recrearMundosOutrosEvent.location,
    href: '/eventos/recrear-mundos-outros',
    image: recrearMundosOutrosPoster1,
    imageAlt: recrearMundosOutrosEvent.posters[0].alt,
  },
]

export const featureCards = [
  {
    id: 'criancas',
    title: 'As crianças falam',
    href: '/criancas-falam',
    color: 'red' as const,
    image: assetSrc(asCriancasFalamImg),
    imageAlt: 'As crianças falam sobre o recreio',
  },
  {
    id: 'professoras',
    title: 'As professoras e os professores falam',
    href: '/professores-falam',
    color: 'yellow' as const,
    image: assetSrc(asProfessorasFalamImg),
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
    image: sociedadeFalamHeroImage,
    imageAlt: 'A sociedade fala sobre o recreio e a brincadeira',
  },
]
