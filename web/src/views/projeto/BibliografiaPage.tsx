'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { bibliografiaContent as bibliografiaFallback } from '@/features/projeto/data/bibliografiaContent'
import { cn } from '@/lib/utils'

interface BibliografiaPageProps {
  content: typeof bibliografiaFallback
}

export function BibliografiaPage({ content }: BibliografiaPageProps) {
  const { title, intro, sections } = content

  return (
    <>
      <PageHero
        title={title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'O projeto', href: '/projeto' },
          { label: title },
        ]}
      />

      <section className="section-padding bg-background" aria-label="Bibliografia da pesquisa">
        <div className="container-app mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
              {intro}
            </h2>
          </ScrollReveal>

          {sections.map((section, sectionIndex) => (
            <ScrollReveal key={section.id} delay={sectionIndex * 0.08}>
              <div className={cn('mt-12', sectionIndex === 0 && 'mt-10')}>
                <h3
                  id={`${section.id}-title`}
                  className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
                >
                  {section.title}
                </h3>

                <ol className="mt-6 space-y-4 border-l-2 border-brand-amber/40 pl-6 md:pl-8">
                  {section.entries.map((entry, index) => (
                    <li
                      key={`${section.id}-${index}`}
                      className="font-body text-sm leading-relaxed text-foreground md:text-base md:leading-loose"
                    >
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
