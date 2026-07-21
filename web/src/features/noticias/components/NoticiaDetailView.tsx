'use client'

import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NoticiaAudioPlayer } from '@/features/noticias/components/NoticiaAudioPlayer'
import { ShareButtons } from '@/components/shared/ShareButtons'
import type { Noticia } from '@/features/noticias/data/noticiasContent'
import { proseParagraph, proseStack } from '@/lib/typography'
import { cn } from '@/lib/utils'

interface NoticiaDetailViewProps {
  noticia: Noticia
}

export function NoticiaDetailView({ noticia }: NoticiaDetailViewProps) {
  return (
    <>
      <PageHero
        title={noticia.title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Notícias', href: '/noticias' },
          { label: noticia.title },
        ]}
      />

      <article className="section-padding bg-background" aria-label={noticia.title}>
        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="orange" className="font-ui uppercase tracking-wider">
                Notícia
              </Badge>
              <time
                dateTime={noticia.date}
                className="font-ui text-sm text-muted-foreground"
              >
                {format(parseISO(noticia.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </time>
            </div>

            <figure className="mt-8 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-soft">
              <img
                src={noticia.heroImage}
                alt={noticia.listImageAlt}
                className="w-full object-contain"
                loading="lazy"
              />
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className={cn('mt-10', proseStack)}>
              {noticia.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={proseParagraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {noticia.audio ? (
            <ScrollReveal delay={0.12}>
              <div className="mt-10">
                <NoticiaAudioPlayer audio={noticia.audio} />
              </div>
            </ScrollReveal>
          ) : null}

          {noticia.relatedLink ? (
            <ScrollReveal delay={0.14}>
              <div className="mt-8">
                <Button className="bg-brand-orange hover:bg-brand-orange/90" asChild>
                  <Link href={noticia.relatedLink.href}>
                    {noticia.relatedLink.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          ) : null}

          <ScrollReveal delay={0.16}>
            <ShareButtons className="mt-12" title={noticia.title} text={noticia.excerpt} />
          </ScrollReveal>

          <div className="mt-12 border-t border-border pt-8">
            <Button variant="outline" asChild>
              <Link href="/noticias">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Voltar para Notícias
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
