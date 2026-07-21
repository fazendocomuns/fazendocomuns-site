'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { Mail } from 'lucide-react'
import { InstagramIcon } from '@/components/shared/InstagramIcon'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Button } from '@/components/ui/button'

interface MobileNavActionsProps {
  onNavigate?: () => void
}

export function MobileNavActions({ onNavigate }: MobileNavActionsProps) {
  return (
    <div className="mt-4 space-y-3 border-t border-border pt-4">
      <ThemeToggle showLabel className="w-full rounded-xl px-3" />

      <div className="flex gap-2">
        <Button variant="default" className="flex-1" asChild>
          <Link to="/contato" onClick={onNavigate}>
            <Mail className="size-4" aria-hidden="true" />
            Contato
          </Link>
        </Button>
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://www.instagram.com/fazendocomuns"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Fazendo Comuns"
            onClick={onNavigate}
          >
            <InstagramIcon />
          </a>
        </Button>
      </div>
    </div>
  )
}
