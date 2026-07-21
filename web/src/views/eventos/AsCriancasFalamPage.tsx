'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, Calendar, Camera, MapPin } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { EventPanelSection } from '@/features/eventos/components/EventPanelSection'
import { asCriancasFalamEvent as asCriancasFalamFallback } from '@/features/eventos/data/asCriancasFalamContent'
import { proseParagraph } from '@/lib/typography'

interface AsCriancasFalamPageProps {
  content: typeof asCriancasFalamFallback
}

export function AsCriancasFalamPage({ content }: AsCriancasFalamPageProps) {
  const { title, subtitle, image, imageAlt, date, location, intro, panels } = content

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Eventos', href: '/eventos' },
          { label: title },
        ]}
      />

      <section className="section-padding bg-background" aria-label="Sobre o evento">
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-10 lg:grid-cols-[minmax(220px,320px)_1fr] lg:items-start lg:gap-12">
              <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium lg:mx-0 lg:max-w-none">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </figure>

              <div className="min-w-0">
                <div className="space-y-5">
                  {intro.map((paragraph) => (
                    <p
                      key={paragraph}
                      className={proseParagraph}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <ul className="mt-8 flex flex-wrap gap-6 border-t border-border/60 pt-8">
                  <li className="flex items-center gap-2 font-body text-sm text-muted-foreground md:text-base">
                    <Calendar className="size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                    {date}
                  </li>
                  <li className="flex items-start gap-2 font-body text-sm text-muted-foreground md:text-base">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
                    {location}
                  </li>
                </ul>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-muted"
        aria-label="Mesas e painéis do evento"
      >
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Mesas e painéis
            </h2>
            <p className="mt-3 max-w-2xl font-body text-justify text-muted-foreground md:text-lg">
              O evento foi organizado em uma mesa de abertura e três painéis que
              articulam teoria, mobilização estudantil e a construção co-geracional
              do cotidiano escolar.
            </p>
          </ScrollReveal>

          <div className="mt-10 space-y-10 md:space-y-14">
            {panels.map((panel, index) => (
              <EventPanelSection key={panel.id} panel={panel} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background" aria-label="Registro fotográfico">
        <div className="container-app">
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/60 bg-card p-6 shadow-soft md:flex-row md:items-center md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-orange">
                  <Camera className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                    Fotos do evento
                  </h2>
                  <p className="mt-2 max-w-xl font-body text-sm text-muted-foreground md:text-base">
                    Registros fotográficos das mesas, painéis e participantes do
                    evento As Crianças Falam.
                  </p>
                </div>
              </div>

              <Button asChild>
                <Link href="/eventos/as-criancas-falam/fotos">Ver fotos</Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="mt-10 border-t border-border pt-8">
            <Button variant="outline" asChild>
              <Link href="/eventos">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Voltar para Eventos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
