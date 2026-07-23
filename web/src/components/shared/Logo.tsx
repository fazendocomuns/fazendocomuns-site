'use client'

import Image from 'next/image'
import { AppLink as Link } from '@/components/shared/AppLink'
import logoImg from '@/assets/imgs/logo.png'
import { cn } from '@/lib/utils'

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
      className={cn('w-auto object-contain object-left', sizeClasses[size], className)}
      width={500}
      height={116}
      preload={size === 'sm'}
      sizes="(max-width: 768px) 140px, 180px"
      style={{ width: 'auto' }}
    />
  )

  if (!linkToHome) {
    return image
  }

  return (
    <Link
      to="/"
      className="inline-flex h-auto max-w-full shrink-0 items-center transition-opacity hover:opacity-90"
      aria-label="Fazendo Comuns — Página inicial"
    >
      {image}
    </Link>
  )
}
