import type { Metadata } from 'next'
import { EventosPage } from '@/views/eventos/EventosPage'
import { eventosHubIntro, getPublicEventos } from '@/lib/content/eventos.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: eventosHubIntro.title,
  description: eventosHubIntro.subtitle,
  path: '/eventos',
})

export default async function Page() {
  const events = await getPublicEventos()
  return <EventosPage events={events} />
}
