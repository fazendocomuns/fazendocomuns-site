'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CarouselSlide {
  id: string
  src: string
  alt: string
  caption?: string
}

interface ImageCarouselProps {
  slides: CarouselSlide[]
  autoplay?: boolean
  interval?: number
  className?: string
  fullWidth?: boolean
}

export function ImageCarousel({
  slides,
  autoplay = true,
  interval = 5000,
  className,
  fullWidth = false,
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const reducedMotion = useReducedMotion() ?? false

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + slides.length) % slides.length)
    },
    [slides.length],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (!autoplay || isPaused || reducedMotion || slides.length <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoplay, isPaused, interval, next, reducedMotion, slides.length])

  if (slides.length === 0) return null

  return (
    <section
      className={cn('relative w-full', className)}
      aria-roledescription="carrossel"
      aria-label="Galeria de imagens do projeto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className={cn(
          'relative w-full overflow-hidden bg-muted',
          fullWidth
            ? 'aspect-[16/9] shadow-none md:aspect-[21/8]'
            : 'aspect-[21/9] rounded-2xl shadow-medium md:aspect-[21/8] md:rounded-3xl',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={slides[current].id}
            initial={reducedMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[current].src}
              alt={slides[current].alt}
              fill
              priority={current === 0}
              sizes="100vw"
              className="object-cover"
            />
            {slides[current].caption && (
              <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-neutral-900/70 to-transparent px-6 py-5 font-ui text-sm text-white md:text-base">
                {slides[current].caption}
              </figcaption>
            )}
          </motion.figure>
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-soft transition-all hover:scale-105 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red md:left-8 md:h-12 md:w-12"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-soft transition-all hover:scale-105 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red md:right-8 md:h-12 md:w-12"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Selecionar imagem"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === current}
              aria-label={`Ir para imagem ${index + 1}`}
              onClick={() => goTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                index === current
                  ? 'w-8 bg-brand-red'
                  : 'w-2 bg-border hover:bg-brand-amber',
              )}
            />
          ))}
        </div>
      )}
    </section>
  )
}
