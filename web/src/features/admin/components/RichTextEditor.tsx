'use client'

import { useRef } from 'react'
import {
  Bold,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Undo2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  placeholder?: string
  minHeight?: string
}

const toolbarButtons = [
  { icon: Bold, label: 'Negrito', wrap: (t: string) => `<strong>${t || 'texto'}</strong>` },
  { icon: Italic, label: 'Itálico', wrap: (t: string) => `<em>${t || 'texto'}</em>` },
  { icon: Heading2, label: 'Título', wrap: (t: string) => `<h2>${t || 'Título'}</h2>` },
  { icon: Quote, label: 'Citação', wrap: (t: string) => `<blockquote>${t || 'Citação'}</blockquote>` },
  { icon: List, label: 'Lista', wrap: () => '<ul><li>Item 1</li><li>Item 2</li></ul>' },
  { icon: ListOrdered, label: 'Lista numerada', wrap: () => '<ol><li>Item 1</li><li>Item 2</li></ol>' },
  { icon: Link2, label: 'Link', wrap: (t: string) => `<a href="${t || '#'}">${t || 'link'}</a>` },
] as const

export function RichTextEditor({
  value,
  onChange,
  label = 'Conteúdo',
  error,
  placeholder = 'Escreva o conteúdo...',
  minHeight = '200px',
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function applyFormat(wrap: (selection: string) => string) {
    const el = textareaRef.current
    if (!el) return

    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const formatted = wrap(selected)
    const next = value.slice(0, start) + formatted + value.slice(end)
    onChange(next)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="overflow-hidden rounded-xl border border-input bg-background">
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border/60 bg-muted/40 p-1.5">
          {toolbarButtons.map(({ icon: Icon, label: btnLabel, wrap }) => (
            <Button
              key={btnLabel}
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => applyFormat(wrap)}
              title={btnLabel}
              aria-label={btnLabel}
            >
              <Icon className="size-4" />
            </Button>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => onChange('')}
            title="Limpar"
            aria-label="Limpar conteúdo"
          >
            <Undo2 className="size-4" />
          </Button>
        </div>

        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'min-h-[200px] resize-y rounded-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0',
          )}
          style={{ minHeight }}
        />

        {value && (
          <div className="border-t border-border/60 bg-muted/20 p-4">
            <p className="mb-2 font-ui text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Pré-visualização
            </p>
            <div
              className="prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-brand-amber [&_blockquote]:pl-4 [&_h2]:font-heading [&_h2]:text-lg"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-brand-red" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
