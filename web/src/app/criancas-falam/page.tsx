import type { Metadata } from 'next'
import { CriancasFalamPage } from '@/views/CriancasFalamPage'
import { criancasFalamContent as criancasFalamFallback } from '@/features/criancas-falam/data/criancasFalamContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: criancasFalamFallback.heading,
  description: criancasFalamFallback.manifesto,
  path: '/criancas-falam',
})

export default async function Page() {
  const content = await getPaginaConteudo('criancas-falam', criancasFalamFallback)
  return <CriancasFalamPage content={content} />
}
