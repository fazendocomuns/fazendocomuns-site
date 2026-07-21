'use client'

import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { HomeEventItem } from '@/features/home/data/homeContent'

interface EventsSectionProps {
  events: HomeEventItem[]
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section
      className="bg-muted pt-28 sm:pt-36 md:pt-44 pb-[var(--spacing-section)]"
      aria-labelledby="events-title"
    >
      <div className="container-app">
        <ScrollReveal>
          <h2
            id="events-title"
            className="font-heading text-3xl font-bold text-foreground md:text-4xl"
          >
            Eventos
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
          {events.map((event, index) => (
            <ScrollReveal key={event.id} delay={index * 0.1}>
              <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium">
                <div className="relative h-52 overflow-hidden md:h-56">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
                  <div className="absolute right-0 bottom-0 left-0 p-6">
                    <span className="rounded-full bg-card/90 px-4 py-1.5 font-ui text-xs font-semibold uppercase tracking-wider text-foreground">
                      Evento
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="font-heading text-xl font-bold leading-snug md:text-2xl">
                    {event.title}
                  </h3>

                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                      <Calendar className="size-4 shrink-0 text-brand-orange" aria-hidden="true" />
                      {event.date}
                    </li>
                    <li className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
                      {event.location}
                    </li>
                  </ul>

                  <Button className="mt-6" asChild>
                    <Link href={event.href}>
                      Saiba mais
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
