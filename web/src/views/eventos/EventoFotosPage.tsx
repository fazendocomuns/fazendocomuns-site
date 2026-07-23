import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/button'
import { PhotoGalleryGrid } from '@/features/multimidia/components/PhotoGalleryGrid'
import type { FotosGallery } from '@/features/multimidia/data/fotosContent'

interface EventoFotosPageProps {
  gallery: FotosGallery
  parentLabel: string
  parentHref: string
}

export function EventoFotosPage({
  gallery,
  parentLabel,
  parentHref,
}: EventoFotosPageProps) {
  return (
    <>
      <PageHero
        title={gallery.title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Eventos', href: '/eventos' },
          { label: parentLabel, href: parentHref },
          { label: gallery.title },
        ]}
      />

      <section className="section-padding bg-background" aria-label={gallery.title}>
        <div className="container-app">
          <PhotoGalleryGrid gallery={gallery} />
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href={parentHref}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para {parentLabel}
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
