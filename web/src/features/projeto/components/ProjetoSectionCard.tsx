import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowUpRight } from 'lucide-react'
import type { ProjetoSection } from '@/features/projeto/data/projetoContent'
import { cn } from '@/lib/utils'

const colorStyles = {
  red: {
    bg: 'bg-brand-red/10',
    icon: 'bg-brand-red text-white',
    hover: 'group-hover:border-brand-red group-hover:shadow-[0_8px_32px_-8px_rgba(239,50,32,0.25)]',
  },
  amber: {
    bg: 'bg-brand-amber/15',
    icon: 'bg-brand-amber text-neutral-900',
    hover: 'group-hover:border-brand-amber group-hover:shadow-[0_8px_32px_-8px_rgba(255,189,89,0.35)]',
  },
  yellow: {
    bg: 'bg-brand-yellow/20',
    icon: 'bg-brand-yellow text-neutral-900',
    hover: 'group-hover:border-brand-yellow group-hover:shadow-[0_8px_32px_-8px_rgba(250,212,57,0.35)]',
  },
  orange: {
    bg: 'bg-brand-orange/15',
    icon: 'bg-brand-orange text-white',
    hover: 'group-hover:border-brand-orange group-hover:shadow-[0_8px_32px_-8px_rgba(255,145,77,0.3)]',
  },
}

interface ProjetoSectionCardProps {
  section: ProjetoSection
}

export function ProjetoSectionCard({ section }: ProjetoSectionCardProps) {
  const Icon = section.icon
  const styles = colorStyles[section.color]

  return (
    <div className="h-full transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none">
      <Link
        to={section.href}
        className={cn(
          'group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all duration-300 md:p-8',
          styles.hover,
        )}
      >
        <div
          className={cn(
            'mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110',
            styles.icon,
          )}
        >
          <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
        </div>

        <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">
          {section.title}
        </h2>

        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
          {section.description}
        </p>

        <span className="mt-6 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-brand-red transition-colors group-hover:gap-2.5">
          Acessar
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </div>
  )
}
