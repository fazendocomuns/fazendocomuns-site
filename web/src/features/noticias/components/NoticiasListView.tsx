'use client'

import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { NoticiaCard } from '@/features/noticias/components/NoticiaCard'
import type { Noticia } from '@/features/noticias/data/noticiasContent'

interface NoticiasListViewProps {
  title: string
  subtitle: string
  noticias: Noticia[]
}

export function NoticiasListView({ title, subtitle, noticias }: NoticiasListViewProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: title }]}
      />

      <section className="section-padding bg-background" aria-label="Lista de notícias">
        <div className="container-app">
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {noticias.map((noticia, index) => (
              <ScrollReveal key={noticia.id} delay={index * 0.05}>
                <NoticiaCard noticia={noticia} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <ShareButtons
              className="mx-auto mt-12 max-w-4xl"
              title={title}
              text={subtitle}
              heading="Compartilhar notícias"
              description="Divulgue a página de notícias do Fazendo Comuns nas redes ou copie o link."
            />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
