import type { Metadata } from 'next'
import { EventosSubpagePlaceholder } from '@/views/eventos/EventosSubpagePlaceholder'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Fotos do evento',
  description: 'Registros fotográficos do evento.',
  path: '/eventos/recrear-mundos-outros/fotos',
})

export default function Page() {
  return (
    <EventosSubpagePlaceholder
      title="Fotos do evento"
      description="Registros fotográficos do evento Recrear mundos outros."
      parentLabel="Recrear mundos outros"
      parentHref="/eventos/recrear-mundos-outros"
    />
  )
}
