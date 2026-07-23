import type { Metadata } from 'next'
import { EventoFotosPage } from '@/views/eventos/EventoFotosPage'
import {
  asCriancasFalamEvent,
  asCriancasFalamPhotos,
} from '@/features/eventos/data/asCriancasFalamContent'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { FotosGallery } from '@/features/multimidia/data/fotosContent'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: 'Fotos do evento — As Crianças Falam',
  description: 'Registros fotográficos do evento As Crianças Falam.',
  path: '/eventos/as-criancas-falam/fotos',
})

const gallery: FotosGallery = {
  id: 'evento-as-criancas-falam',
  title: 'Fotos do evento',
  href: '/eventos/as-criancas-falam/fotos',
  color: 'amber',
  cover: asCriancasFalamPhotos[0],
  images: [...asCriancasFalamPhotos],
}

export default function Page() {
  return (
    <EventoFotosPage
      gallery={gallery}
      parentLabel={asCriancasFalamEvent.title}
      parentHref="/eventos/as-criancas-falam"
    />
  )
}
