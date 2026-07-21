'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { Button } from '@/components/ui/button'

interface PlaceholderPageProps {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-ui text-sm uppercase tracking-widest text-brand-red">
        Em construção
      </p>
      <h1 className="mt-4 font-heading text-4xl font-bold">{title}</h1>
      {description && (
        <p className="mt-4 max-w-lg font-body text-muted-foreground">{description}</p>
      )}
      <Button className="mt-8" asChild>
        <Link href="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}
