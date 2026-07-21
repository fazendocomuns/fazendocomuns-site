'use client'

import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShareChannel {
  id: string
  label: string
  className: string
  getHref: (url: string, title: string, text: string) => string
}

const shareChannels: ShareChannel[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/50',
    getHref: (url, _title, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    className:
      'border-blue-200 bg-blue-50 text-blue-800 hover:border-blue-300 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:border-blue-700 dark:hover:bg-blue-900/50',
    getHref: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'x',
    label: 'X',
    className:
      'border-border bg-muted text-foreground hover:border-border hover:bg-muted/80',
    getHref: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    className:
      'border-sky-200 bg-sky-50 text-sky-900 hover:border-sky-300 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200 dark:hover:border-sky-700 dark:hover:bg-sky-900/50',
    getHref: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
]

interface ShareButtonsProps {
  title: string
  text?: string
  url?: string
  heading?: string
  description?: string
  className?: string
}

export function ShareButtons({
  title,
  text,
  url: urlProp,
  heading = 'Compartilhar esta notícia',
  description = 'Espalhe nas redes sociais ou copie o link para enviar a quem quiser.',
  className,
}: ShareButtonsProps) {
  const [url] = useState(
    () => urlProp ?? (typeof window !== 'undefined' ? window.location.href : ''),
  )
  const [copied, setCopied] = useState(false)
  const canNativeShare =
    typeof navigator !== 'undefined' && Boolean(navigator.share)

  const shareText = text ?? title

  async function handleCopy() {
    if (!url) return

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copie o link da notícia:', url)
    }
  }

  async function handleNativeShare() {
    if (!url || !navigator.share) return

    try {
      await navigator.share({
        title,
        text: shareText,
        url,
      })
    } catch {
      // usuário cancelou ou o navegador bloqueou
    }
  }

  return (
    <aside
      className={cn(
        'rounded-2xl border border-border/60 bg-muted p-6 shadow-soft md:p-8',
        className,
      )}
      aria-label="Compartilhar"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/15 text-brand-orange">
          <Share2 className="size-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">
            {heading}
          </h3>
          <p className="mt-1 font-body text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {shareChannels.map((channel) => (
          <Button
            key={channel.id}
            variant="outline"
            size="sm"
            className={cn('rounded-full border-2 font-ui font-semibold', channel.className)}
            asChild
            disabled={!url}
          >
            <a
              href={url ? channel.getHref(url, title, shareText) : undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              {channel.label}
            </a>
          </Button>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full border-2 border-brand-orange/30 bg-brand-orange/10 font-ui font-semibold text-brand-orange hover:bg-brand-orange/20"
          onClick={handleCopy}
          disabled={!url}
        >
          {copied ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              Link copiado
            </>
          ) : (
            <>
              <Link2 className="size-4" aria-hidden="true" />
              Copiar link
            </>
          )}
        </Button>

        {canNativeShare ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full border-2 font-ui font-semibold"
            onClick={handleNativeShare}
            disabled={!url}
          >
            <Share2 className="size-4" aria-hidden="true" />
            Mais opções
          </Button>
        ) : null}
      </div>
    </aside>
  )
}
