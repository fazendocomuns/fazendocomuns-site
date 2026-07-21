'use client'

import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ProjetoSectionCard } from '@/features/projeto/components/ProjetoSectionCard'
import { projetoSections } from '@/features/projeto/data/projetoContent'

interface ProjetoPageProps {
  intro: {
    title: string
    subtitle: string
  }
}

export function ProjetoPage({ intro }: ProjetoPageProps) {
  return (
    <>
      <PageHero
        title={intro.title}
        subtitle={intro.subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: 'O projeto' }]}
      />

      <section className="section-padding bg-background" aria-label="Seções do projeto">
        <div className="container-app">
          <ScrollReveal>
            <p className="mx-auto mb-12 max-w-2xl text-center font-body text-base text-muted-foreground md:text-lg">
              Explore as dimensões do projeto Fazendo Comuns — pesquisa qualificada
              pelo CNPQ e FAPERJ, vinculada à UFRJ e à Secretaria Municipal de
              Educação do Rio de Janeiro.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {projetoSections.map((section, index) => (
              <ScrollReveal key={section.id} delay={index * 0.06}>
                <ProjetoSectionCard section={section} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
