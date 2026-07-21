import type { Metadata } from 'next'
import { HomePageView } from '@/features/home/components/HomePageView'
import { getHomePageData } from '@/lib/content/home.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: 'Fazendo Comuns',
  description:
    'Fazendo Comuns — pesquisa sobre recreio nas escolas públicas, coordenado pela UFRJ. Vamos falar sobre o recreio!',
  path: '/',
})

export default async function HomePage() {
  const { featuredEditorial, newsItems, events } = await getHomePageData()

  return (
    <HomePageView
      featuredEditorial={featuredEditorial}
      newsItems={newsItems}
      events={events}
    />
  )
}
