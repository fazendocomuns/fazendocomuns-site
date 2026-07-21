import { Separator } from '@/components/ui/separator'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { FooterBrandSection } from '@/components/layout/FooterBrandSection'
import { FooterPartners } from '@/components/layout/FooterPartners'

const footerSurfaceClass =
  'border-t border-brand-orange/30 bg-brand-amber text-neutral-900 dark:border-border dark:bg-card dark:text-card-foreground'

interface SiteFooterProps {
  variant?: 'home' | 'default'
  withScrollReveal?: boolean
}

export function SiteFooter({
  variant = 'default',
  withScrollReveal = false,
}: SiteFooterProps) {
  const currentYear = new Date().getFullYear()
  const isHome = variant === 'home'

  const body = (
    <>
      <FooterBrandSection logoSize={isHome ? 'lg' : 'md'} />

      <FooterPartners />

      <Separator className="my-8 bg-brand-orange/30 lg:my-10" />

      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-ui text-sm text-neutral-700 dark:text-muted-foreground">
          © {currentYear} Fazendo Comuns. Todos os direitos reservados.
        </p>
        <p className="font-ui text-xs text-neutral-600 dark:text-muted-foreground">
          Projeto de pesquisa — UFRJ · Psicologia
        </p>
      </div>
    </>
  )

  return (
    <footer className={footerSurfaceClass}>
      <div className="container-app section-padding">
        {withScrollReveal ? <ScrollReveal>{body}</ScrollReveal> : body}
      </div>
    </footer>
  )
}
