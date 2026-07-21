'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getLenis } from '@/hooks/useLenis'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = getLenis()

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
