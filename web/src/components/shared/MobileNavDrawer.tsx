'use client'

import { useEffect, useEffectEvent, useRef } from 'react'
import { MobileNavActions } from '@/components/shared/MobileNavActions'
import { MobileNavList } from '@/components/shared/MobileNavList'
import { useLockBodyScroll } from '@/hooks/useMobileMenu'
import { cn } from '@/lib/utils'

interface MobileNavDrawerProps {
  isOpen: boolean
  onClose: () => void
  id: string
  variant?: 'header' | 'inline'
  linkClassName?: string
  childLinkClassName?: string
}

export function MobileNavDrawer({
  isOpen,
  onClose,
  id,
  variant = 'header',
  linkClassName,
  childLinkClassName,
}: MobileNavDrawerProps) {
  useLockBodyScroll(isOpen)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeDrawer = useEffectEvent(onClose)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusFrame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    })

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeDrawer()
        return
      }

      if (event.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const panelContent = (
    <>
      <MobileNavList
        onNavigate={onClose}
        linkClassName={linkClassName}
        childLinkClassName={childLinkClassName}
      />
      <MobileNavActions onNavigate={onClose} />
    </>
  )

  if (variant === 'inline') {
    return (
      <>
        <div
          className="fixed inset-0 z-[100] bg-black/40 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="relative z-[110] mt-4 lg:hidden"
        >
          <div className="max-h-[min(70dvh,32rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border/60 bg-card p-3 shadow-soft">
            {panelContent}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 top-16 z-[100] bg-black/40 md:top-20 lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          'fixed inset-x-0 top-16 z-[110] border-t border-border/40 bg-background shadow-strong lg:hidden md:top-20',
        )}
      >
        <nav
          className="container-app max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain py-4 md:max-h-[calc(100dvh-5rem)]"
          aria-label="Navegação mobile"
        >
          {panelContent}
        </nav>
      </div>
    </>
  )
}
