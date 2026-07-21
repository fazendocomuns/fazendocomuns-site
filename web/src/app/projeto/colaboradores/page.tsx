import type { Metadata } from 'next'
import { ColaboradoresPage } from '@/views/projeto/ColaboradoresPage'
import { colaboradoresContent } from '@/features/projeto/data/colaboradoresContent'
import { getPublicColaboradores } from '@/lib/content/equipe.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: colaboradoresContent.title,
  description: colaboradoresContent.subtitle,
  path: '/projeto/colaboradores',
})

export default async function Page() {
  const members = await getPublicColaboradores()
  return <ColaboradoresPage members={members} />
}
