'use client'

import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { MultimidiaSectionCard } from '@/features/multimidia/components/MultimidiaSectionCard'
import { multimidiaSections } from '@/features/multimidia/data/multimidiaContent'

interface MultimidiaPageProps {
  intro: {
    title: string
    subtitle: string
  }
}

export function MultimidiaPage({ intro }: MultimidiaPageProps) {
  return (
    <>
      <PageHero
        title={intro.title}
        subtitle={intro.subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: 'Multimídia' }]}
      />

      <section className="section-padding bg-background" aria-label="Seções de multimídia">
        <div className="container-app">
          <ScrollReveal>
            <p className="mx-auto mb-12 max-w-2xl text-center font-body text-base text-muted-foreground md:text-lg">
              Acesse fotos, vídeos e podcast produzidos pelo Fazendo Comuns — uma
              janela visual e sonora sobre o recreio nas escolas públicas.
            </p>
          </ScrollReveal>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {multimidiaSections.map((section, index) => (
              <ScrollReveal key={section.id} delay={index * 0.1}>
                <MultimidiaSectionCard section={section} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
