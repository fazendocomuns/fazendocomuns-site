'use client'

import { ExternalLink } from 'lucide-react'
import type { PartnerLinkEntry } from '@/features/mais/data/linksParceirosContent'
import { cn } from '@/lib/utils'

const accentStyles = ['border-brand-orange/40', 'border-brand-red/40'] as const

interface PartnerLinkCardProps {
  partner: PartnerLinkEntry
  index: number
}

export function PartnerLinkCard({ partner, index }: PartnerLinkCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl border bg-card p-6 shadow-soft md:p-8',
        accentStyles[index % accentStyles.length],
      )}
    >
      <header>
        <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
          {partner.title}
        </h2>
        {partner.subtitle ? (
          <p className="mt-2 font-ui text-sm font-semibold uppercase tracking-widest text-brand-orange">
            {partner.subtitle}
          </p>
        ) : null}
        {partner.highlight ? (
          <p className="mt-4 font-heading text-lg font-semibold leading-snug text-foreground md:text-xl">
            {partner.highlight}
          </p>
        ) : null}
      </header>

      {partner.description ? (
        <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
          {partner.description}
        </p>
      ) : null}

      <ul className="mt-6 space-y-3">
        {partner.links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-2 font-ui text-sm text-brand-red underline-offset-4 transition-colors hover:text-brand-orange hover:underline md:text-base"
            >
              <ExternalLink
                className="mt-0.5 size-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
              <span>{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  )
}
