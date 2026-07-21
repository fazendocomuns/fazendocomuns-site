import { Mic } from 'lucide-react'
import type { NoticiaAudio } from '@/features/noticias/data/noticiasContent'

interface NoticiaAudioPlayerProps {
  audio: NoticiaAudio
}

export function NoticiaAudioPlayer({ audio }: NoticiaAudioPlayerProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft">
      <div className="flex items-start gap-4 border-b border-border/60 bg-brand-orange/10 p-6 md:p-8">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-soft">
          <Mic className="size-7" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="font-ui text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Áudio
          </p>
          <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-foreground md:text-xl">
            {audio.label}
          </h3>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Duração: {audio.duration}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <audio controls preload="metadata" className="w-full" aria-label={audio.label}>
          <source src={audio.url} type="audio/mpeg" />
          Seu navegador não suporta reprodução de áudio.
        </audio>
      </div>
    </article>
  )
}
