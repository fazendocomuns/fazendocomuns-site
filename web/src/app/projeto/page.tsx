import type { Metadata } from 'next'
import { ProjetoPage } from '@/views/projeto/ProjetoPage'
import { projetoPageContent } from '@/features/projeto/data/projetoContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: projetoPageContent.intro.title,
  description: projetoPageContent.intro.subtitle,
  path: '/projeto',
})

export default async function Page() {
  const content = await getPaginaConteudo('projeto', projetoPageContent)
  return <ProjetoPage intro={content.intro} />
}
