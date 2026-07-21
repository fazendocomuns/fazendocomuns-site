import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '@/lib/prefersReducedMotion'

let activeLenis: Lenis | null = null

export function getLenis() {
  return activeLenis
}

export function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = lenis
    activeLenis = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    let rafId = 0
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      if (activeLenis === lenis) {
        activeLenis = null
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [enabled])

  return lenisRef
}
