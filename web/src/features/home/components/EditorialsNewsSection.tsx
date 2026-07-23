import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import {
  editoriaisHomeImage,
  type HomeFeaturedEditorial,
  type HomeNewsItem,
} from '@/features/home/data/homeContent'

function NewsHomeCard({ news }: { news: HomeNewsItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-medium">
      <div className="flex min-w-0 flex-col min-[480px]:flex-row min-[480px]:items-stretch">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted min-[480px]:aspect-auto min-[480px]:w-28 min-[480px]:min-h-[7.5rem] sm:w-32 sm:min-h-[8.5rem] md:w-36 md:min-h-[9.5rem]">
          <Image
            src={news.image}
            alt={news.imageAlt}
            fill
            sizes="(max-width: 480px) 100vw, 144px"
            quality={60}
            className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </div>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <time
            dateTime={news.date}
            className="block font-ui text-[0.6875rem] uppercase tracking-wider text-muted-foreground sm:text-xs"
          >
            {format(parseISO(news.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </time>
          <h4 className="mt-2 break-words font-heading text-[0.9375rem] font-semibold leading-snug transition-colors group-hover:text-brand-red sm:text-base md:text-lg">
            {news.title}
          </h4>
          <p className="mt-2 line-clamp-2 break-words font-body text-sm text-muted-foreground sm:line-clamp-3">
            {news.excerpt}
          </p>
          <Link
            href={`/noticias/${news.slug}`}
            className="mt-3 inline-flex items-center gap-1 font-ui text-sm font-medium text-brand-red hover:underline"
          >
            Ler mais
            <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

interface EditorialsNewsSectionProps {
  featuredEditorial: HomeFeaturedEditorial
  newsItems: HomeNewsItem[]
}

export function EditorialsNewsSection({
  featuredEditorial,
  newsItems,
}: EditorialsNewsSectionProps) {
  return (
    <section
      className="overflow-x-clip bg-background pt-[var(--spacing-section)] pb-28 sm:pb-36 md:pb-44"
      aria-labelledby="editorials-news-title"
    >
      <div className="container-app min-w-0">
        <h2 id="editorials-news-title" className="sr-only">
          Editoriais e Notícias
        </h2>

        <div className="grid min-w-0 gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          <ScrollReveal direction="up" className="min-w-0">
            <article className="flex min-w-0 flex-col">
              <div className="mb-4 flex justify-center sm:mb-6 lg:justify-start">
                <Image
                  src={editoriaisHomeImage}
                  alt=""
                  className="h-24 w-auto max-w-full object-contain sm:h-32 md:h-40"
                  width={160}
                  height={160}
                  sizes="160px"
                  quality={60}
                  aria-hidden="true"
                />
              </div>

              <h3 className="text-center font-heading text-2xl font-bold text-brand-red sm:text-3xl md:text-4xl lg:text-left">
                Editoriais
              </h3>

              <div className="mt-4 min-w-0 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:mt-6 sm:p-6 md:p-8">
                <h4 className="break-words font-heading text-lg font-bold leading-snug sm:text-xl md:text-2xl">
                  {featuredEditorial.title}
                </h4>
                <p className="mt-3 break-words font-body text-sm leading-relaxed text-justify text-muted-foreground indent-[1.5em] sm:mt-4 sm:text-base">
                  {featuredEditorial.excerpt}
                </p>
                <Link
                  href={`/editoriais/${featuredEditorial.slug}`}
                  className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-brand-red transition-colors hover:underline sm:mt-5"
                >
                  Leia mais
                  <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                </Link>
              </div>

              <Button className="mt-4 w-full sm:mt-6 sm:w-auto" asChild>
                <Link href="/editoriais">
                  Ver todos os editoriais
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </Button>
            </article>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1} className="min-w-0">
            <div className="min-w-0">
              <h3 className="text-center font-heading text-2xl font-bold text-brand-orange sm:text-3xl md:text-4xl lg:text-left">
                Notícias
              </h3>

              <ul className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                {newsItems.map((news) => (
                  <li key={news.id} className="min-w-0">
                    <NewsHomeCard news={news} />
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="mt-4 w-full sm:mt-6 sm:w-auto" asChild>
                <Link href="/noticias">
                  Ver todas as notícias
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
