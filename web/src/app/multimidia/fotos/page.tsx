import type { Metadata } from 'next'
import { FotosPage } from '@/views/multimidia/FotosPage'
import { fotosContent } from '@/features/multimidia/data/fotosContent'
import { getPublicGalerias } from '@/lib/content/multimidia.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: fotosContent.title,
  description: fotosContent.intro,
  path: '/multimidia/fotos',
})

export default async function Page() {
  const galleries = await getPublicGalerias()
  return <FotosPage galleries={galleries} />
}
