import type { Metadata } from 'next'
import { EventosSubpagePlaceholder } from '@/views/eventos/EventosSubpagePlaceholder'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Fotos do evento',
  description: 'Registros fotográficos do evento.',
  path: '/eventos/as-criancas-falam/fotos',
})

export default function Page() {
  return (
    <EventosSubpagePlaceholder
      title="Fotos do evento"
      description="Registros fotográficos do evento As Crianças Falam."
      parentLabel="As Crianças Falam"
      parentHref="/eventos/as-criancas-falam"
    />
  )
}
