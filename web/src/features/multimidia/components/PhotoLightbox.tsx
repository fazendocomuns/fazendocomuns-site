'use client'

import Image from 'next/image'
import { useCallback, useEffect, useEffectEvent, useId, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { supabaseImageLoader } from '@/lib/supabaseImageLoader'

interface PhotoLightboxProps {
  images: string[]
  title: string
  openIndex: number | null
  onClose: () => void
  onChangeIndex: (index: number) => void
}

export function PhotoLightbox({
  images,
  title,
  openIndex,
  onClose,
  onChangeIndex,
}: PhotoLightboxProps) {
  const titleId = useId()
  const isOpen = openIndex !== null && images.length > 0
  const index = openIndex ?? 0
  const total = images.length
  const current = images[index]
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const touchStartXRef = useRef<number | null>(null)

  const goPrev = useCallback(() => {
    if (!total) return
    onChangeIndex((index - 1 + total) % total)
  }, [index, onChangeIndex, total])

  const goNext = useCallback(() => {
    if (!total) return
    onChangeIndex((index + 1) % total)
  }, [index, onChangeIndex, total])

  const onDialogKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose()
    if (event.key === 'ArrowLeft') goPrev()
    if (event.key === 'ArrowRight') goNext()

    if (event.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
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
  })

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus())

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onDialogKeyDown)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onDialogKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen])

  if (!isOpen || !current) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-3 sm:p-6"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartXRef.current = event.changedTouches[0]?.clientX ?? null
      }}
      onTouchEnd={(event) => {
        const startX = touchStartXRef.current
        const endX = event.changedTouches[0]?.clientX
        touchStartXRef.current = null
        if (startX === null || endX === undefined) return

        const delta = endX - startX
        if (Math.abs(delta) < 50) return
        if (delta > 0) goPrev()
        else goNext()
      }}
    >
      <h2 id={titleId} className="sr-only">
        {title} — foto {index + 1} de {total}
      </h2>

      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Fechar galeria"
        className="absolute right-3 top-3 z-20 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 sm:top-5"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      <p className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-ui text-sm text-white sm:top-6">
        {index + 1} / {total}
      </p>

      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goPrev()
            }}
            aria-label="Foto anterior"
            className="absolute left-2 z-20 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 md:left-6"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              goNext()
            }}
            aria-label="Próxima foto"
            className="absolute right-2 z-20 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 md:right-6"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </>
      ) : null}

      <div
        className="relative h-[min(88vh,900px)] w-[min(96vw,1200px)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          key={current}
          src={current}
          alt={`${title} — foto ${index + 1}`}
          fill
          sizes="96vw"
          quality={75}
          loading="eager"
          loader={supabaseImageLoader}
          className="rounded-lg object-contain shadow-strong"
        />
      </div>
    </div>
  )
}
