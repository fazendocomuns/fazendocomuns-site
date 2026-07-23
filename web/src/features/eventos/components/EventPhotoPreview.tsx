'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import { supabaseImageLoader } from '@/lib/supabaseImageLoader'

const PhotoLightbox = dynamic(
  () =>
    import('@/features/multimidia/components/PhotoLightbox').then(
      (module) => module.PhotoLightbox,
    ),
  { ssr: false },
)

interface EventPhotoPreviewProps {
  photos: string[]
  title: string
  previewCount?: number
}

export function EventPhotoPreview({
  photos,
  title,
  previewCount = 8,
}: EventPhotoPreviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const previewPhotos = photos.slice(0, previewCount)

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4" role="list">
        {previewPhotos.map((photo, index) => (
          <li key={photo}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Abrir foto ${index + 1} do evento`}
              className="group block w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={photo}
                  alt={`${title} — foto ${index + 1}`}
                  fill
                  sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1440px) 23vw, 260px"
                  quality={60}
                  loader={supabaseImageLoader}
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null ? (
        <PhotoLightbox
          images={photos}
          title={title}
          openIndex={openIndex}
          onClose={() => setOpenIndex(null)}
          onChangeIndex={setOpenIndex}
        />
      ) : null}
    </>
  )
}
