import type { Metadata } from 'next'
import { ParceirosPage } from '@/views/projeto/ParceirosPage'
import { parceirosContent } from '@/features/projeto/data/parceirosContent'
import { getPublicParceiros } from '@/lib/content/parceiros.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: parceirosContent.title,
  description: parceirosContent.subtitle,
  path: '/projeto/parceiros',
})

export default async function Page() {
  const groups = await getPublicParceiros()
  return <ParceirosPage groups={groups} />
}
