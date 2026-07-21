import type { Metadata } from 'next'
import { OQueEPage } from '@/views/projeto/OQueEPage'
import { oQueEContent as oQueEContentFallback } from '@/features/projeto/data/oQueEContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: oQueEContentFallback.title,
  description: oQueEContentFallback.subtitle,
  path: '/projeto/o-que-e',
})

export default async function Page() {
  const content = await getPaginaConteudo('o-que-e', oQueEContentFallback)
  return <OQueEPage content={content} />
}
