import type { Metadata } from 'next'
import { ArtigosPage } from '@/views/projeto/ArtigosPage'
import { artigosContent as artigosFallback } from '@/features/projeto/data/artigosContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: artigosFallback.title,
  description: 'Artigos científicos do projeto Fazendo Comuns.',
  path: '/projeto/producoes/artigos',
})

export default async function Page() {
  const content = await getPaginaConteudo('artigos', artigosFallback)
  return <ArtigosPage content={content} />
}
