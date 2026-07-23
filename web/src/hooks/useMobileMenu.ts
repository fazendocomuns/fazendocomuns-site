'use client'

import { useEffect, useEffectEvent } from 'react'
import { usePathname } from 'next/navigation'

export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [locked])
}

export function useCloseOnRouteChange(onClose: () => void) {
  const pathname = usePathname()
  const closeMenu = useEffectEvent(onClose)

  useEffect(() => {
    closeMenu()
  }, [pathname])
}
