import type { Metadata } from 'next'
import { CartazesHistoriasPage } from '@/views/CartazesHistoriasPage'
import { historiasDoRecreioContent as historiasFallback } from '@/features/historias-do-recreio/data/historiasDoRecreioContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: 'Cartazes com histórias do recreio',
  description: 'Cartazes ilustrados com histórias do recreio escolar.',
  path: '/cartazes-com-historias-do-recreio',
})

export default async function Page() {
  const content = await getPaginaConteudo('historias-do-recreio', historiasFallback)
  return <CartazesHistoriasPage content={content} />
}
