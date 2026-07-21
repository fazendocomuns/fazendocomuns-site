import type { Metadata } from 'next'
import { LivrosCapitulosPage } from '@/views/projeto/LivrosCapitulosPage'
import { livrosCapitulosContent as livrosCapitulosFallback } from '@/features/projeto/data/livrosCapitulosContent'
import { getPaginaConteudo } from '@/lib/content/paginas.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: livrosCapitulosFallback.title,
  description: 'Livros e capítulos produzidos pelo Fazendo Comuns.',
  path: '/projeto/producoes/livros',
})

export default async function Page() {
  const content = await getPaginaConteudo('livros-capitulos', livrosCapitulosFallback)
  return <LivrosCapitulosPage content={content} />
}
