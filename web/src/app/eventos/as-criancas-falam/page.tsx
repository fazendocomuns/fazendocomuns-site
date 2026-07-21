import type { Metadata } from 'next'
import { AsCriancasFalamPage } from '@/views/eventos/AsCriancasFalamPage'
import { asCriancasFalamEvent as asCriancasFalamFallback } from '@/features/eventos/data/asCriancasFalamContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: asCriancasFalamFallback.title,
  description: asCriancasFalamFallback.subtitle,
  path: '/eventos/as-criancas-falam',
})

export default async function Page() {
  const content = await getPaginaConteudo('as-criancas-falam', asCriancasFalamFallback)
  return <AsCriancasFalamPage content={content} />
}
