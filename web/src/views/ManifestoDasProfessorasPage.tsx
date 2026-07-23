import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, Download } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { manifestoDasProfessorasContent as manifestoFallback } from '@/features/professores-falam/data/manifestoDasProfessorasContent'

interface ManifestoDasProfessorasPageProps {
  content: typeof manifestoFallback
}

export function ManifestoDasProfessorasPage({ content: manifestoDasProfessorasContent }: ManifestoDasProfessorasPageProps) {
  const { heading, cover, coverAlt, downloadUrl, downloadLabel, bookHref } =
    manifestoDasProfessorasContent

  return (
    <>
      <PageHero
        title={heading}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'As professoras e os professores falam', href: '/professores-falam' },
          { label: heading },
        ]}
      />

      <section className="section-padding bg-background" aria-label="Manifesto das professoras">
        <div className="container-app mx-auto max-w-6xl">
          <ScrollReveal>
            <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-card shadow-medium lg:max-w-none">
                <Image
                  src={cover}
                  alt={coverAlt}
                  width={491}
                  height={660}
                  sizes="(max-width: 1023px) 384px, 50vw"
                  quality={75}
                  loading="eager"
                  fetchPriority="high"
                  className="h-auto aspect-[491/660] w-full object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-col items-center text-center lg:items-start lg:text-left">
                <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  {heading}
                </h2>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <Button asChild>
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="size-4" aria-hidden="true" />
                      {downloadLabel}
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={bookHref}>Ler na página do livro</Link>
                  </Button>
                </div>
              </div>
            </article>
          </ScrollReveal>

          <div className="mt-12 border-t border-border pt-8">
            <Button variant="outline" asChild>
              <Link href="/professores-falam">
                <ArrowLeft className="size-4" aria-hidden="true" />
                Voltar para As professoras e os professores falam
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
