import debateImg from '@/assets/imgs/debate.png'
import historiasRecreioImg from '@/assets/imgs/históriasDoRecreio.png'
import videoRecreioImg from '@/assets/imgs/vídeoVamosFalar.jpeg'
import type { EventPanelColor } from '@/features/eventos/data/asCriancasFalamContent'
import { assetSrc } from '@/lib/assetSrc'

export interface VideoItem {
  id: string
  slug?: string
  title: string
  description?: string
  videoUrl: string
  thumbnail: string
  thumbnailAlt: string
  color: EventPanelColor
}

export const videosContent = {
  title: 'Vídeos',
  intro:
    'Vídeos, debates e produções audiovisuais sobre o recreio e a vida escolar.',
  items: [
    {
      id: 'vamos-falar-recreio',
      slug: 'video-vamos-falar-do-recreio',
      title: 'Vídeo: Vamos falar do recreio?',
      description:
        'Convite para a discussão pública sobre o recreio nas escolas públicas.',
      videoUrl: 'https://www.youtube.com/watch?v=jqKPql7r-Lw',
      thumbnail: assetSrc(videoRecreioImg),
      thumbnailAlt: 'Estudantes no pátio escolar durante o recreio',
      color: 'amber',
    },
    {
      id: 'debate-recreio-em-cena',
      slug: 'video-debate-o-recreio-em-cena-final',
      title: 'Vídeo: Debate o Recreio em Cena',
      description: 'Debate sobre o recreio escolar e suas dimensões políticas.',
      videoUrl: 'https://www.youtube.com/watch?v=foUair-Z6GM',
      thumbnail: assetSrc(debateImg),
      thumbnailAlt: 'Arte do debate Recreio em Cena',
      color: 'red',
    },
    {
      id: 'rap-historias-recreio',
      slug: 'video-rap-historias-do-recreio',
      title: 'Vídeo: RAP Histórias do Recreio',
      description:
        'Produção em vídeo com histórias e vivências do recreio escolar.',
      videoUrl: 'https://www.youtube.com/watch?v=srEgin3qRi4',
      thumbnail: assetSrc(historiasRecreioImg),
      thumbnailAlt: 'Crianças correndo pelo corredor da escola',
      color: 'orange',
    },
  ] satisfies VideoItem[],
}

export function getVideoBySlug(slug: string): VideoItem | undefined {
  return videosContent.items.find((video) => video.slug === slug || video.id === slug)
}
