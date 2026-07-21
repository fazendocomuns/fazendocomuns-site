import type { Metadata } from 'next'
import { ProjetoCombinacaoPage } from '@/views/ProjetoCombinacaoPage'
import { projetoCombinacaoContent as projetoCombinacaoFallback } from '@/features/projeto-combinacao/data/projetoCombinacaoContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: projetoCombinacaoFallback.title,
  description: 'Projeto CombinAção — pesquisa e intervenção social sobre participação de crianças.',
  path: '/o-projeto-falatorio',
})

export default async function Page() {
  const content = await getPaginaConteudo('projeto-combinacao', projetoCombinacaoFallback)
  return <ProjetoCombinacaoPage content={content} />
}
