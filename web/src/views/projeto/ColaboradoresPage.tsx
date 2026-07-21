'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { TeamMemberCard } from '@/features/projeto/components/TeamMemberCard'
import type { TeamMember } from '@/features/projeto/data/equipeContent'
import { colaboradoresContent } from '@/features/projeto/data/colaboradoresContent'

interface ColaboradoresPageProps {
  members: TeamMember[]
}

export function ColaboradoresPage({ members }: ColaboradoresPageProps) {
  const { title, subtitle } = colaboradoresContent

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

      <section className="section-padding bg-background" aria-label="Colaboradores do projeto">
        <div className="container-app">
          <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.08} className="h-full">
                <TeamMemberCard member={member} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
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
