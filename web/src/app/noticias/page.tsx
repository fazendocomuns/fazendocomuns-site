import type { Metadata } from 'next'
import { NoticiasListView } from '@/features/noticias/components/NoticiasListView'
import { getPublicNoticias, noticiasHubIntro } from '@/lib/content/noticias.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: noticiasHubIntro.title,
  description: noticiasHubIntro.subtitle,
  path: '/noticias',
})

export default async function NoticiasPage() {
  const noticias = await getPublicNoticias()

  return (
    <NoticiasListView
      title={noticiasHubIntro.title}
      subtitle={noticiasHubIntro.subtitle}
      noticias={noticias}
    />
  )
}
