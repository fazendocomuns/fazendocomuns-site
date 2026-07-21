'use client'

import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { LivroCard } from '@/features/livros/components/LivroCard'
import type { Livro } from '@/features/livros/types'

interface LivrosListViewProps {
  title: string
  subtitle: string
  livros: Livro[]
}

export function LivrosListView({ title, subtitle, livros }: LivrosListViewProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: title }]}
      />

      <section className="section-padding bg-background" aria-label="Lista de livros e publicações">
        <div className="container-app">
          <div className="mx-auto flex max-w-4xl flex-col gap-8 md:gap-10">
            {livros.map((livro, index) => (
              <ScrollReveal key={livro.slug} delay={index * 0.05}>
                <LivroCard livro={livro} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
