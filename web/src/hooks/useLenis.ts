import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'

let activeLenis: Lenis | null = null

export function getLenis() {
  return activeLenis
}

function shouldUseNativeScroll() {
  if (prefersReducedMotion()) return true
  if (window.matchMedia('(pointer: coarse), (max-width: 767px)').matches) return true

  const connection = (
    navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean }
    }
  ).connection

  return Boolean(
    connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g' ||
      connection?.effectiveType === '3g',
  )
}

export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled || shouldUseNativeScroll()) return

    let disposed = false
    let lenis: Lenis | null = null
    let rafId = 0

    function raf(time: number) {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    function syncVisibility() {
      cancelAnimationFrame(rafId)
      rafId = 0
      if (!document.hidden && lenis) {
        rafId = requestAnimationFrame(raf)
      }
    }

    async function initialize() {
      const { default: LenisConstructor } = await import('lenis')
      if (disposed) return

      lenis = new LenisConstructor({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      lenisRef.current = lenis
      activeLenis = lenis
      document.documentElement.classList.add('lenis', 'lenis-smooth')
      document.addEventListener('visibilitychange', syncVisibility)
      syncVisibility()
    }

    void initialize()

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      document.removeEventListener('visibilitychange', syncVisibility)
      lenis?.destroy()
      lenisRef.current = null
      if (activeLenis === lenis) {
        activeLenis = null
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [enabled])

  return lenisRef
}
