'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, Mic } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { podcastContent as podcastContentStatic } from '@/features/multimidia/data/podcastContent'

interface PodcastPageProps {
  content: typeof podcastContentStatic
}

export function PodcastPage({ content }: PodcastPageProps) {
  const { title, heading, episode } = content

  return (
    <>
      <PageHero
        title={title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Multimídia', href: '/multimidia' },
          { label: title },
        ]}
      />

      <section className="section-padding bg-background" aria-label="Episódio de podcast">
        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
              {heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <article className="mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
              <div className="flex items-start gap-4 border-b border-border/60 bg-brand-orange/10 p-6 md:p-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-soft">
                  <Mic className="size-7" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-ui text-xs font-semibold uppercase tracking-widest text-brand-orange">
                    Episódio
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground md:text-xl">
                    {episode.title}
                  </h3>
                  <p className="mt-2 font-body text-sm text-muted-foreground">
                    Duração: {episode.duration}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <audio
                  controls
                  preload="metadata"
                  className="w-full"
                  aria-label={episode.title}
                >
                  <source src={episode.audioUrl} type="audio/mpeg" />
                  Seu navegador não suporta reprodução de áudio.
                </audio>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app mx-auto max-w-3xl border-t border-border pt-8">
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
