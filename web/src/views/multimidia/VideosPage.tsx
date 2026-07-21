'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { MultimidiaVideoCard } from '@/features/multimidia/components/MultimidiaVideoCard'
import type { VideoItem } from '@/features/multimidia/data/videosContent'
import { videosContent } from '@/features/multimidia/data/videosContent'

interface VideosPageProps {
  items: VideoItem[]
}

export function VideosPage({ items }: VideosPageProps) {
  const { title, intro } = videosContent

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

      <section className="section-padding bg-background" aria-label="Vídeos do projeto">
        <div className="container-app">
          <ScrollReveal>
            <h2 className="sr-only">Lista de vídeos</h2>
          </ScrollReveal>

          <div className="grid gap-10 lg:grid-cols-1 lg:gap-12">
            {items.map((video, index) => (
              <MultimidiaVideoCard key={video.id} video={video} index={index} />
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
