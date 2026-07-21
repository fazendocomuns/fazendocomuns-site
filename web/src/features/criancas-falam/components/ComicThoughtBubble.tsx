'use client'

import { cn } from '@/lib/utils'

export type BubbleTail = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

const tailPositionClass: Record<BubbleTail, string> = {
  'bottom-left': '-bottom-7 left-6 flex-col',
  'bottom-right': '-bottom-7 right-6 flex-col',
  'top-left': '-top-7 left-6 flex-col-reverse',
  'top-right': '-top-7 right-6 flex-col-reverse',
}

interface ComicThoughtBubbleProps {
  quote: string
  tail?: BubbleTail
  size?: 'sm' | 'md' | 'lg'
  align?: 'center' | 'left'
  className?: string
}

const sizeClass = {
  sm: 'max-w-[220px] text-sm',
  md: 'max-w-[280px] text-base sm:max-w-xs',
  lg: 'max-w-sm text-base sm:max-w-md md:text-lg',
}

export function ComicThoughtBubble({
  quote,
  tail = 'bottom-left',
  size = 'md',
  align = 'center',
  className,
}: ComicThoughtBubbleProps) {
  return (
    <div className={cn('relative inline-block', sizeClass[size], className)}>
      <div
        className={cn(
          'relative rounded-[1.75rem] border-[3px] border-neutral-900 bg-card dark:border-border',
          'shadow-[5px_5px_0_0_#1a1612] dark:shadow-[5px_5px_0_0_var(--border)]',
          size === 'lg' ? 'px-6 py-5' : size === 'sm' ? 'px-4 py-3' : 'px-5 py-4',
        )}
      >
        <p
          className={cn(
            'font-comic font-medium text-foreground',
            align === 'left' ? 'text-left leading-relaxed' : 'text-center leading-snug',
            size === 'lg' && align === 'left' && 'leading-loose',
          )}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div
        className={cn('absolute flex items-center gap-1.5', tailPositionClass[tail])}
        aria-hidden="true"
      >
        <span className="size-3.5 rounded-full border-2 border-neutral-900 bg-card dark:border-border" />
        <span className="size-2.5 rounded-full border-2 border-neutral-900 bg-card dark:border-border" />
        <span className="size-1.5 rounded-full border-2 border-neutral-900 bg-card dark:border-border" />
      </div>
    </div>
  )
}
