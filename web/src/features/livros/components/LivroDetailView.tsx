'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  Users,
} from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import type { Livro } from '@/features/livros/types'

interface LivroDetailViewProps {
  livro: Livro
}

export function LivroDetailView({ livro }: LivroDetailViewProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      <header className="border-b border-border/40 bg-gradient-hero paper-texture">
        <div className="container-app py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 font-ui text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-red">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/livros" className="transition-colors hover:text-brand-red">
                  Livros
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{livro.title}</li>
            </ol>
          </nav>

          <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(240px,320px)_1fr] lg:items-start lg:gap-14">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
              className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none"
            >
              <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium">
                <img
                  src={livro.cover}
                  alt={livro.coverAlt}
                  className="aspect-[501/735] w-full object-cover"
                  width={501}
                  height={735}
                />
              </figure>
            </motion.div>

            <div className="min-w-0">
              <p className="font-ui text-sm font-semibold uppercase tracking-widest text-brand-red">
                {livro.categoryLabel ?? 'Livro'}
              </p>
              <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {livro.title}
              </h1>
              {livro.subtitle ? (
                <p className="mt-4 font-serif-accent text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {livro.subtitle}
                </p>
              ) : null}

              <dl className="mt-8 space-y-4">
                <div>
                  <dt className="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Users className="size-4 text-brand-orange" aria-hidden="true" />
                    Autoria
                  </dt>
                  <dd className="mt-2 font-body text-sm leading-relaxed text-foreground md:text-base">
                    {livro.authors.join(' · ')}
                  </dd>
                </div>

                {livro.organizers?.length ? (
                  <div>
                    <dt className="font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Organização
                    </dt>
                    <dd className="mt-2 font-body text-sm leading-relaxed text-foreground md:text-base">
                      {livro.organizers.join(' · ')}
                    </dd>
                  </div>
                ) : null}

                {livro.datePublished ? (
                  <div>
                    <dt className="flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <Calendar className="size-4 text-brand-amber" aria-hidden="true" />
                      Publicação
                    </dt>
                    <dd className="mt-2 font-body text-sm text-foreground md:text-base">
                      {livro.datePublished}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <a href="#leitura-do-livro">
                    <BookOpen className="size-4" aria-hidden="true" />
                    Ler online
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href={livro.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {livro.downloadLabel ?? 'Download'}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section-padding bg-background" aria-labelledby="resumo-livro">
        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <h2
              id="resumo-livro"
              className="font-heading text-2xl font-bold text-foreground md:text-3xl"
            >
              Sobre o livro
            </h2>
            <div className="mt-6 space-y-5">
              {livro.summary.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-body text-base leading-relaxed text-foreground md:text-lg md:leading-loose"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="leitura-do-livro"
        className="section-padding scroll-mt-24 bg-muted"
        aria-labelledby="leitura-livro-title"
      >
        <div className="container-app">
          <ScrollReveal>
            <h2
              id="leitura-livro-title"
              className="font-heading text-2xl font-bold text-foreground md:text-3xl"
            >
              Leitura online
            </h2>
            <p className="mt-3 max-w-3xl font-body text-sm text-muted-foreground md:text-base">
              Leia o livro diretamente no navegador. Se preferir, utilize o botão
              de download para salvar o PDF no seu dispositivo.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
              <iframe
                title={`Leitura online — ${livro.title}`}
                src={livro.readUrl}
                className="h-[70vh] min-h-[420px] w-full bg-muted"
              />
            </div>

            <p className="mt-4 font-body text-sm text-muted-foreground">
              Problemas para visualizar?{' '}
              <a
                href={livro.readUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-red underline-offset-4 hover:underline"
              >
                Abrir o PDF em nova aba
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-background"
        aria-labelledby="informacoes-editoriais"
      >
        <div className="container-app mx-auto max-w-4xl">
          <ScrollReveal>
            <h2
              id="informacoes-editoriais"
              className="font-heading text-2xl font-bold text-foreground md:text-3xl"
            >
              Informações editoriais
            </h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {livro.editorialInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
                >
                  <dt className="font-ui text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-body text-sm leading-relaxed text-foreground md:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted" aria-labelledby="creditos-livro">
        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <h2
              id="creditos-livro"
              className="font-heading text-2xl font-bold text-foreground md:text-3xl"
            >
              Créditos
            </h2>
            <ul className="mt-8 space-y-6">
              {livro.credits.map((credit) => (
                <li key={credit.label}>
                  <h3 className="font-ui text-sm font-semibold uppercase tracking-wider text-brand-orange">
                    {credit.label}
                  </h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-foreground md:text-base">
                    {credit.names.join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {livro.relatedLinks?.length ? (
        <section className="section-padding bg-background" aria-labelledby="links-relacionados">
          <div className="container-app mx-auto max-w-3xl">
            <ScrollReveal>
              <h2
                id="links-relacionados"
                className="font-heading text-2xl font-bold text-foreground md:text-3xl"
              >
                Conteúdos relacionados
              </h2>
              <ul className="mt-8 space-y-4">
                {livro.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group block rounded-2xl border border-border/60 bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-medium"
                    >
                      <span className="inline-flex items-center gap-2 font-heading text-lg font-bold text-foreground group-hover:text-brand-red">
                        {link.label}
                        <ExternalLink className="size-4" aria-hidden="true" />
                      </span>
                      {link.description ? (
                        <p className="mt-2 font-body text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      ) : null}

      <section className="section-padding bg-muted">
        <div className="container-app">
          <Button variant="outline" asChild>
            <Link href="/livros">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para Livros
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
