'use client'

import NextLink from 'next/link'
import type { ComponentProps } from 'react'

type AppLinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  to?: string
  href?: string
}

/** Link compatível com react-router (`to`) e Next.js (`href`). */
export function AppLink({ to, href, ...props }: AppLinkProps) {
  return <NextLink href={href ?? to ?? '/'} {...props} />
}
