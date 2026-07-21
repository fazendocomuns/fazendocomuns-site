'use client'

import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import { cn } from '@/lib/utils'
import logoImg from '@/assets/imgs/logo.png'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  linkToHome?: boolean
}

const sizeClasses = {
  sm: 'h-8 w-auto md:h-10',
  md: 'h-10 w-auto md:h-12',
  lg: 'h-12 w-auto md:h-14',
}

export function Logo({ className, size = 'md', linkToHome = true }: LogoProps) {
  const image = (
    <Image
      src={logoImg}
      alt="Fazendo Comuns"
      className={cn('w-auto object-contain', sizeClasses[size], className)}
      width={160}
      height={48}
      priority={size === 'sm'}
      sizes="160px"
    />
  )

  if (!linkToHome) {
    return image
  }

  return (
    <Link
      to="/"
      className="inline-flex shrink-0 transition-opacity hover:opacity-90"
      aria-label="Fazendo Comuns — Página inicial"
    >
      {image}
    </Link>
  )
}
