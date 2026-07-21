'use client'

import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { bubbleItems } from '@/features/home/data/homeContent'
import { cn } from '@/lib/utils'

const bubbleRingColors = {
  red: 'ring-brand-red/40',
  amber: 'ring-brand-amber/50',
  yellow: 'ring-brand-yellow/60',
  orange: 'ring-brand-orange/40',
}

export function BubblesSection() {
  return (
    <section className="section-padding bg-muted" aria-labelledby="bubbles-title">
      <div className="container-app">
        <ScrollReveal>
          <h2 id="bubbles-title" className="sr-only">
            Destaques do projeto
          </h2>
        </ScrollReveal>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {bubbleItems.map((item, index) => {
            const ringColor =
              bubbleRingColors[
                (['red', 'amber', 'yellow', 'orange'] as const)[index % 4]
              ]

            return (
              <ScrollReveal key={item.id} delay={index * 0.08}>
                <article className="group flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={cn(
                      'relative aspect-square w-32 shrink-0 overflow-hidden rounded-full border-4 border-card bg-card shadow-medium ring-4 md:w-36 lg:w-40',
                      ringColor,
                    )}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="160px"
                      className="rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>

                  <h3 className="mt-5 max-w-[200px] font-heading text-base font-bold leading-snug text-foreground md:text-lg">
                    {item.title}
                  </h3>

                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link href={item.href}>
                      Saiba mais
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </Button>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
