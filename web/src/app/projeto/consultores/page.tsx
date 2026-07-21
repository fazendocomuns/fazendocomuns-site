import type { Metadata } from 'next'
import { ConsultoresPage } from '@/views/projeto/ConsultoresPage'
import { consultoresContent } from '@/features/projeto/data/consultoresContent'
import { getPublicConsultores } from '@/lib/content/equipe.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: consultoresContent.title,
  description: consultoresContent.subtitle,
  path: '/projeto/consultores',
})

export default async function Page() {
  const consultants = await getPublicConsultores()
  return <ConsultoresPage consultants={consultants} />
}
