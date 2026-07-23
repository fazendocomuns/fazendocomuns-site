import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { EventPanelVideo } from '@/features/eventos/components/EventPanelVideo'
import type { EventPanel } from '@/features/eventos/data/asCriancasFalamContent'
import { proseParagraph } from '@/lib/typography'
import { cn } from '@/lib/utils'

const colorStyles = {
  amber: {
    badge: 'bg-brand-amber text-neutral-900',
    border: 'border-brand-amber/40',
    accent: 'bg-brand-amber',
  },
  red: {
    badge: 'bg-brand-red text-white',
    border: 'border-brand-red/40',
    accent: 'bg-brand-red',
  },
  orange: {
    badge: 'bg-brand-orange text-white',
    border: 'border-brand-orange/40',
    accent: 'bg-brand-orange',
  },
  yellow: {
    badge: 'bg-brand-yellow text-neutral-900',
    border: 'border-brand-yellow/50',
    accent: 'bg-brand-yellow',
  },
}

interface EventPanelSectionProps {
  panel: EventPanel
  index: number
}

export function EventPanelSection({ panel, index }: EventPanelSectionProps) {
  const styles = colorStyles[panel.color]
  const panelNumber = String(index + 1).padStart(2, '0')
  const videoFirst = index % 2 === 1

  return (
    <ScrollReveal delay={index * 0.08}>
      <article className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <div
          className={cn(
            'relative flex flex-col overflow-hidden rounded-2xl border bg-card p-6 shadow-soft md:p-8 lg:p-10',
            styles.border,
            videoFirst && 'lg:order-2',
          )}
        >
          <div
            className={cn('absolute top-0 left-0 h-full w-1.5 md:w-2', styles.accent)}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-6">
            <span
              className={cn(
                'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-lg font-bold md:h-14 md:w-14 md:text-xl',
                styles.badge,
              )}
            >
              {panelNumber}
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl lg:text-3xl">
                {panel.title}
              </h2>
              <p className={cn('mt-4 text-muted-foreground', proseParagraph)}>
                {panel.description}
              </p>
            </div>
          </div>
        </div>

        <div className={cn('flex flex-col', videoFirst && 'lg:order-1')}>
          <EventPanelVideo
            title={panel.videoTitle ?? panel.title}
            color={panel.color}
            videoUrl={panel.videoUrl}
          />
        </div>
      </article>
    </ScrollReveal>
  )
}
