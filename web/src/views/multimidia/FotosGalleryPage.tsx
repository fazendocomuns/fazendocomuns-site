'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/button'
import { PhotoGalleryGrid } from '@/features/multimidia/components/PhotoGalleryGrid'
import type { FotosGallery } from '@/features/multimidia/data/fotosContent'

interface FotosGalleryPageProps {
  gallery: FotosGallery
}

export function FotosGalleryPage({ gallery }: FotosGalleryPageProps) {
  return (
    <>
      <PageHero
        title={gallery.title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Multimídia', href: '/multimidia' },
          { label: 'Fotos', href: '/multimidia/fotos' },
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
            <Link href="/multimidia/fotos">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para Fotos
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
