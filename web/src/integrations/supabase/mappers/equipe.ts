import type {
  Assistente,
  Colaborador,
  Consultor,
  EntityStatus,
  Pesquisador,
} from '@/features/admin/types'
import type {
  AssistenteFormValues,
  ColaboradorFormValues,
  ConsultorFormValues,
  PesquisadorFormValues,
} from '@/features/admin/schemas'
import type { Database } from '@/types/database'

type PesquisadorRow = Database['public']['Tables']['pesquisadores']['Row']
type AssistenteRow = Database['public']['Tables']['assistentes']['Row']
type ConsultorRow = Database['public']['Tables']['consultores']['Row']
type ColaboradorRow = Database['public']['Tables']['colaboradores']['Row']

function mapBase(row: { id: string; display_order: number; status: EntityStatus; created_at: string; updated_at: string }) {
  return {
    id: row.id,
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapPesquisador(row: PesquisadorRow): Pesquisador {
  return {
    ...mapBase(row),
    name: row.name,
    photo: row.photo_url,
    role: row.role,
    miniBio: row.mini_bio,
    fullBio: row.full_bio,
    email: row.email,
    linkedin: row.linkedin,
    lattes: row.lattes,
  }
}

export function mapAssistente(row: AssistenteRow): Assistente {
  return {
    ...mapBase(row),
    name: row.name,
    photo: row.photo_url,
    role: row.role,
    miniBio: row.mini_bio,
    fullBio: row.full_bio,
    email: row.email,
    linkedin: row.linkedin,
  }
}

export function mapConsultor(row: ConsultorRow): Consultor {
  return {
    ...mapBase(row),
    name: row.name,
    photo: row.photo_url,
    role: row.role,
    institution: row.institution,
    bio: row.bio,
    email: row.email,
    linkedin: row.linkedin,
    lattes: row.lattes ?? '',
  }
}

export function mapColaborador(row: ColaboradorRow): Colaborador {
  return {
    ...mapBase(row),
    name: row.name,
    photo: row.photo_url,
    institution: row.institution,
    role: row.role,
    description: row.description,
    website: row.website,
  }
}

export function pesquisadorFormToInsert(
  values: PesquisadorFormValues,
  slug: string,
): Database['public']['Tables']['pesquisadores']['Insert'] {
  return {
    name: values.name,
    slug,
    photo_url: values.photo,
    role: values.role,
    mini_bio: values.miniBio,
    full_bio: values.fullBio,
    email: values.email,
    linkedin: values.linkedin || '',
    lattes: values.lattes || '',
    display_order: values.displayOrder,
    status: values.status,
    group_key: 'coordenacao',
  }
}

export function pesquisadorFormToUpdate(
  values: PesquisadorFormValues,
): Database['public']['Tables']['pesquisadores']['Update'] {
  return {
    name: values.name,
    photo_url: values.photo,
    role: values.role,
    mini_bio: values.miniBio,
    full_bio: values.fullBio,
    email: values.email,
    linkedin: values.linkedin || '',
    lattes: values.lattes || '',
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function assistenteFormToInsert(
  values: AssistenteFormValues,
  slug: string,
): Database['public']['Tables']['assistentes']['Insert'] {
  return {
    name: values.name,
    slug,
    photo_url: values.photo,
    role: values.role,
    mini_bio: values.miniBio,
    full_bio: values.fullBio,
    email: values.email,
    linkedin: values.linkedin || '',
    display_order: values.displayOrder,
    status: values.status,
    group_key: 'assistentes',
  }
}

export function assistenteFormToUpdate(
  values: AssistenteFormValues,
): Database['public']['Tables']['assistentes']['Update'] {
  return {
    name: values.name,
    photo_url: values.photo,
    role: values.role,
    mini_bio: values.miniBio,
    full_bio: values.fullBio,
    email: values.email,
    linkedin: values.linkedin || '',
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function consultorFormToInsert(
  values: ConsultorFormValues,
  slug: string,
): Database['public']['Tables']['consultores']['Insert'] {
  return {
    name: values.name,
    slug,
    photo_url: values.photo,
    role: values.role,
    institution: values.institution,
    bio: values.bio,
    email: values.email,
    linkedin: values.linkedin || '',
    lattes: values.lattes || '',
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function consultorFormToUpdate(
  values: ConsultorFormValues,
): Database['public']['Tables']['consultores']['Update'] {
  return {
    name: values.name,
    photo_url: values.photo,
    role: values.role,
    institution: values.institution,
    bio: values.bio,
    email: values.email,
    linkedin: values.linkedin || '',
    lattes: values.lattes || '',
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function colaboradorFormToInsert(
  values: ColaboradorFormValues,
  slug: string,
): Database['public']['Tables']['colaboradores']['Insert'] {
  return {
    name: values.name,
    slug,
    photo_url: values.photo,
    institution: values.institution,
    role: values.role,
    description: values.description,
    website: values.website || '',
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function colaboradorFormToUpdate(
  values: ColaboradorFormValues,
): Database['public']['Tables']['colaboradores']['Update'] {
  return {
    name: values.name,
    photo_url: values.photo,
    institution: values.institution,
    role: values.role,
    description: values.description,
    website: values.website || '',
    display_order: values.displayOrder,
    status: values.status,
  }
}
