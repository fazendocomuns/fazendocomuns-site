import { useParams } from 'next/navigation'

/** Normaliza `useParams().id` do App Router para `string | undefined`. */
export function useRouteId(): string | undefined {
  const params = useParams<{ id?: string | string[] }>()
  const raw = params.id
  return typeof raw === 'string' ? raw : undefined
}
