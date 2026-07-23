import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowUpRight } from 'lucide-react'
import type { FotosGallery } from '@/features/multimidia/data/fotosContent'
import { cn } from '@/lib/utils'

const colorStyles = {
  red: {
    badge: 'bg-brand-red text-white',
    hover: 'group-hover:border-brand-red group-hover:shadow-[0_12px_40px_-10px_rgba(239,50,32,0.3)]',
  },
  amber: {
    badge: 'bg-brand-amber text-neutral-900',
    hover: 'group-hover:border-brand-amber group-hover:shadow-[0_12px_40px_-10px_rgba(255,189,89,0.4)]',
  },
  yellow: {
    badge: 'bg-brand-yellow text-neutral-900',
    hover: 'group-hover:border-brand-yellow group-hover:shadow-[0_12px_40px_-10px_rgba(250,212,57,0.4)]',
  },
  orange: {
    badge: 'bg-brand-orange text-white',
    hover: 'group-hover:border-brand-orange group-hover:shadow-[0_12px_40px_-10px_rgba(255,145,77,0.35)]',
  },
}

interface FotosGalleryCardProps {
  gallery: FotosGallery
}

export function FotosGalleryCard({ gallery }: FotosGalleryCardProps) {
  const styles = colorStyles[gallery.color]

  return (
    <div className="h-full transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        to={gallery.href}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all duration-300',
          styles.hover,
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={gallery.cover}
            alt={gallery.title}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-neutral-900/10 to-transparent" />
          <div
            className={cn(
              'absolute bottom-4 left-4 rounded-full px-3 py-1 font-ui text-xs font-semibold uppercase tracking-widest',
              styles.badge,
            )}
          >
            {gallery.images.length} fotos
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
            {gallery.title}
          </h2>

          <span className="mt-6 inline-flex items-center gap-1.5 font-ui text-sm font-semibold uppercase tracking-wider text-brand-red transition-all group-hover:gap-2.5">
            Ver galeria
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  )
}
