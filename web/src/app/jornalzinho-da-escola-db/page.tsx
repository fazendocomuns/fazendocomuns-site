import type { Metadata } from 'next'
import { JornalzinhoPage } from '@/views/JornalzinhoPage'
import { jornalzinhoContent as jornalzinhoFallback } from '@/features/jornalzinho/data/jornalzinhoContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: jornalzinhoFallback.heading,
  description: jornalzinhoFallback.subtitle,
  path: '/jornalzinho-da-escola-db',
})

export default async function Page() {
  const content = await getPaginaConteudo('jornalzinho', jornalzinhoFallback)
  return <JornalzinhoPage content={content} />
}
