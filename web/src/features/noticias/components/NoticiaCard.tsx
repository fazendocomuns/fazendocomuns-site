import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'
import type { Noticia } from '@/features/noticias/data/noticiasContent'

interface NoticiaCardProps {
  noticia: Noticia
}

export function NoticiaCard({ noticia }: NoticiaCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-medium">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        <div className="relative h-44 shrink-0 overflow-hidden sm:h-auto sm:w-44 md:w-52">
          <Image
            src={noticia.heroImage}
            alt={noticia.listImageAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 767px) 176px, 208px"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <time
            dateTime={noticia.date}
            className="font-ui text-xs uppercase tracking-wider text-muted-foreground"
          >
            {format(parseISO(noticia.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </time>
          <h2 className="mt-2 font-heading text-lg font-bold leading-snug transition-colors group-hover:text-brand-orange md:text-xl">
            <Link to={`/noticias/${noticia.slug}`}>{noticia.title}</Link>
          </h2>
          <p className="mt-3 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-muted-foreground md:text-base">
            {noticia.excerpt}
          </p>
          <Link
            to={`/noticias/${noticia.slug}`}
            className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-brand-orange transition-all group-hover:gap-2 hover:underline"
          >
            Ler mais
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
