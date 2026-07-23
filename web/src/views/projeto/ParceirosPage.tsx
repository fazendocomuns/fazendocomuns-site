import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { parceirosContent } from '@/features/projeto/data/parceirosContent'
import { cn } from '@/lib/utils'

interface ParceiroLogo {
  src: string
  alt: string
}

interface ParceiroGroup {
  id: string
  title: string
  logos: ParceiroLogo[]
}

interface ParceirosPageProps {
  groups: ParceiroGroup[]
}

export function ParceirosPage({ groups }: ParceirosPageProps) {
  const { title, subtitle } = parceirosContent

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'O projeto', href: '/projeto' },
          { label: title },
        ]}
      />

      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          className={cn(
            'section-padding',
            groupIndex % 2 === 0 ? 'bg-background' : 'bg-muted',
          )}
          aria-labelledby={`${group.id}-title`}
        >
          <div className="container-app mx-auto max-w-4xl">
            <ScrollReveal delay={groupIndex * 0.08}>
              <h2
                id={`${group.id}-title`}
                className="font-heading text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl"
              >
                {group.title}
              </h2>

              <div
                className={cn(
                  'mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-12',
                  group.logos.length === 1 && 'justify-start',
                )}
              >
                {group.logos.map((logo) => (
                  <figure
                    key={logo.alt}
                    className="flex items-center justify-center rounded-2xl border border-border/60 bg-card px-8 py-6 shadow-soft md:px-10 md:py-8"
                  >
                    <span className="relative block h-20 w-48 max-w-full md:h-24 md:w-56">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        fill
                        sizes="224px"
                        quality={60}
                        className="object-contain"
                      />
                    </span>
                  </figure>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      ))}

      <section className="section-padding bg-background">
        <div className="container-app mx-auto max-w-4xl border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/projeto">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para O projeto
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
