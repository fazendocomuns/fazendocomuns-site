'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/button'

interface EventosSubpagePlaceholderProps {
  title: string
  description?: string
  parentLabel: string
  parentHref: string
}

export function EventosSubpagePlaceholder({
  title,
  description,
  parentLabel,
  parentHref,
}: EventosSubpagePlaceholderProps) {
  return (
    <>
      <PageHero
        title={title}
        subtitle={description}
        breadcrumb={[
          { label: 'Início', href: '/' },
          { label: 'Eventos', href: '/eventos' },
          { label: parentLabel, href: parentHref },
          { label: title },
        ]}
      />

      <div className="container-app flex min-h-[40vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-ui text-sm uppercase tracking-widest text-brand-red">
          Em construção
        </p>
        <p className="mt-4 max-w-md font-body text-muted-foreground">
          Esta seção será publicada em breve com o conteúdo completo do site
          oficial.
        </p>
        <Button className="mt-8" variant="outline" asChild>
          <Link href={parentHref}>
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar para {parentLabel}
          </Link>
        </Button>
      </div>
    </>
  )
}
