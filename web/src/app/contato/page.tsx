import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { ContatoPage } from '@/views/ContatoPage'

export const metadata: Metadata = buildPageMetadata({
  title: 'Contato',
  description: 'Entre em contato com o projeto Fazendo Comuns.',
  path: '/contato',
})

export default function Page() {
  return <ContatoPage />
}
