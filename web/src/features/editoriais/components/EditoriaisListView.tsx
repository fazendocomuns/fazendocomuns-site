'use client'

import { PageHero } from '@/components/layout/PageHero'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { EditorialCard } from '@/features/editoriais/components/EditorialCard'
import type { Editorial } from '@/features/editoriais/data/editoriaisContent'

interface EditoriaisListViewProps {
  title: string
  subtitle: string
  editoriais: Editorial[]
}

export function EditoriaisListView({ title, subtitle, editoriais }: EditoriaisListViewProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={subtitle}
        breadcrumb={[{ label: 'Início', href: '/' }, { label: 'Editoriais' }]}
      />

      <section className="section-padding bg-background" aria-label="Lista de editoriais">
        <div className="container-app">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            {editoriais.map((editorial, index) => (
              <ScrollReveal key={editorial.id} delay={index * 0.05}>
                <EditorialCard editorial={editorial} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
