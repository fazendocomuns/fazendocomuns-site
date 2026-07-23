import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, Calendar, Camera, Download, MapPin } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { EventFlyerGallery } from '@/features/eventos/components/EventFlyerGallery'
import { EventPanelVideo } from '@/features/eventos/components/EventPanelVideo'
import { recrearMundosOutrosEvent as recrearMundosFallback } from '@/features/eventos/data/recrearMundosOutrosContent'
import { proseParagraph } from '@/lib/typography'

interface RecrearMundosOutrosPageProps {
  content: typeof recrearMundosFallback
}

export function RecrearMundosOutrosPage({
  content: recrearMundosOutrosEvent,
}: RecrearMundosOutrosPageProps) {
  const {
    title,
    subtitle,
    posters,
    date,
    location,
    intro,
    videoSection,
    relatedBook,
  } = recrearMundosOutrosEvent

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Eventos', href: '/eventos' },
          { label: title },
        ]}
      />

      <section className="section-padding bg-background" aria-label="Sobre o evento">
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-10 lg:grid-cols-[minmax(220px,320px)_1fr] lg:items-start lg:gap-12">
              <EventFlyerGallery posters={posters} title={title} />

              <div className="min-w-0">
                <div className="space-y-5">
                  {intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className={proseParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                <ul className="mt-8 flex flex-wrap gap-6 border-t border-border/60 pt-8">
                  <li className="flex items-center gap-2 font-body text-sm text-muted-foreground md:text-base">
                    <Calendar className="size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                    {date}
                  </li>
                  <li className="flex items-start gap-2 font-body text-sm text-muted-foreground md:text-base">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
                    {location}
                  </li>
                </ul>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-muted"
        aria-label="Vídeo sobre o projeto"
      >
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
              <EventPanelVideo
                title={videoSection.videoTitle}
                color="orange"
                videoUrl={videoSection.videoUrl}
              />

              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-brand-orange/40 bg-card p-6 shadow-soft md:p-8 lg:p-10">
                <div
                  className="absolute top-0 left-0 h-full w-1.5 bg-brand-orange md:w-2"
                  aria-hidden="true"
                />
                <h2 className="font-heading text-xl font-bold leading-snug text-foreground md:text-2xl lg:text-3xl">
                  {videoSection.title}
                </h2>
                <p className="mt-4 font-body text-base leading-relaxed text-justify text-muted-foreground indent-[1.5em] md:text-lg md:leading-loose">
                  {videoSection.description}
                </p>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-background"
        aria-label="Livro lançado no evento"
      >
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium lg:max-w-none">
                <Image
                  src={relatedBook.cover}
                  alt={relatedBook.coverAlt}
                  width={501}
                  height={735}
                  sizes="(max-width: 1023px) 384px, 50vw"
                  quality={60}
                  className="aspect-[501/735] w-full object-cover"
                  decoding="async"
                />
              </div>

              <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  {relatedBook.title}
                  <br />
                  <span className="font-normal">{relatedBook.titleLine2}</span>
                </h2>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Button asChild>
                    <a
                      href={relatedBook.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="size-4" aria-hidden="true" />
                      {relatedBook.downloadLabel}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={relatedBook.href}>Ler na página do livro</Link>
                  </Button>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted" aria-label="Registro fotográfico">
        <div className="container-app">
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/60 bg-card p-6 shadow-soft md:flex-row md:items-center md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-amber/15 text-brand-orange">
                  <Camera className="size-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">
                    Fotos do evento
                  </h2>
                  <p className="mt-2 max-w-xl font-body text-sm text-muted-foreground md:text-base">
                    Registros fotográficos do evento Em Comuns…Recrear em mundos
                    outros. Em breve.
                  </p>
                </div>
              </div>

              <Button asChild>
                <Link href="/eventos/recrear-mundos-outros/fotos">Ver fotos</Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="mt-10 border-t border-border pt-8">
            <Button variant="outline" asChild>
              <Link href="/eventos">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Voltar para Eventos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
