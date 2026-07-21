'use client'

import { Loader2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AdminFormActionsProps {
  onCancel: () => void
  isSubmitting: boolean
  isEditing: boolean
  createLabel: string
  editLabel?: string
  className?: string
}

export function AdminFormActions({
  onCancel,
  isSubmitting,
  isEditing,
  createLabel,
  editLabel = 'Salvar alterações',
  className,
}: AdminFormActionsProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 -mx-4 flex flex-col-reverse gap-3 border-t border-border/50 bg-background/95 px-4 py-4 backdrop-blur-sm sm:-mx-0 sm:flex-row sm:justify-end sm:rounded-2xl sm:border sm:px-6',
        className,
      )}
    >
      <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="size-4" aria-hidden="true" />
            {isEditing ? editLabel : createLabel}
          </>
        )}
      </Button>
    </div>
  )
}
