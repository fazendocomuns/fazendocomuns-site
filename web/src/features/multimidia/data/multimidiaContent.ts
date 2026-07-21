import type { LucideIcon } from 'lucide-react'
import { Camera, Mic, Play } from 'lucide-react'

import fotosPreview from '@/assets/imgs/asCriancasFalam.jpg'
import videosPreview from '@/assets/imgs/vídeoVamosFalar.jpeg'
import podcastPreview from '@/assets/imgs/debate.png'
import { assetSrc } from '@/lib/assetSrc'

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
    image: assetSrc(fotosPreview),
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
    image: assetSrc(videosPreview),
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
    image: assetSrc(podcastPreview),
    imageAlt: 'Podcast Direito ao Recreio',
  },
]

export const multimidiaPageContent = {
  intro: multimidiaHubIntro,
  sections: multimidiaSections,
}
