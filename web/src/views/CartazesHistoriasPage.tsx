import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { historiasDoRecreioContent as historiasFallback } from '@/features/historias-do-recreio/data/historiasDoRecreioContent'

interface CartazesHistoriasPageProps {
  content: typeof historiasFallback
}

export function CartazesHistoriasPage({ content }: CartazesHistoriasPageProps) {
  const { cartazes } = content

  return (
    <>
      <PageHero
        title={cartazes.title}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Histórias do recreio', href: '/historias-do-recreio' },
          { label: cartazes.title },
        ]}
      />

      <section className="section-padding bg-background" aria-label={cartazes.title}>
        <div className="container-app mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-2">
            {cartazes.images.map((image, index) => (
              <ScrollReveal key={image.url} delay={index * 0.06}>
                <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={1000}
                    height={1770}
                    sizes="(max-width: 639px) 100vw, 50vw"
                    quality={75}
                    className="h-auto w-full object-contain"
                  />
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-app border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/historias-do-recreio">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para Histórias do recreio
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
