import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { SociedadeFalamEntry } from '@/features/sociedade-falam/data/sociedadeFalamContent'
import { proseParagraph } from '@/lib/typography'
import { cn } from '@/lib/utils'

const accentColors = [
  'border-brand-amber/40 bg-brand-amber/5',
  'border-brand-red/40 bg-brand-red/5',
  'border-brand-orange/40 bg-brand-orange/5',
  'border-brand-yellow/50 bg-brand-yellow/10',
] as const

const badgeColors = [
  'bg-brand-amber text-neutral-900',
  'bg-brand-red text-white',
  'bg-brand-orange text-white',
  'bg-brand-yellow text-neutral-900',
] as const

interface SociedadeFalamEntryCardProps {
  entry: SociedadeFalamEntry
  index: number
}

export function SociedadeFalamEntryCard({ entry, index }: SociedadeFalamEntryCardProps) {
  const colorIndex = index % accentColors.length
  const [titleLine, ...bodyLines] = entry.body.split('\n')
  const hasTitleLine = entry.number === 9

  return (
    <ScrollReveal delay={index * 0.05}>
      <article
        className={cn(
          'relative overflow-hidden rounded-2xl border p-6 shadow-soft md:p-8',
          accentColors[colorIndex],
        )}
      >
        <div className="flex gap-5 md:gap-6">
          <span
            className={cn(
              'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-heading text-base font-bold md:h-12 md:w-12 md:text-lg',
              badgeColors[colorIndex],
            )}
            aria-hidden="true"
          >
            {entry.number}
          </span>

          <div className="min-w-0 flex-1">
            {hasTitleLine ? (
              <>
                <h2 className="font-heading text-lg font-bold text-foreground md:text-xl">
                  {titleLine}
                </h2>
                <p className={cn('mt-3', proseParagraph)}>
                  {bodyLines.join(' ')}
                </p>
              </>
            ) : (
              <p className={proseParagraph}>
                {entry.body}
              </p>
            )}

            {entry.excerpt ? (
              <blockquote className="mt-4 border-l-4 border-brand-orange/50 pl-4 font-body text-sm leading-relaxed text-muted-foreground italic md:text-base">
                {entry.excerpt}
              </blockquote>
            ) : null}

            {entry.followUp ? (
              <p className={cn('mt-4', proseParagraph)}>
                {entry.followUp}
              </p>
            ) : null}

            <ul className="mt-5 space-y-2 border-t border-border/50 pt-5">
              {entry.references.map((reference) => (
                <li
                  key={reference}
                  className="font-body text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                  ○ {reference}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}
