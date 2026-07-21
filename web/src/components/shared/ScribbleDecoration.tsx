import { cn } from '@/lib/utils'

interface ScribbleDecorationProps {
  variant?: 'circle' | 'arrow' | 'underline' | 'squiggle'
  className?: string
  color?: string
}

export function ScribbleDecoration({
  variant = 'squiggle',
  className,
  color = 'currentColor',
}: ScribbleDecorationProps) {
  const paths = {
    circle: (
      <ellipse cx="60" cy="30" rx="55" ry="25" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    ),
    arrow: (
      <path d="M5 25 Q40 5 75 20 M65 12 L75 20 L68 28" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    underline: (
      <path d="M5 20 Q30 28 60 18 Q90 8 115 22" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    ),
    squiggle: (
      <path d="M5 25 Q20 5 35 25 Q50 45 65 25 Q80 5 95 25 Q110 45 125 25" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    ),
  }

  return (
    <svg
      viewBox="0 0 130 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none select-none', className)}
      aria-hidden="true"
    >
      {paths[variant]}
    </svg>
  )
}
