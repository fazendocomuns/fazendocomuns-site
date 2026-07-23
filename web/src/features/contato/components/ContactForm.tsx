'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  contactFormSchema,
  contactInfo,
  type ContactFormValues,
} from '@/features/contato/data/contatoContent'
import { submitContactMessage } from '@/integrations/supabase/repositories/contentPublicRepository'
import { isSupabaseReady } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setSubmitError(null)

    try {
      if (!isSupabaseReady()) {
        throw new Error('Serviço de contato indisponível')
      }

      await submitContactMessage(data)
      setIsSuccess(true)
      reset()
    } catch {
      setSubmitError(
        'Não foi possível enviar sua mensagem agora. Tente novamente ou use o e-mail informado ao lado.',
      )
    }
  }

  if (isSuccess) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-amber/40 bg-brand-amber/10 p-8 text-center"
      >
        <p className="font-heading text-xl font-bold text-foreground md:text-2xl">
          {contactInfo.successMessage}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setIsSuccess(false)}
        >
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft md:p-8"
      aria-labelledby="contact-form-title"
      aria-busy={isSubmitting}
      aria-describedby={submitError ? 'contact-submit-error' : undefined}
    >
      <h2
        id="contact-form-title"
        className="font-heading text-xl font-bold text-foreground md:text-2xl"
      >
        Para dúvidas, sugestões e outras demandas:
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nome</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            {...register('firstName')}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-sm text-brand-red" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            {...register('lastName')}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-sm text-brand-red" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-brand-red" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-brand-red" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className={cn('mt-6 w-full sm:w-auto', isSubmitting && 'pointer-events-none')}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            Enviar
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>

      {submitError ? (
        <p
          id="contact-submit-error"
          className="mt-4 max-w-xl font-body text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </p>
      ) : null}
    </form>
  )
}
