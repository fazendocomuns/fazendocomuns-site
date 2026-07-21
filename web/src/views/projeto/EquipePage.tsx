'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { TeamMemberCard } from '@/features/projeto/components/TeamMemberCard'
import type { TeamGroup } from '@/features/projeto/data/equipeContent'
import { equipeContent } from '@/features/projeto/data/equipeContent'
import { cn } from '@/lib/utils'

interface EquipePageProps {
  groups: TeamGroup[]
}

export function EquipePage({ groups }: EquipePageProps) {
  const { title, subtitle } = equipeContent

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'O projeto', href: '/projeto' },
          { label: title },
        ]}
      />

      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          className={cn(
            'section-padding',
            groupIndex % 2 === 0 ? 'bg-background' : 'bg-muted',
          )}
          aria-labelledby={`${group.id}-title`}
        >
          <div className="container-app">
            <ScrollReveal>
              <h2
                id={`${group.id}-title`}
                className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
              >
                {group.title}
              </h2>
            </ScrollReveal>

            <div
              className={cn(
                'mt-8',
                group.id === 'coordenacao'
                  ? 'mx-auto max-w-5xl'
                  : 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
              )}
            >
              {group.members.map((member, index) => (
                <ScrollReveal
                  key={member.id}
                  delay={group.id === 'coordenacao' ? 0.1 : index * 0.04}
                  className={group.id === 'coordenacao' ? undefined : 'h-full'}
                >
                  <TeamMemberCard
                    member={member}
                    featured={group.id === 'coordenacao'}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding bg-background">
        <div className="container-app border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/projeto">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para O projeto
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
