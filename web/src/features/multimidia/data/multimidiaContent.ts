import type { LucideIcon } from 'lucide-react'
import { Camera, Mic, Play } from 'lucide-react'

const supabaseStorage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens'

const img = (path: string) => `${supabaseStorage}/${path}`

export interface MultimidiaSection {
  id: string
  title: string
  href: string
  description: string
  icon: LucideIcon
  color: 'red' | 'amber' | 'yellow' | 'orange'
  image: string
  imageAlt: string
}

export const multimidiaHubIntro = {
  title: 'Multimídia',
  subtitle:
    'Podcast, vídeos e fotos que documentam a pesquisa, os eventos e as vozes do projeto Fazendo Comuns.',
}

export const multimidiaSections: MultimidiaSection[] = [
  {
    id: 'fotos',
    title: 'Fotos',
    href: '/multimidia/fotos',
    description:
      'Registros fotográficos de pesquisas de campo, eventos e atividades nas escolas públicas.',
    icon: Camera,
    color: 'amber',
    image: img('pagina-home/as-criancas-falam.jpg'),
    imageAlt: 'Fotos do projeto Fazendo Comuns',
  },
  {
    id: 'videos',
    title: 'Vídeos',
    href: '/multimidia/videos',
    description:
      'Vídeos, debates e produções audiovisuais sobre o recreio e a vida escolar.',
    icon: Play,
    color: 'red',
    image: img('pagina-home/Video-Vamos-falar-do-recreio.jpg'),
    imageAlt: 'Vídeos do projeto Fazendo Comuns',
  },
  {
    id: 'podcast',
    title: 'Podcast',
    href: '/multimidia/podcast',
    description:
      'Podcast “Direito ao Recreio” e outras produções em áudio do projeto.',
    icon: Mic,
    color: 'orange',
    image: img('capas-podcast/Direito-Ao-Recreio.jpg'),
    imageAlt: 'Podcast Direito ao Recreio',
  },
]

export const multimidiaPageContent = {
  intro: multimidiaHubIntro,
  sections: multimidiaSections,
}
