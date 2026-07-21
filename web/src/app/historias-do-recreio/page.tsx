import type { Metadata } from 'next'
import { HistoriasDoRecreioPage } from '@/views/HistoriasDoRecreioPage'
import { historiasDoRecreioContent as historiasFallback } from '@/features/historias-do-recreio/data/historiasDoRecreioContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: historiasFallback.title,
  description: 'Histórias do recreio produzidas por crianças das escolas parceiras.',
  path: '/historias-do-recreio',
})

export default async function Page() {
  const content = await getPaginaConteudo('historias-do-recreio', historiasFallback)
  return <HistoriasDoRecreioPage content={content} />
}
