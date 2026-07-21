'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { Mail, MapPin } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { InstagramIcon } from '@/components/shared/InstagramIcon'
import { footerContent } from '@/features/home/data/footerContent'
import { mainNavigation } from '@/features/home/data/navigation'

const headingClass =
  'font-subheading text-sm font-semibold uppercase tracking-wider text-brand-red-dark dark:text-brand-orange'

interface FooterBrandSectionProps {
  logoSize?: 'md' | 'lg'
}

export function FooterBrandSection({ logoSize = 'md' }: FooterBrandSectionProps) {
  return (
    <section aria-label="Marca, navegação e contato">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-8 xl:gap-10">
        <div className="lg:col-span-3">
          <Logo size={logoSize} />
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-neutral-800 dark:text-muted-foreground">
            A escola como projeto intra e co-geracional. Pesquisa sobre recreio
            nas escolas públicas, coordenada pela UFRJ.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h3 className={headingClass}>Navegação rápida</h3>
          <ul className="mt-4 space-y-2">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="font-ui text-sm text-neutral-800 transition-colors hover:text-brand-red dark:text-muted-foreground dark:hover:text-brand-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6 lg:gap-6">
          <div>
            <h3 className={headingClass}>Endereço</h3>
            <div className="mt-4 flex gap-3">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-brand-red"
                aria-hidden="true"
              />
              <address className="not-italic font-body text-sm leading-relaxed text-neutral-800 dark:text-muted-foreground">
                {footerContent.address.institution}
                <br />
                {footerContent.address.campus}
                <br />
                {footerContent.address.street}
              </address>
            </div>
          </div>

          <div>
            <h3 className={headingClass}>E-mail</h3>
            <a
              href={`mailto:${footerContent.email}`}
              className="mt-4 inline-flex items-start gap-2 font-ui text-sm text-neutral-800 transition-colors hover:text-brand-red dark:text-muted-foreground dark:hover:text-brand-orange"
            >
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-red" aria-hidden="true" />
              <span className="break-all">{footerContent.email}</span>
            </a>
            <Link
              to="/contato"
              className="mt-3 block font-ui text-sm font-medium text-brand-red hover:underline"
            >
              Formulário de contato →
            </Link>
          </div>

          <div>
            <h3 className={headingClass}>Redes sociais</h3>
            <a
              href={footerContent.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-muted/80 px-4 py-2 font-ui text-sm text-foreground transition-colors hover:border-brand-red hover:bg-muted dark:hover:border-brand-orange"
              aria-label="Instagram do Fazendo Comuns (abre em nova aba)"
            >
              <InstagramIcon />
              @fazendocomuns
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
