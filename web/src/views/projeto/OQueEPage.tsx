import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import type { OQueESection } from '@/features/projeto/data/oQueEContent'
import { oQueEContent as oQueEContentFallback } from '@/features/projeto/data/oQueEContent'
import { proseParagraph, proseParagraphSm, proseStack } from '@/lib/typography'
import { cn } from '@/lib/utils'

function renderParagraph(text: string, index: number) {
  const parts = text.split('(ver Produções)')
  if (parts.length === 1) {
    return (
      <p
        key={index}
        className={proseParagraph}
      >
        {text}
      </p>
    )
  }

  return (
    <p
      key={index}
      className={proseParagraph}
    >
      {parts[0]}
      (
      <Link
        href="/projeto/producoes"
        className="font-semibold text-brand-red underline-offset-4 transition-colors hover:text-brand-orange hover:underline"
      >
        ver Produções
      </Link>
      )
      {parts[1]}
    </p>
  )
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <div className="mb-8 flex items-start gap-4 md:mb-10">
      <div
        className="mt-2 h-10 w-1 shrink-0 rounded-full bg-brand-red md:mt-2.5 md:h-12"
        aria-hidden="true"
      />
      <h2
        id={id}
        className="font-heading text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl lg:text-4xl"
      >
        {children}
      </h2>
    </div>
  )
}

function SectionImage({ section }: { section: OQueESection }) {
  if (!section.image) return null

  const isLogos = section.id === 'qualificacao'
  const isIntro = section.id === 'introducao'
  const isHistorico = section.id === 'historico'
  const fillsContainer = isIntro || isHistorico

  return (
    <figure
      className={cn(
        'group',
        isIntro && 'flex h-full min-h-0 flex-1 flex-col',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border shadow-medium transition-shadow duration-300 group-hover:shadow-strong',
          isLogos
            ? 'border-border/60 bg-muted p-5 md:p-6'
            : 'border-border/60 bg-card',
          isIntro &&
            'relative aspect-[4/5] min-h-[20rem] flex-1 sm:min-h-[24rem] lg:aspect-auto lg:min-h-0',
          isHistorico && 'relative aspect-[2/1] w-full',
        )}
      >
        {fillsContainer ? (
          <Image
            src={section.image.src}
            alt={section.image.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            quality={60}
            className="object-cover object-center"
          />
        ) : (
          <Image
            src={section.image.src}
            alt={section.image.alt}
            width={1200}
            height={600}
            sizes="(max-width: 1023px) 100vw, 50vw"
            quality={60}
            className={cn(
              isLogos && 'mx-auto h-auto max-h-48 w-full object-contain md:max-h-56',
            )}
          />
        )}
      </div>
      {section.image.caption ? (
        <figcaption className="mt-3 shrink-0 font-ui text-xs text-muted-foreground md:text-sm">
          {section.image.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function SectionBody({ section }: { section: OQueESection }) {
  const isQualificacao = section.id === 'qualificacao'

  if (isQualificacao) {
    return (
      <ul className="space-y-3">
        {section.paragraphs.map((paragraph, index) => (
          <li
            key={index}
            className="rounded-xl border border-border/60 bg-card/80 px-5 py-4 shadow-soft md:px-6"
          >
            <p className={proseParagraphSm}>
              {paragraph}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className={proseStack}>
      {section.paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}

      {section.id === 'historico' ? (
        <div className="pt-2">
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link href="/o-projeto-falatorio">Conhecer o Projeto CombinAção</Link>
          </Button>
        </div>
      ) : null}
    </div>
  )
}

interface OQueEPageProps {
  content: typeof oQueEContentFallback
}

export function OQueEPage({ content }: OQueEPageProps) {
  const { title, subtitle, sections } = content

  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'O projeto', href: '/projeto' },
          { label: title },
        ]}
      />

      {sections.map((section, sectionIndex) => {
        const hasVisual = Boolean(section.image)
        const imageOnLeft = section.imagePosition === 'left'
        const isIntro = section.id === 'introducao'

        return (
          <section
            key={section.id}
            className={cn(
              'section-padding',
              sectionIndex % 2 === 0 ? 'bg-background' : 'bg-muted',
            )}
            aria-labelledby={section.title ? `${section.id}-title` : undefined}
          >
            <div
              className={cn(
                'container-app mx-auto',
                hasVisual ? 'max-w-6xl' : 'max-w-3xl',
              )}
            >
              {section.title ? (
                <ScrollReveal delay={sectionIndex * 0.05}>
                  <SectionHeading id={`${section.id}-title`}>{section.title}</SectionHeading>
                </ScrollReveal>
              ) : null}

              {hasVisual ? (
                <div
                  className={cn(
                    'grid gap-10 lg:grid-cols-2 lg:gap-12',
                    // Intro: layout normal, imagem acompanha a altura do texto.
                    // Histórico / Qualificação: imagem sticky enquanto o texto rola.
                    isIntro ? 'lg:items-stretch' : 'lg:items-start',
                  )}
                >
                  <ScrollReveal
                    delay={sectionIndex * 0.05}
                    className={cn(
                      imageOnLeft && 'lg:order-1',
                      !imageOnLeft && 'lg:order-2',
                    )}
                  >
                    <SectionBody section={section} />
                  </ScrollReveal>

                  <div
                    className={cn(
                      imageOnLeft && 'lg:order-2',
                      !imageOnLeft && 'lg:order-1',
                      // Sticky só em Histórico / Qualificação — intro fica normal
                      !isIntro && 'lg:sticky lg:top-28',
                      isIntro && 'h-full lg:flex lg:flex-col',
                    )}
                  >
                    <ScrollReveal
                      delay={sectionIndex * 0.08}
                      className={cn(isIntro && 'flex h-full min-h-0 flex-1 flex-col')}
                    >
                      <SectionImage section={section} />
                    </ScrollReveal>
                  </div>
                </div>
              ) : (
                <ScrollReveal delay={sectionIndex * 0.05}>
                  <SectionBody section={section} />
                </ScrollReveal>
              )}
            </div>
          </section>
        )
      })}

      <section className="section-padding bg-background">
        <div className="container-app mx-auto max-w-3xl border-t border-border pt-8">
          <Button variant="outline" asChild>
            <Link href="/projeto">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para O projeto
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
