'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Editorial } from '@/features/editoriais/data/editoriaisContent'
import { proseParagraph, proseParagraphFlush, proseParagraphSm, proseStack } from '@/lib/typography'
import { cn } from '@/lib/utils'

const URL_PATTERN = /https?:\/\/[^\s)]+/g

function ReferenceItem({ text, index }: { text: string; index: number }) {
  const urls = [...text.matchAll(URL_PATTERN)].map((match) =>
    match[0].replace(/[.,;:]+$/u, ''),
  )
  const citation = text
    .replace(URL_PATTERN, '')
    .replace(/\s*Disponível em:\s*/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return (
    <li className={cn('relative indent-0', proseParagraphSm)}>
      <span
        className="absolute -left-6 top-0.5 font-ui text-xs font-semibold text-brand-red md:-left-8"
        aria-hidden="true"
      >
        {index + 1}.
      </span>
      {citation}
      {urls.map((url) => (
        <span key={url}>
          {' '}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-red underline-offset-2 hover:underline"
          >
            Acessar
            <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </span>
      ))}
    </li>
  )
}

interface EditorialDetailViewProps {
  editorial: Editorial
}

export function EditorialDetailView({ editorial }: EditorialDetailViewProps) {
  return (
    <>
      <PageHero
        title={editorial.title}
        subtitle={editorial.subtitle}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Editoriais', href: '/editoriais' },
          { label: editorial.title },
        ]}
      />

      <article className="section-padding bg-background">
        <div className="container-app mx-auto max-w-3xl">
          <Badge variant="red" className="mb-6 font-ui uppercase tracking-wider">
            Editorial {editorial.number}
          </Badge>

          <div className={proseStack}>
            {editorial.content.map((paragraph, index) => (
              <p key={index} className={proseParagraph}>
                {paragraph}
              </p>
            ))}
          </div>

          {editorial.closingDate ? (
            <p className={cn('mt-10', proseParagraphFlush)}>{editorial.closingDate}</p>
          ) : null}

          {editorial.signature && editorial.signature.length > 0 ? (
            <div className="mt-8 space-y-6" aria-label="Autores">
              {editorial.signature.map((author) => (
                <div key={author.name} className="space-y-0.5">
                  <p className="font-body text-base text-foreground md:text-lg">
                    {author.name}
                  </p>
                  {author.lines.map((line) => (
                    <p
                      key={line}
                      className="font-body text-sm leading-relaxed text-muted-foreground md:text-base"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : null}

          {editorial.references && editorial.references.length > 0 ? (
            <section
              className="mt-12 border-t border-border pt-8"
              aria-labelledby={editorial.referencesTitle !== false ? 'refs-title' : undefined}
              aria-label={editorial.referencesTitle === false ? 'Notas e referências' : undefined}
            >
              {editorial.referencesTitle !== false ? (
                <h2 id="refs-title" className="mb-6 font-heading text-lg font-bold">
                  {editorial.referencesTitle ?? 'Referências'}
                </h2>
              ) : null}
              <ol
                className="list-none space-y-4 border-l-2 border-brand-amber/40 pl-6 md:pl-8"
                aria-label="Notas e referências"
              >
                {editorial.references.map((ref, index) => (
                  <ReferenceItem key={index} text={ref} index={index} />
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-12 border-t border-border pt-8">
            <Button variant="outline" asChild>
              <Link href="/editoriais">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Voltar para Editoriais
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
