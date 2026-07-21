'use client'

import { useEffect } from 'react'
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

  useEffect(() => {
    onClose()
  }, [pathname, onClose])
}
