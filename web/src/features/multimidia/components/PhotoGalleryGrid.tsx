'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import type { FotosGallery } from '@/features/multimidia/data/fotosContent'
import { supabaseImageLoader } from '@/lib/supabaseImageLoader'

const PhotoLightbox = dynamic(
  () =>
    import('@/features/multimidia/components/PhotoLightbox').then(
      (module) => module.PhotoLightbox,
    ),
  { ssr: false },
)

interface PhotoGalleryGridProps {
  gallery: FotosGallery
}

export function PhotoGalleryGrid({ gallery }: PhotoGalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {gallery.images.map((image, index) => (
          <li
            key={image}
            className="[contain-intrinsic-size:auto_320px] [content-visibility:auto]"
          >
            <figure className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Abrir ${gallery.title} — foto ${index + 1}`}
                className="block w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`${gallery.title} — foto ${index + 1}`}
                    fill
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 46vw, (max-width: 1440px) 31vw, 440px"
                    quality={60}
                    loader={supabaseImageLoader}
                    className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                </div>
              </button>
            </figure>
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <PhotoLightbox
          images={gallery.images}
          title={gallery.title}
          openIndex={openIndex}
          onClose={() => setOpenIndex(null)}
          onChangeIndex={setOpenIndex}
        />
      ) : null}
    </>
  )
}
