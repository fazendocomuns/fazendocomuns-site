'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  MoreHorizontal,
  Pencil,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface RowActionsProps {
  editHref: string
  onDelete: () => void
  onToggleStatus?: () => void
  isActive?: boolean
  onMoveUp?: () => void
  onMoveDown?: () => void
  canMoveUp?: boolean
  canMoveDown?: boolean
}

export function RowActions({
  editHref,
  onDelete,
  onToggleStatus,
  isActive,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: RowActionsProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" aria-label="Ações">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to={editHref} className="flex cursor-pointer items-center gap-2">
            <Pencil className="size-4" />
            Editar
          </Link>
        </DropdownMenuItem>

        {onToggleStatus && (
          <DropdownMenuItem onClick={onToggleStatus} className="gap-2">
            {isActive ? (
              <>
                <EyeOff className="size-4" />
                Desativar
              </>
            ) : (
              <>
                <Eye className="size-4" />
                Ativar
              </>
            )}
          </DropdownMenuItem>
        )}

        {(onMoveUp || onMoveDown) && (
          <>
            <DropdownMenuSeparator />
            {onMoveUp && (
              <DropdownMenuItem
                onClick={onMoveUp}
                disabled={!canMoveUp}
                className="gap-2"
              >
                <ArrowUp className="size-4" />
                Mover para cima
              </DropdownMenuItem>
            )}
            {onMoveDown && (
              <DropdownMenuItem
                onClick={onMoveDown}
                disabled={!canMoveDown}
                className="gap-2"
              >
                <ArrowDown className="size-4" />
                Mover para baixo
              </DropdownMenuItem>
            )}
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setOpen(false)
            onDelete()
          }}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 className="size-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
