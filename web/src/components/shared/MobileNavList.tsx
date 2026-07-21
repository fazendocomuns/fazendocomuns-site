'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ChevronDown } from 'lucide-react'
import { mainNavigation } from '@/features/home/data/navigation'
import { cn } from '@/lib/utils'

interface MobileNavListProps {
  onNavigate?: () => void
  className?: string
  linkClassName?: string
  childLinkClassName?: string
}

export function MobileNavList({
  onNavigate,
  className,
  linkClassName,
  childLinkClassName,
}: MobileNavListProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  function handleNavigate() {
    onNavigate?.()
    setExpanded(null)
  }

  function toggleSection(href: string) {
    setExpanded((current) => (current === href ? null : href))
  }

  return (
    <ul className={cn('space-y-1', className)}>
      {mainNavigation.map((item) => {
        const isExpanded = expanded === item.href

        if (!item.children) {
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={handleNavigate}
                className={cn(
                  'block rounded-xl px-3 py-2.5 font-ui text-base font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  linkClassName,
                )}
              >
                {item.label}
              </Link>
            </li>
          )
        }

        return (
          <li key={item.href}>
            <div className="flex items-stretch gap-1">
              <Link
                to={item.href}
                onClick={handleNavigate}
                className={cn(
                  'min-w-0 flex-1 rounded-xl px-3 py-2.5 font-ui text-base font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  linkClassName,
                )}
              >
                {item.label}
              </Link>
              <button
                type="button"
                onClick={() => toggleSection(item.href)}
                className="inline-flex shrink-0 items-center justify-center rounded-xl px-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-expanded={isExpanded}
                aria-controls={`mobile-nav-section-${item.href}`}
                aria-label={`${isExpanded ? 'Recolher' : 'Expandir'} submenu ${item.label}`}
              >
                <ChevronDown
                  className={cn('size-4 transition-transform', isExpanded && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
            </div>

            {isExpanded ? (
              <ul
                id={`mobile-nav-section-${item.href}`}
                className="mt-1 ml-3 space-y-0.5 border-l border-border pl-3"
              >
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      to={child.href}
                      onClick={handleNavigate}
                      className={cn(
                        'block rounded-lg px-3 py-2 font-ui text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        childLinkClassName,
                      )}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
