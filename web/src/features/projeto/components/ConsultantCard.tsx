'use client'

import Image from 'next/image'
import { LattesIcon, LinkedInIcon } from '@/components/shared/AcademicSocialIcons'
import type { Consultant } from '@/features/projeto/data/consultoresContent'
import { cn } from '@/lib/utils'

interface ConsultantCardProps {
  consultant: Consultant
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={cn(
        'group inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-muted text-foreground',
        'transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
      )}
    >
      {children}
    </a>
  )
}

function linkedInHref(name: string, url?: string) {
  const trimmed = url?.trim()
  if (trimmed) return trimmed
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(name)}`
}

function lattesHref(name: string, url?: string) {
  const trimmed = url?.trim()
  if (trimmed) return trimmed
  return `https://www.google.com/search?q=${encodeURIComponent(`${name} site:lattes.cnpq.br`)}`
}

export function ConsultantCard({ consultant }: ConsultantCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={consultant.image}
          alt={consultant.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          quality={60}
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
          {consultant.name}
        </h3>

        <ul className="mt-3 space-y-2">
          {consultant.roles.map((role) => (
            <li
              key={role}
              className="flex gap-2 font-body text-sm leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-orange"
                aria-hidden="true"
              />
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 border-t border-border/60 pt-4 mt-5">
          <SocialLink
            href={linkedInHref(consultant.name, consultant.linkedin)}
            label={`LinkedIn de ${consultant.name}`}
          >
            <LinkedInIcon className="size-[1.125rem]" />
          </SocialLink>
          <SocialLink
            href={lattesHref(consultant.name, consultant.lattes)}
            label={`Currículo Lattes de ${consultant.name}`}
          >
            <LattesIcon className="size-[1.125rem]" />
          </SocialLink>
        </div>
      </div>
    </article>
  )
}
