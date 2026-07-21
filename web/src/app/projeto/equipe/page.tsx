import type { Metadata } from 'next'
import { EquipePage } from '@/views/projeto/EquipePage'
import { equipeContent } from '@/features/projeto/data/equipeContent'
import { getPublicEquipeGroups } from '@/lib/content/equipe.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: equipeContent.title,
  description: equipeContent.subtitle,
  path: '/projeto/equipe',
})

export default async function Page() {
  const groups = await getPublicEquipeGroups()
  return <EquipePage groups={groups} />
}
