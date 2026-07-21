'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import logoImg from '@/assets/imgs/logo.png'
import { HomeNav } from '@/components/shared/HomeNav'
import { ImageCarousel } from '@/components/shared/ImageCarousel'
import { carouselSlides } from '@/features/home/data/homeContent'

export function HeroSection() {
  return (
    <section
      className="relative bg-gradient-hero paper-texture"
      aria-label="Introdução"
    >
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo principal
      </a>

      <div className="container-app flex flex-col items-center py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full justify-center"
        >
          <Image
            src={logoImg}
            alt="Fazendo Comuns"
            className="h-auto w-full max-w-[280px] object-contain sm:max-w-[360px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]"
            width={640}
            height={192}
            priority
            sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 640px"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full max-w-5xl md:mt-10"
        >
          <HomeNav />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full pb-10 md:pb-14"
      >
        <ImageCarousel slides={carouselSlides} autoplay interval={5500} fullWidth />
      </motion.div>
    </section>
  )
}
