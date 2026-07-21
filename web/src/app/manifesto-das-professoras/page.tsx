import type { Metadata } from 'next'
import { ManifestoDasProfessorasPage } from '@/views/ManifestoDasProfessorasPage'
import { manifestoDasProfessorasContent as manifestoFallback } from '@/features/professores-falam/data/manifestoDasProfessorasContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: manifestoFallback.title,
  description: manifestoFallback.heading,
  path: '/manifesto-das-professoras',
})

export default async function Page() {
  const content = await getPaginaConteudo('manifesto-das-professoras', manifestoFallback)
  return <ManifestoDasProfessorasPage content={content} />
}
