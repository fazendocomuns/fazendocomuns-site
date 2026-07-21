import type { Metadata } from 'next'
import { VideosPage } from '@/views/multimidia/VideosPage'
import { videosContent } from '@/features/multimidia/data/videosContent'
import { getPublicVideos } from '@/lib/content/multimidia.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: videosContent.title,
  description: videosContent.intro,
  path: '/multimidia/videos',
})

export default async function Page() {
  const items = await getPublicVideos()
  return <VideosPage items={items} />
}
