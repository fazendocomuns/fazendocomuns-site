'use client'

import type { FotosGallery } from '@/features/multimidia/data/fotosContent'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

interface PhotoGalleryGridProps {
  gallery: FotosGallery
}

export function PhotoGalleryGrid({ gallery }: PhotoGalleryGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.images.map((image, index) => (
        <ScrollReveal key={image} delay={Math.min(index * 0.04, 0.4)}>
          <figure className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={`${gallery.title} — foto ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </figure>
        </ScrollReveal>
      ))}
    </div>
  )
}
