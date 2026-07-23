'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import { Expand } from 'lucide-react'
import { supabaseImageLoader } from '@/lib/supabaseImageLoader'
import { cn } from '@/lib/utils'

const PhotoLightbox = dynamic(
  () =>
    import('@/features/multimidia/components/PhotoLightbox').then(
      (module) => module.PhotoLightbox,
    ),
  { ssr: false },
)

export interface EventFlyer {
  src: string
  alt: string
}

interface EventFlyerGalleryProps {
  posters: EventFlyer[]
  /** Título usado no lightbox (ex.: nome do evento) */
  title: string
  className?: string
}

/**
 * Flyer principal ao lado do texto + seletor (quando há mais de um) + lightbox.
 * Padrão para páginas de eventos.
 */
export function EventFlyerGallery({
  posters,
  title,
  className,
}: EventFlyerGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!posters.length) return null

  const selected = posters[selectedIndex] ?? posters[0]
  const hasMultiple = posters.length > 1
  const lightboxImages = posters.map((poster) => poster.src)

  return (
    <div className={cn('mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none', className)}>
      <button
        type="button"
        onClick={() => setLightboxIndex(selectedIndex)}
        aria-label={`Ampliar cartaz: ${selected.alt}`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium transition-shadow hover:shadow-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        <Image
          key={selected.src}
          src={selected.src}
          alt={selected.alt}
          width={921}
          height={1300}
          sizes="(max-width: 1023px) 320px, 300px"
          quality={75}
          loader={supabaseImageLoader}
          className="h-auto w-full object-contain"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <span
          className="pointer-events-none absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full bg-black/55 text-white opacity-90 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        >
          <Expand className="size-4" />
        </span>
      </button>

      {hasMultiple ? (
        <div
          className="mt-4 grid grid-cols-2 gap-3"
          role="listbox"
          aria-label="Selecionar cartaz do evento"
        >
          {posters.map((poster, index) => {
            const isSelected = index === selectedIndex
            return (
              <button
                key={poster.src}
                type="button"
                role="option"
                aria-selected={isSelected}
                aria-label={`Selecionar cartaz ${index + 1}`}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  'aspect-3/4 overflow-hidden rounded-xl border bg-muted shadow-soft transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                  isSelected
                    ? 'border-brand-red ring-2 ring-brand-red/40'
                    : 'border-border/60 hover:border-brand-orange/60',
                )}
              >
                <span className="relative block size-full">
                  <Image
                    src={poster.src}
                    alt=""
                    fill
                    sizes="150px"
                    quality={60}
                    loader={supabaseImageLoader}
                    className="object-cover"
                  />
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      {lightboxIndex !== null ? (
        <PhotoLightbox
          images={lightboxImages}
          title={title}
          openIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChangeIndex={setLightboxIndex}
        />
      ) : null}
    </div>
  )
}
