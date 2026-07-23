import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowRight, BookOpen } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import type { Livro } from '@/features/livros/types'

interface LivroCardProps {
  livro: Livro
  index: number
}

export function LivroCard({ livro, index }: LivroCardProps) {
  const excerpt = livro.summary[0] ?? livro.seo.description

  return (
    <ScrollReveal delay={Math.min(index * 0.08, 0.4)}>
      <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium motion-reduce:transform-none">
        <div className="flex min-w-0 flex-col sm:flex-row sm:items-stretch">
        <Link
          href={`/livros/${livro.slug}`}
          className="relative mx-auto aspect-[501/735] w-full max-w-[220px] shrink-0 overflow-hidden bg-muted sm:mx-0 sm:aspect-auto sm:min-h-[16rem] sm:w-44 sm:max-w-none md:w-52"
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            src={livro.cover}
            alt=""
            fill
            sizes="(max-width: 639px) 220px, (max-width: 767px) 176px, 208px"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
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
      </article>
    </ScrollReveal>
  )
}
