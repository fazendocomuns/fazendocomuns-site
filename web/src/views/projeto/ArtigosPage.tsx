'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { artigosContent as artigosFallback } from '@/features/projeto/data/artigosContent'
import { proseParagraphSm } from '@/lib/typography'
import { cn } from '@/lib/utils'

interface ArtigosPageProps {
  content: typeof artigosFallback
}

export function ArtigosPage({ content }: ArtigosPageProps) {
  const { title, entries } = content

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

      <section className="section-padding bg-background" aria-label="Artigos científicos">
        <div className="container-app mx-auto max-w-4xl">
          <ScrollReveal>
            <ol
              className="list-none space-y-4 border-l-2 border-brand-amber/40 pl-6 md:pl-8"
              aria-label="Lista de artigos"
            >
              {entries.map((entry, index) => (
                <li
                  key={index}
                  className={cn('relative indent-0', proseParagraphSm)}
                >
                  <span
                    className="absolute -left-6 top-0.5 font-ui text-xs font-semibold text-brand-red md:-left-8"
                    aria-hidden="true"
                  >
                    {index + 1}.
                  </span>
                  {entry.citation}
                  {entry.url ? (
                    <>
                      {' '}
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-brand-red underline-offset-2 hover:underline"
                      >
                        Acessar
                        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="sr-only">(abre em nova aba)</span>
                      </a>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </ScrollReveal>
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
