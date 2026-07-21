'use client'

import type { TeamMember } from '@/features/projeto/data/equipeContent'

interface TeamMemberCardProps {
  member: TeamMember
  featured?: boolean
}

export function TeamMemberCard({ member, featured = false }: TeamMemberCardProps) {
  if (featured) {
    return (
      <article className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[minmax(240px,320px)_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted lg:aspect-auto lg:min-h-full">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
            <h3 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              {member.name}
            </h3>
            {member.bio && (
              <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground md:text-base md:leading-loose">
                {member.bio}
              </p>
            )}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-heading text-lg font-bold leading-snug text-foreground">
          {member.name}
        </h3>

        {member.roles.length > 0 && (
          <ul className="mt-3 space-y-2">
            {member.roles.map((role) => (
              <li
                key={role}
                className="flex gap-2 font-body text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-amber"
                  aria-hidden="true"
                />
                {role}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
