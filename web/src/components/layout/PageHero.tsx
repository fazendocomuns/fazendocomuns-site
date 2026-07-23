import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import quebraCabecaImg from '@/assets/imgs/quebra_Cabeça.png'

interface PageHeroProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; href?: string }[]
  className?: string
}

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  className,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        'relative overflow-hidden border-b border-border/40 bg-gradient-hero paper-texture',
        className,
      )}
    >
      <div className="container-app py-14 md:py-20">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
            <ol className="flex flex-wrap items-center justify-center gap-1.5 font-ui text-sm text-muted-foreground">
              {breadcrumb.map((item, index) => (
                <li key={item.label} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
                  )}
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="transition-colors hover:text-brand-red focus-visible:text-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="relative mx-auto max-w-4xl text-center">
          <Image
            src={quebraCabecaImg}
            alt=""
            sizes="96px"
            className="page-hero-puzzle mx-auto mb-6 h-20 w-auto object-contain md:h-24"
            aria-hidden="true"
          />

          <h1
            className="page-hero-title font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="page-hero-subtitle mt-5 font-body text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
