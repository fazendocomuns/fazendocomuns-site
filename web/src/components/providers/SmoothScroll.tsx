'use client'

import { usePathname } from 'next/navigation'
import { useLenis } from '@/hooks/useLenis'

/** Lenis só no site público — evita RAF contínuo no admin. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const enabled = !pathname?.startsWith('/admin')

  return <SmoothScrollInner enabled={enabled}>{children}</SmoothScrollInner>
}

function SmoothScrollInner({
  enabled,
  children,
}: {
  enabled: boolean
  children: React.ReactNode
}) {
  useLenis(enabled)
  return children
}
