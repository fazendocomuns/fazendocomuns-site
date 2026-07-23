import Image from 'next/image'
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

      <div className="relative z-20 container-app flex flex-col items-center py-10 md:py-14">
        <div className="page-hero-title flex w-full justify-center">
          <Image
            src={logoImg}
            alt="Fazendo Comuns"
            className="h-auto w-full max-w-[280px] object-contain sm:max-w-[360px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]"
            width={640}
            height={192}
            preload
            sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 480px, 640px"
          />
        </div>

        <div className="page-hero-subtitle mt-8 w-full max-w-5xl md:mt-10">
          <HomeNav />
        </div>
      </div>

      <div className="relative z-0 w-full pb-10 md:pb-14">
        <ImageCarousel slides={carouselSlides} autoplay interval={5500} fullWidth />
      </div>
    </section>
  )
}
