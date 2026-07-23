import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { featureCards } from '@/features/home/data/homeContent'
import { cn } from '@/lib/utils'

const bubbleTextColors = {
  red: 'bg-brand-red text-white',
  yellow: 'bg-brand-yellow text-neutral-900',
  orange: 'bg-brand-orange text-white',
}

export function FeatureCardsSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="features-title">
      <div className="container-app">
        <ScrollReveal>
          <h2 id="features-title" className="sr-only">
            Destaques
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <ScrollReveal key={card.id} delay={index * 0.1}>
              <article
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1.5 motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={60}
                    className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>

                <div className="flex flex-1 flex-col items-center px-6 py-8 text-center">
                  <div
                    className={cn(
                      'inline-flex max-w-full items-center justify-center rounded-full px-6 py-3 shadow-soft',
                      bubbleTextColors[card.color],
                    )}
                  >
                    <h3 className="font-heading text-base font-bold leading-snug md:text-lg">
                      {card.title}
                    </h3>
                  </div>

                  <Button variant="outline" className="mt-6" asChild>
                    <Link href={card.href}>
                      Leia mais
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </Button>

                  {'secondaryLink' in card && card.secondaryLink ? (
                    <div className="mt-6 flex w-full flex-col items-center gap-3 border-t border-border/60 pt-6">
                      <div
                        className={cn(
                          'inline-flex max-w-full items-center justify-center rounded-full px-6 py-3 shadow-soft',
                          bubbleTextColors[card.color],
                        )}
                      >
                        <p className="font-heading text-base font-bold leading-snug md:text-lg">
                          {card.secondaryLink.label}
                        </p>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={card.secondaryLink.href}>
                          Leia mais
                          <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  ) : null}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
