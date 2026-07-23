import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowUpRight } from 'lucide-react'
import type { MultimidiaSection } from '@/features/multimidia/data/multimidiaContent'
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

interface MultimidiaSectionCardProps {
  section: MultimidiaSection
}

export function MultimidiaSectionCard({ section }: MultimidiaSectionCardProps) {
  const Icon = section.icon
  const styles = colorStyles[section.color]

  return (
    <div className="h-full transition-transform duration-300 hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        to={section.href}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all duration-300',
          styles.hover,
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={section.image}
            alt={section.imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-neutral-900/10 to-transparent" />
          <div
            className={cn(
              'absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-soft',
              styles.badge,
            )}
          >
            <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
            {section.title}
          </h2>

          <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            {section.description}
          </p>

          <span className="mt-6 inline-flex items-center gap-1.5 font-ui text-sm font-semibold uppercase tracking-wider text-brand-red transition-all group-hover:gap-2.5">
            Ver
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  )
}
