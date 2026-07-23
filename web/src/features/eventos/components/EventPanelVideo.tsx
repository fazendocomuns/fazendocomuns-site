'use client'

import Image from 'next/image'
import { useState } from 'react'
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

interface VideoEmbed {
  embedUrl: string
  thumbnailUrl?: string
}

function getVideoEmbed(url: string): VideoEmbed | null {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      return videoId
        ? {
            embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
            thumbnailUrl: `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
          }
        : null
    }

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.slice(1)
      return videoId
        ? {
            embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
            thumbnailUrl: `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`,
          }
        : null
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).pop()
      return videoId
        ? { embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1` }
        : null
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
  const [isActivated, setIsActivated] = useState(false)
  const video = videoUrl ? getVideoEmbed(videoUrl) : null

  return (
    <div
      className={cn(
        'flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border shadow-soft md:min-h-[280px] lg:min-h-0',
        colorStyles[color],
      )}
    >
      <div className="relative aspect-video w-full bg-neutral-900/90">
        {video && isActivated ? (
          <iframe
            src={video.embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : video ? (
          <button
            type="button"
            onClick={() => setIsActivated(true)}
            className="group absolute inset-0 flex size-full items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            aria-label={`Reproduzir ${title}`}
          >
            {video.thumbnailUrl ? (
              <Image
                src={video.thumbnailUrl}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                quality={60}
                className="object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
              />
            ) : null}
            <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
            <span
              className={cn(
                'relative flex h-16 w-16 items-center justify-center rounded-full shadow-medium transition-transform group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none',
                iconStyles[color],
              )}
              aria-hidden="true"
            >
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </button>
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
