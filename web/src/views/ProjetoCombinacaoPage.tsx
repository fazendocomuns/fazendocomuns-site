'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, Download } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { projetoCombinacaoContent as projetoCombinacaoFallback } from '@/features/projeto-combinacao/data/projetoCombinacaoContent'
import { proseParagraph, proseParagraphFlush, proseParagraphSm, proseStack } from '@/lib/typography'
import { cn } from '@/lib/utils'

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className={proseStack}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={proseParagraph}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}

interface ProjetoCombinacaoPageProps {
  content: typeof projetoCombinacaoFallback
}

export function ProjetoCombinacaoPage({ content: projetoCombinacaoContent }: ProjetoCombinacaoPageProps) {

  const {
    title,
    apresentacao,
    books,
    dimensions,
    recreioImage,
    relatedPublication,
    references,
  } = projetoCombinacaoContent

  const { intro, capa, metodologia, livretosPreview } = apresentacao

  return (
    <>
      <PageHero
        title={title}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: title }]}
      />

      <section className="section-padding bg-background" aria-label="Apresentação do projeto">
        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <Paragraphs paragraphs={intro} />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <figure className="mb-10 mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
              <img src={capa.url} alt={capa.alt} className="w-full object-contain" loading="lazy" />
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Paragraphs paragraphs={metodologia} />
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {livretosPreview.map((image) => (
                <figure
                  key={image.url}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {books.map((book, bookIndex) => (
        <section
          key={book.id}
          className={cn(
            'section-padding',
            bookIndex % 2 === 0 ? 'bg-muted' : 'bg-background',
          )}
          aria-labelledby={`${book.id}-title`}
        >
          <div className="container-app mx-auto max-w-3xl">
            <ScrollReveal delay={bookIndex * 0.04}>
              <h2
                id={`${book.id}-title`}
                className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
              >
                {book.title}
              </h2>

              <div className="mt-8 space-y-8">
                <Paragraphs paragraphs={book.paragraphs} />

                <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                  <img
                    src={book.image.url}
                    alt={book.image.alt}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                </figure>
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      <section
        className="bg-background pt-0 pb-[var(--spacing-section)]"
        aria-label="Dimensões investigadas"
      >        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <p className={proseParagraph}>{dimensions.intro}</p>

            <ul className="mt-6 space-y-3 border-l-2 border-brand-amber/50 pl-6">
              {dimensions.items.map((item) => (
                <li key={item} className={cn(proseParagraphFlush, 'md:leading-relaxed')}>
                  {item}
                </li>
              ))}
            </ul>

            <p className={cn('mt-8', proseParagraph)}>{dimensions.outro}</p>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-muted"
        aria-label="Livretos do Projeto CombinAção"
      >
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="mx-auto w-full max-w-[200px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium sm:max-w-[240px] lg:mx-0 lg:max-w-[260px]">
                <img
                  src={recreioImage.url}
                  alt={recreioImage.alt}
                  className="w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="flex min-w-0 flex-col items-start">
                <p className="font-ui text-sm font-semibold uppercase tracking-widest text-brand-orange">
                  Publicação
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  {relatedPublication.title}
                </h2>
                {relatedPublication.subtitle ? (
                  <p className="mt-3 font-body text-base text-muted-foreground md:text-lg">
                    {relatedPublication.subtitle}
                  </p>
                ) : null}
                <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                  {relatedPublication.teaser}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={relatedPublication.href}>Acessar publicação</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={relatedPublication.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      {relatedPublication.downloadLabel}
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background" aria-label="Referências bibliográficas">
        <div className="container-app mx-auto max-w-4xl">
          <ScrollReveal>
            <h2 className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
              Referências Bibliográficas
            </h2>

            <ol className="mt-8 space-y-4 border-l-2 border-brand-amber/40 pl-6 md:pl-8">
              {references.map((entry, index) => (
                <li key={index} className={cn(proseParagraphSm, 'indent-0')}>
                  {entry}
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app mx-auto max-w-3xl border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar ao início
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
