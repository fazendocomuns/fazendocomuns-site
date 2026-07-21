'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ScribbleDecoration } from '@/components/shared/ScribbleDecoration'
import { mainTitle } from '@/features/home/data/homeContent'

export function MainTitleSection() {
  return (
    <section
      id="conteudo-principal"
      className="section-padding bg-background"
      aria-labelledby="main-title"
    >
      <div className="container-app">
        <ScrollReveal>
          <div className="relative mx-auto max-w-5xl text-center">
            <motion.h1
              id="main-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading leading-[1.05] tracking-tight"
            >
              <span className="block text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                {mainTitle.line1}
              </span>
              <span className="relative mt-2 inline-block">
                <span className="block font-display text-4xl font-bold text-gradient-energy sm:text-5xl md:text-6xl lg:text-7xl">
                  {mainTitle.line2}
                </span>
                <ScribbleDecoration
                  variant="underline"
                  color="#EF3220"
                  className="mx-auto mt-1 w-48 sm:w-64 md:w-80 lg:w-96"
                />
              </span>
            </motion.h1>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
