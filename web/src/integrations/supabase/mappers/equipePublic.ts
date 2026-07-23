import type { Consultant } from '@/features/projeto/data/consultoresContent'
import type { TeamMember } from '@/features/projeto/data/equipeContent'
import type { Database } from '@/types/database'
import { resolveEquipePhotoUrl } from '@/lib/equipePhotos'

type PesquisadorRow = Database['public']['Tables']['pesquisadores']['Row']
type AssistenteRow = Database['public']['Tables']['assistentes']['Row']
type ConsultorRow = Database['public']['Tables']['consultores']['Row']
type ColaboradorRow = Database['public']['Tables']['colaboradores']['Row']

function bioToRoles(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function mapPesquisadorRowToTeamMember(row: PesquisadorRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    image: resolveEquipePhotoUrl(row.photo_url),
    roles: [],
    bio: row.full_bio,
  }
}

export function mapAssistenteRowToTeamMember(row: AssistenteRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    image: resolveEquipePhotoUrl(row.photo_url),
    roles: bioToRoles(row.full_bio),
  }
}

export function mapColaboradorRowToTeamMember(row: ColaboradorRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    image: resolveEquipePhotoUrl(row.photo_url),
    roles: bioToRoles(row.description),
  }
}

export function mapConsultorRowToConsultant(row: ConsultorRow): Consultant {
  return {
    id: row.id,
    name: row.name,
    image: resolveEquipePhotoUrl(row.photo_url),
    roles: bioToRoles(row.bio),
    linkedin: row.linkedin?.trim() || undefined,
    lattes: row.lattes?.trim() || undefined,
  }
}
