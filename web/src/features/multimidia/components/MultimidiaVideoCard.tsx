'use client'

import { EventPanelVideo } from '@/features/eventos/components/EventPanelVideo'
import type { VideoItem } from '@/features/multimidia/data/videosContent'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

interface MultimidiaVideoCardProps {
  video: VideoItem
  index: number
}

export function MultimidiaVideoCard({ video, index }: MultimidiaVideoCardProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
        <EventPanelVideo
          title={video.title}
          color={video.color}
          videoUrl={video.videoUrl}
        />
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-foreground md:text-xl">
            {video.title}
          </h3>
          {video.description ? (
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
              {video.description}
            </p>
          ) : null}
        </div>
      </article>
    </ScrollReveal>
  )
}
