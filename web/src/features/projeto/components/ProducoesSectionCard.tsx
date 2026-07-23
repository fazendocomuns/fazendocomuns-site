import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowUpRight } from 'lucide-react'
import type { ProducoesSection } from '@/features/projeto/data/producoesContent'
import { cn } from '@/lib/utils'

const colorStyles = {
  red: {
    accent: 'bg-brand-red',
    border: 'border-brand-red/40',
    hover: 'group-hover:border-brand-red group-hover:shadow-[0_12px_40px_-10px_rgba(239,50,32,0.25)]',
    button: 'bg-brand-red text-white',
  },
  amber: {
    accent: 'bg-brand-amber',
    border: 'border-brand-amber/40',
    hover: 'group-hover:border-brand-amber group-hover:shadow-[0_12px_40px_-10px_rgba(255,189,89,0.35)]',
    button: 'bg-brand-amber text-neutral-900',
  },
  yellow: {
    accent: 'bg-brand-yellow',
    border: 'border-brand-yellow/50',
    hover: 'group-hover:border-brand-yellow group-hover:shadow-[0_12px_40px_-10px_rgba(250,212,57,0.35)]',
    button: 'bg-brand-yellow text-neutral-900',
  },
  orange: {
    accent: 'bg-brand-orange',
    border: 'border-brand-orange/40',
    hover: 'group-hover:border-brand-orange group-hover:shadow-[0_12px_40px_-10px_rgba(255,145,77,0.3)]',
    button: 'bg-brand-orange text-white',
  },
}

interface ProducoesSectionCardProps {
  section: ProducoesSection
}

export function ProducoesSectionCard({ section }: ProducoesSectionCardProps) {
  const styles = colorStyles[section.color]

  return (
    <div className="h-full transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        to={section.href}
        className={cn(
          'group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-2xl border bg-card p-8 shadow-soft transition-all duration-300 md:min-h-[240px] md:p-10',
          styles.border,
          styles.hover,
        )}
      >
        <div
          className={cn('absolute top-0 left-0 h-full w-1.5 md:w-2', styles.accent)}
          aria-hidden="true"
        />

        <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
          {section.title}
        </h2>

        <span
          className={cn(
            'mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-ui text-sm font-semibold uppercase tracking-wider transition-transform group-hover:gap-3',
            styles.button,
          )}
        >
          Ver
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}
