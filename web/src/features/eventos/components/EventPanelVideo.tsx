'use client'

import { Play } from 'lucide-react'
import type { EventPanelColor } from '@/features/eventos/data/asCriancasFalamContent'
import { cn } from '@/lib/utils'

const colorStyles: Record<EventPanelColor, string> = {
  amber: 'border-brand-amber/40 bg-brand-amber/5',
  red: 'border-brand-red/40 bg-brand-red/5',
  orange: 'border-brand-orange/40 bg-brand-orange/5',
  yellow: 'border-brand-yellow/50 bg-brand-yellow/10',
}

const iconStyles: Record<EventPanelColor, string> = {
  amber: 'bg-brand-amber text-neutral-900',
  red: 'bg-brand-red text-white',
  orange: 'bg-brand-orange text-white',
  yellow: 'bg-brand-yellow text-neutral-900',
}

function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.slice(1)
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop()
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null
    }
  } catch {
    return null
  }

  return null
}

interface EventPanelVideoProps {
  title: string
  color: EventPanelColor
  videoUrl?: string
}

export function EventPanelVideo({ title, color, videoUrl }: EventPanelVideoProps) {
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null

  return (
    <div
      className={cn(
        'flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border shadow-soft md:min-h-[280px] lg:min-h-0',
        colorStyles[color],
      )}
    >
      <div className="relative aspect-video w-full bg-neutral-900/90">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full shadow-medium',
                iconStyles[color],
              )}
            >
              <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
            </div>
            <div>
              <p className="font-ui text-xs font-semibold uppercase tracking-widest text-white/70">
                Vídeo
              </p>
              <p className="mt-1 font-body text-sm text-white/90 md:text-base">
                Em breve
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
