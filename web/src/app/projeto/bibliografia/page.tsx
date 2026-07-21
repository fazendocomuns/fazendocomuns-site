import type { Metadata } from 'next'
import { BibliografiaPage } from '@/views/projeto/BibliografiaPage'
import { bibliografiaContent as bibliografiaFallback } from '@/features/projeto/data/bibliografiaContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: bibliografiaFallback.title,
  description: bibliografiaFallback.intro,
  path: '/projeto/bibliografia',
})

export default async function Page() {
  const content = await getPaginaConteudo('bibliografia', bibliografiaFallback)
  return <BibliografiaPage content={content} />
}
