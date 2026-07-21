import { Loader2 } from 'lucide-react'

export function PageLoader() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Carregando página"
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
    </div>
  )
}
