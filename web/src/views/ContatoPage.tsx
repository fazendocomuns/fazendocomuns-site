'use client'

import { Mail, MapPin } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { InstagramIcon } from '@/components/shared/InstagramIcon'
import { ContactForm } from '@/features/contato/components/ContactForm'
import { contactInfo } from '@/features/contato/data/contatoContent'
import campusImg from '@/assets/imgs/bannerr01.jpg'

export function ContatoPage() {
  return (
    <>
      <PageHero
        title="Contato"
        breadcrumb={[{ label: 'Início', href: '/' }, { label: 'Contato' }]}
      />

      <section className="section-padding bg-background" aria-label="Informações de contato">
        <div className="container-app">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Informações */}
            <div>
              <div className="overflow-hidden rounded-2xl shadow-medium">
                <img
                  src={campusImg.src}
                  alt="Atividades do projeto Fazendo Comuns em escola parceira"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    {contactInfo.organization}
                  </h2>
                  <p className="mt-2 font-body text-muted-foreground">
                    {contactInfo.institution}
                  </p>
                </div>

                <address className="not-italic">
                  <div className="flex gap-3">
                    <MapPin
                      className="mt-1 size-5 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <div className="font-body text-sm leading-relaxed text-muted-foreground md:text-base">
                      <p>{contactInfo.address.street}</p>
                      <p>{contactInfo.address.building}</p>
                      <p>{contactInfo.address.city}</p>
                      <p>{contactInfo.address.cep}</p>
                    </div>
                  </div>
                </address>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 font-ui text-sm text-foreground transition-colors hover:border-brand-red hover:text-brand-red md:text-base"
                >
                  <Mail className="size-5 text-brand-orange" aria-hidden="true" />
                  {contactInfo.email}
                </a>

                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 font-ui text-sm text-foreground transition-colors hover:border-brand-amber md:text-base"
                  aria-label="Instagram do Fazendo Comuns (abre em nova aba)"
                >
                  <InstagramIcon />
                  @fazendocomuns
                </a>
              </div>
            </div>

            {/* Formulário */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
