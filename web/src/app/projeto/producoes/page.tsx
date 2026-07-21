import type { Metadata } from 'next'
import { ProducoesPage } from '@/views/projeto/ProducoesPage'
import { producoesContent as producoesFallback } from '@/features/projeto/data/producoesContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: producoesFallback.title,
  description: producoesFallback.intro,
  path: '/projeto/producoes',
})

export default async function Page() {
  const content = await getPaginaConteudo('producoes', producoesFallback)
  return <ProducoesPage content={content} />
}
