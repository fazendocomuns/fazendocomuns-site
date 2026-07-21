'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { FotosGalleryCard } from '@/features/multimidia/components/FotosGalleryCard'
import type { FotosGallery } from '@/features/multimidia/data/fotosContent'
import { fotosContent } from '@/features/multimidia/data/fotosContent'

interface FotosPageProps {
  galleries: FotosGallery[]
}

export function FotosPage({ galleries }: FotosPageProps) {
  const { title, intro } = fotosContent

  return (
    <>
      <PageHero
        title={title}
        subtitle={intro}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Multimídia', href: '/multimidia' },
          { label: title },
        ]}
      />

      <section className="section-padding bg-background" aria-label="Galerias de fotos">
        <div className="container-app">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
              Galerias
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {galleries.map((gallery, index) => (
              <ScrollReveal key={gallery.id} delay={index * 0.06}>
                <FotosGalleryCard gallery={gallery} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/multimidia">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para Multimídia
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
