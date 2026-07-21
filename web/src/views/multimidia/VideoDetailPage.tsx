'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { EventPanelVideo } from '@/features/eventos/components/EventPanelVideo'
import type { VideoItem } from '@/features/multimidia/data/videosContent'

interface VideoDetailPageProps {
  video: VideoItem
}

export function VideoDetailPage({ video }: VideoDetailPageProps) {
  return (
    <>
      <PageHero
        title={video.title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Multimídia', href: '/multimidia' },
          { label: 'Vídeos', href: '/multimidia/videos' },
          { label: video.title },
        ]}
      />

      <section className="section-padding bg-background" aria-label={video.title}>
        <div className="container-app mx-auto max-w-4xl">
          <ScrollReveal>
            <EventPanelVideo
              title={video.title}
              color={video.color}
              videoUrl={video.videoUrl}
            />
          </ScrollReveal>

          {video.description ? (
            <ScrollReveal delay={0.1}>
              <p className="mt-8 font-body text-base leading-relaxed text-muted-foreground md:text-lg">
                {video.description}
              </p>
            </ScrollReveal>
          ) : null}
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app mx-auto max-w-4xl border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/multimidia/videos">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para Vídeos
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
