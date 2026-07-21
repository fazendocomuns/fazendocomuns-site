import type { PartnerGroup, PartnerLogo } from '@/features/projeto/data/parceirosContent'
import type { Database } from '@/types/database'

type GrupoRow = Database['public']['Tables']['parceiro_grupos']['Row']
type LogoRow = Database['public']['Tables']['parceiro_logos']['Row']
type LinkRow = Database['public']['Tables']['links_parceiros']['Row']

export function mapParceiroGrupo(
  grupo: GrupoRow,
  logos: LogoRow[],
): PartnerGroup {
  return {
    id: grupo.id,
    title: grupo.title,
    logos: logos.map(
      (logo): PartnerLogo => ({
        src: logo.logo_url,
        alt: logo.alt,
      }),
    ),
  }
}

export interface LinkParceiroItem {
  id: string
  title: string
  subtitle?: string
  highlight?: string
  description?: string
  links: { label: string; url: string }[]
}

export function mapLinkParceiro(row: LinkRow): LinkParceiroItem {
  const raw = Array.isArray(row.links) ? (row.links as { label: string; url?: string; href?: string }[]) : []
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    highlight: row.highlight ?? undefined,
    description: row.description ?? undefined,
    links: raw.map((link) => ({
      label: link.label,
      url: link.url ?? link.href ?? '',
    })),
  }
}
