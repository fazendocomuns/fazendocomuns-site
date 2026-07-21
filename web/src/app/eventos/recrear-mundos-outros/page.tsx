import type { Metadata } from 'next'
import { RecrearMundosOutrosPage } from '@/views/eventos/RecrearMundosOutrosPage'
import { recrearMundosOutrosEvent as recrearMundosFallback } from '@/features/eventos/data/recrearMundosOutrosContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: recrearMundosFallback.title,
  description: recrearMundosFallback.subtitle,
  path: '/eventos/recrear-mundos-outros',
})

export default async function Page() {
  const content = await getPaginaConteudo('recrear-mundos-outros', recrearMundosFallback)
  return <RecrearMundosOutrosPage content={content} />
}
