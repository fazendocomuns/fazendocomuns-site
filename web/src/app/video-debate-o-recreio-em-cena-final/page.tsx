import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { VideoDetailPage } from '@/views/multimidia/VideoDetailPage'
import { getPublicVideoBySlug } from '@/lib/content/multimidia.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

const SLUG = 'video-debate-o-recreio-em-cena-final'

export async function generateMetadata(): Promise<Metadata> {
  const video = await getPublicVideoBySlug(SLUG)

  if (!video) {
    return buildPageMetadata({
      title: 'Vídeo não encontrado',
      description: 'O vídeo solicitado não existe ou foi removido.',
      path: `/${SLUG}`,
      noindex: true,
    })
  }

  return buildPageMetadata({
    title: video.title,
    description: video.description ?? video.title,
    path: `/${SLUG}`,
    ogImage: video.thumbnail,
  })
}

export default async function Page() {
  const video = await getPublicVideoBySlug(SLUG)

  if (!video) {
    notFound()
  }

  return <VideoDetailPage video={video} />
}
