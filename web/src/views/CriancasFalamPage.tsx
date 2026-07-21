'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { CriancasFalamSection } from '@/features/criancas-falam/components/CriancasFalamSection'
import { criancasFalamContent as criancasFalamFallback } from '@/features/criancas-falam/data/criancasFalamContent'

interface CriancasFalamPageProps {
  content: typeof criancasFalamFallback
}

export function CriancasFalamPage({ content }: CriancasFalamPageProps) {
  const { heading, manifesto, heroImage, heroImageAlt, sections } = content

  return (
    <>
      <PageHero
        title={heading}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: heading }]}
      />

      <section className="section-padding bg-background" aria-label="Reportagem">
        <div className="container-app">
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <figure className="overflow-hidden rounded-2xl shadow-medium">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:aspect-[4/5]"
                  loading="eager"
                  decoding="async"
                />
              </figure>

              <blockquote className="relative">
                <span
                  className="font-display text-6xl leading-none text-brand-red/25 md:text-7xl"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="font-heading text-2xl font-bold leading-snug text-foreground md:text-3xl lg:text-4xl">
                  {manifesto}
                </p>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-muted"
        aria-label="Voz das crianças sobre o recreio"
      >
        <div className="container-app mx-auto max-w-6xl flex flex-col gap-14 lg:gap-20">
          {sections.map((section, index) => (
            <CriancasFalamSection key={section.id} section={section} index={index} />
          ))}
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-app border-t border-border pt-8">
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
