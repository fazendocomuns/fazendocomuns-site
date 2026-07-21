'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { ConsultantCard } from '@/features/projeto/components/ConsultantCard'
import type { Consultant } from '@/features/projeto/data/consultoresContent'
import { consultoresContent } from '@/features/projeto/data/consultoresContent'

interface ConsultoresPageProps {
  consultants: Consultant[]
}

export function ConsultoresPage({ consultants }: ConsultoresPageProps) {
  const { title, subtitle } = consultoresContent

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

      <section className="section-padding bg-background" aria-label="Consultores do projeto">
        <div className="container-app">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {consultants.map((consultant, index) => (
              <ScrollReveal key={consultant.id} delay={index * 0.05} className="h-full">
                <ConsultantCard consultant={consultant} />
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
