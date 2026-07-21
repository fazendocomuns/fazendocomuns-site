import type { Metadata } from 'next'
import { LivrosListView } from '@/features/livros/components/LivrosListView'
import { getPublicLivros, livrosHubIntro } from '@/lib/content/livros.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: livrosHubIntro.seo.title,
  description: livrosHubIntro.seo.description,
  path: '/livros',
})

export default async function LivrosPage() {
  const livros = await getPublicLivros()

  return (
    <LivrosListView
      title={livrosHubIntro.title}
      subtitle={livrosHubIntro.subtitle}
      livros={livros}
    />
  )
}
