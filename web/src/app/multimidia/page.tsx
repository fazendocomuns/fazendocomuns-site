import type { Metadata } from 'next'
import { MultimidiaPage } from '@/views/multimidia/MultimidiaPage'
import { multimidiaPageContent } from '@/features/multimidia/data/multimidiaContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: multimidiaPageContent.intro.title,
  description: multimidiaPageContent.intro.subtitle,
  path: '/multimidia',
})

export default async function Page() {
  const content = await getPaginaConteudo('multimidia', multimidiaPageContent)
  return <MultimidiaPage intro={content.intro} />
}
