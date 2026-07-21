'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { livrosCapitulosContent as livrosCapitulosFallback } from '@/features/projeto/data/livrosCapitulosContent'
import { cn } from '@/lib/utils'

interface LivrosCapitulosPageProps {
  content: typeof livrosCapitulosFallback
}

export function LivrosCapitulosPage({ content }: LivrosCapitulosPageProps) {
  const { title, sections } = content

  return (
    <>
      <PageHero
        title={title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'O projeto', href: '/projeto' },
          { label: 'Produções', href: '/projeto/producoes' },
          { label: title },
        ]}
      />

      <section
        className="section-padding bg-background"
        aria-label="Livros e capítulos de livros"
      >
        <div className="container-app mx-auto max-w-4xl">
          {sections.map((section, sectionIndex) => (
            <ScrollReveal key={section.id} delay={sectionIndex * 0.08}>
              <div className={cn(sectionIndex > 0 && 'mt-14 md:mt-16')}>
                <h2
                  id={`${section.id}-title`}
                  className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
                >
                  {section.title}
                </h2>

                <ol
                  className="mt-6 list-none space-y-4 border-l-2 border-brand-amber/40 pl-6 md:pl-8"
                  aria-labelledby={`${section.id}-title`}
                >
                  {section.entries.map((entry, index) => (
                    <li
                      key={`${section.id}-${index}`}
                      className="relative font-body text-sm leading-relaxed text-foreground md:text-base md:leading-loose"
                    >
                      <span
                        className="absolute -left-6 top-0.5 font-ui text-xs font-semibold text-brand-red md:-left-8"
                        aria-hidden="true"
                      >
                        {index + 1}.
                      </span>
                      {entry}
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app mx-auto max-w-4xl border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/projeto/producoes">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para Produções
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
