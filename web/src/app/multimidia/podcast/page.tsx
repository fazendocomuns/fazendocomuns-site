import type { Metadata } from 'next'
import { PodcastPage } from '@/views/multimidia/PodcastPage'
import { podcastContent } from '@/features/multimidia/data/podcastContent'
import { getPublicPodcast } from '@/lib/content/multimidia.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: podcastContent.title,
  description: podcastContent.heading,
  path: '/multimidia/podcast',
})

export default async function Page() {
  const content = await getPublicPodcast()
  return <PodcastPage content={content} />
}
