import type { Metadata } from 'next'
import { SociedadeFalamPage } from '@/views/SociedadeFalamPage'
import { sociedadeFalamContent as sociedadeFalamFallback } from '@/features/sociedade-falam/data/sociedadeFalamContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: sociedadeFalamFallback.heading,
  description: sociedadeFalamFallback.subtitle,
  path: '/a-sociedade-fala',
})

export default async function Page() {
  const content = await getPaginaConteudo('sociedade-falam', sociedadeFalamFallback)
  return <SociedadeFalamPage content={content} />
}
