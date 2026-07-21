import type { Metadata } from 'next'
import { LinksParceirosPage } from '@/views/mais/LinksParceirosPage'
import { linksParceirosContent } from '@/features/mais/data/linksParceirosContent'
import { getPublicLinksParceiros } from '@/lib/content/linksParceiros.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: linksParceirosContent.title,
  description: 'Links de parceiros e publicações relacionadas ao Fazendo Comuns.',
  path: '/mais/links-parceiros',
})

export default async function Page() {
  const partners = await getPublicLinksParceiros()
  return <LinksParceirosPage partners={partners} />
}
