import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowRight } from 'lucide-react'
import type { Editorial } from '@/features/editoriais/data/editoriaisContent'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/badge'

interface EditorialCardProps {
  editorial: Editorial
  index: number
}

export function EditorialCard({ editorial, index }: EditorialCardProps) {
  return (
    <ScrollReveal delay={Math.min(index * 0.08, 0.4)} className="h-full">
      <article className="group h-full rounded-2xl border border-border/60 bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium motion-reduce:transform-none md:p-8">
        <Badge variant="red" className="mb-4 font-ui uppercase tracking-wider">
          Editorial {editorial.number}
        </Badge>

        <h2 className="font-heading text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-brand-red md:text-3xl">
          <Link href={`/editoriais/${editorial.slug}`}>
            {editorial.subtitle ?? editorial.title}
          </Link>
        </h2>

        <p className="mt-4 font-body text-base leading-relaxed text-justify text-muted-foreground md:text-lg">
          {editorial.excerpt}
        </p>

        <Link
          href={`/editoriais/${editorial.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-brand-red transition-all group-hover:gap-2.5 hover:underline"
        >
          Leia mais
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </article>
    </ScrollReveal>
  )
}
