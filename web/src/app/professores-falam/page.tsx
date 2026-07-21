import type { Metadata } from 'next'
import { ProfessoresFalamPage } from '@/views/ProfessoresFalamPage'
import { professoresFalamContent as professoresFalamFallback } from '@/features/professores-falam/data/professoresFalamContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: professoresFalamFallback.heading,
  description: professoresFalamFallback.subtitle,
  path: '/professores-falam',
})

export default async function Page() {
  const content = await getPaginaConteudo('professores-falam', professoresFalamFallback)
  return <ProfessoresFalamPage content={content} />
}
