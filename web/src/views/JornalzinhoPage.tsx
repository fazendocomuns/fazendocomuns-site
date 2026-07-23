import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { jornalzinhoContent as jornalzinhoFallback } from '@/features/jornalzinho/data/jornalzinhoContent'

interface JornalzinhoPageProps {
  content: typeof jornalzinhoFallback
}

export function JornalzinhoPage({ content }: JornalzinhoPageProps) {
  const { heading, subtitle, intro, relatedPublication } = content

  return (
    <>
      <PageHero
        title={heading}
        subtitle={subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: heading }]}
      />

      <section className="section-padding bg-background" aria-labelledby="sobre-jornalzinho">
        <div className="container-app mx-auto max-w-3xl">
          <ScrollReveal>
            <h2
              id="sobre-jornalzinho"
              className="font-heading text-2xl font-bold text-foreground md:text-3xl"
            >
              Sobre a iniciativa
            </h2>
            <div className="mt-6 space-y-5">
              {intro.map((paragraph) => (
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
        className="section-padding bg-muted"
        aria-label="Publicação do Jornalzinho"
      >
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium lg:max-w-none">
                <Image
                  src={relatedPublication.cover}
                  alt={relatedPublication.coverAlt}
                  width={501}
                  height={735}
                  sizes="(max-width: 1023px) 384px, 50vw"
                  quality={60}
                  className="h-auto w-full object-contain"
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

                <Button className="mt-8" asChild>
                  <Link href={relatedPublication.href}>Acessar publicação</Link>
                </Button>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
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
