import Image from 'next/image'
import { footerContent, type FooterPartnerLogo } from '@/features/home/data/footerContent'
import { cn } from '@/lib/utils'

const headingClass =
  'font-subheading text-sm font-semibold uppercase tracking-wider text-brand-red-dark dark:text-brand-orange'

function PartnerLogoCell({
  partner,
  className,
}: {
  partner: FooterPartnerLogo
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-20 items-center justify-center rounded-xl bg-muted/60 px-4 py-3',
        className ?? partner.cellClassName,
      )}
    >
      <span className="relative block size-full">
        <Image
          src={partner.logo}
          alt={partner.alt}
          fill
          sizes="(max-width: 639px) 128px, 160px"
          quality={60}
          className="object-contain"
        />
      </span>
    </div>
  )
}

export function FooterPartners() {
  const { realization, support } = footerContent.partners

  return (
    <section
      className="border-t border-brand-orange/25 pt-10 dark:border-border lg:pt-12"
      aria-label="Realização e apoio"
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div>
          <h3 className={headingClass}>Realização</h3>
          <div className="mt-5 flex flex-wrap gap-4">
            {realization.map((partner) => (
              <PartnerLogoCell
                key={partner.alt}
                partner={partner}
                className="h-32 w-32 sm:h-36 sm:w-36 md:h-40 md:w-40"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className={headingClass}>Apoio</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {support.map((partner) => (
              <PartnerLogoCell key={partner.alt} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
