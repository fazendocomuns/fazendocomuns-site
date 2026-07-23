import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { ProfessoresFalamSectionCard } from '@/features/professores-falam/components/ProfessoresFalamSectionCard'
import { professoresFalamContent as professoresFalamFallback } from '@/features/professores-falam/data/professoresFalamContent'

interface ProfessoresFalamPageProps {
  content: typeof professoresFalamFallback
}

export function ProfessoresFalamPage({ content }: ProfessoresFalamPageProps) {
  const { heading, subtitle, heroImage, heroImageAlt, sections } = content

  return (
    <>
      <PageHero
        title={heading}
        subtitle={subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: heading }]}
      />

      <section className="section-padding bg-background" aria-label="Reportagem">
        <div className="container-app">
          <ScrollReveal>
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-muted shadow-medium md:aspect-[2.5/1]">
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                sizes="100vw"
                quality={75}
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        className="section-padding bg-muted"
        aria-label="Depoimentos de professoras e professores"
      >
        <div className="container-app mx-auto max-w-6xl flex flex-col gap-14 lg:gap-20">
          {sections.map((section, index) => (
            <ProfessoresFalamSectionCard
              key={section.id}
              section={section}
              index={index}
            />
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
