'use client'

import { ScrollReveal } from '@/components/shared/ScrollReveal'
import {
  ComicThoughtBubble,
  type BubbleTail,
} from '@/features/criancas-falam/components/ComicThoughtBubble'
import type { ProfessoresFalamSection } from '@/features/professores-falam/data/professoresFalamContent'
import { proseParagraph } from '@/lib/typography'
import { cn } from '@/lib/utils'

const accentBar = {
  amber: 'bg-brand-amber',
  red: 'bg-brand-red',
  orange: 'bg-brand-orange',
}

interface ProfessoresFalamSectionCardProps {
  section: ProfessoresFalamSection
  index: number
}

export function ProfessoresFalamSectionCard({
  section,
  index,
}: ProfessoresFalamSectionCardProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <article className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-medium">
        <div className="relative px-6 py-8 md:px-10 md:py-10">
          <div
            className={cn('absolute top-0 left-0 h-1 w-full md:h-1.5', accentBar[section.color])}
            aria-hidden="true"
          />
          <h2 className="font-heading text-2xl font-bold leading-snug text-foreground md:text-3xl">
            {section.title}
          </h2>
          <p className={cn('mt-4 w-full', proseParagraph)}>
            {section.description}
          </p>
        </div>

        <div
          className="relative overflow-hidden border-t border-border/40 bg-neutral-900 px-5 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14"
          aria-label={`Depoimentos: ${section.title}`}
        >
          <p className="mb-8 text-center font-ui text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            O que dizem
          </p>

          <div
            className={cn(
              'relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10',
              section.layout === 'scattered' &&
                'md:grid md:grid-cols-2 md:items-start md:gap-x-8 md:gap-y-10 lg:gap-x-12',
              section.layout === 'diagonal' &&
                'md:flex-row md:flex-wrap md:items-stretch md:justify-center md:gap-8 lg:gap-10',
            )}
          >
            {section.quotes.map((item, quoteIndex) => (
              <ComicThoughtBubble
                key={`${section.id}-${quoteIndex}`}
                quote={item.text}
                tail={item.tail as BubbleTail}
                align="left"
                size={
                  item.size ??
                  (item.text.length > 180 || (section.layout === 'diagonal' && quoteIndex === 0)
                    ? 'lg'
                    : 'md')
                }
                className={cn(
                  'w-full max-w-xl',
                  item.positionClass,
                  section.layout === 'scattered' &&
                    quoteIndex % 2 === 1 &&
                    'md:justify-self-end',
                  section.layout === 'scattered' &&
                    (item.size === 'lg' || item.text.length > 200) &&
                    'md:col-span-2 md:max-w-3xl md:justify-self-center',
                  section.layout === 'diagonal' &&
                    quoteIndex === 0 &&
                    'md:max-w-2xl md:flex-[1_1_55%]',
                  section.layout === 'diagonal' &&
                    quoteIndex === 1 &&
                    'md:max-w-md md:flex-[1_1_40%] md:self-end',
                  section.layout === 'diagonal' &&
                    quoteIndex === 2 &&
                    'md:max-w-lg md:basis-full md:justify-self-center',
                )}
              />
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}
