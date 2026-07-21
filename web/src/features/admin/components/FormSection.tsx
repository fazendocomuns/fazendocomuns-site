'use client'

import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <Card className={cn('border-border/50 shadow-sm', className)}>
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="font-ui text-base font-semibold">{title}</CardTitle>
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-5 pt-6">{children}</CardContent>
    </Card>
  )
}

interface FormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: FormFieldProps) {
  const fieldId = htmlFor

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className="flex items-center gap-1 font-ui text-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="text-brand-red" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="font-ui text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p id={fieldId ? `${fieldId}-error` : undefined} className="flex items-center gap-1.5 font-ui text-sm text-brand-red" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
