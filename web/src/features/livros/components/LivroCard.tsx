'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Livro } from '@/features/livros/types'

interface LivroCardProps {
  livro: Livro
  index: number
}

export function LivroCard({ livro, index }: LivroCardProps) {
  const excerpt = livro.summary[0] ?? livro.seo.description

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium"
    >
      <div className="flex min-w-0 flex-col sm:flex-row sm:items-stretch">
        <Link
          href={`/livros/${livro.slug}`}
          className="relative mx-auto w-full max-w-[220px] shrink-0 overflow-hidden bg-muted sm:mx-0 sm:max-w-none sm:w-44 md:w-52"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={livro.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[501/735] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-auto sm:h-full sm:min-h-[16rem]"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="amber" className="font-ui uppercase tracking-wider">
              {livro.categoryLabel ?? 'Livro'}
            </Badge>
            {livro.datePublished ? (
              <span className="font-ui text-xs uppercase tracking-wider text-muted-foreground">
                {livro.datePublished}
              </span>
            ) : null}
          </div>

          <h2 className="mt-4 font-heading text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-brand-red md:text-2xl lg:text-3xl">
            <Link href={`/livros/${livro.slug}`}>{livro.title}</Link>
          </h2>

          {livro.subtitle ? (
            <p className="mt-2 font-body text-sm font-medium text-muted-foreground md:text-base">
              {livro.subtitle}
            </p>
          ) : null}

          <p className="mt-4 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            {excerpt}
          </p>

          <p className="mt-3 font-body text-xs text-muted-foreground md:text-sm">
            {livro.authors.join(' · ')}
          </p>

          <Link
            href={`/livros/${livro.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-brand-red transition-all group-hover:gap-2.5 hover:underline"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Ler publicação
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
