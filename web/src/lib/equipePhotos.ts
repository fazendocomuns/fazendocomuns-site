/** Fotos oficiais da equipe no Storage (`biblioteca-de-imagens/equipes`). */

const supabaseStorage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public'

const equipesBase = `${supabaseStorage}/biblioteca-de-imagens/equipes`

/** Usada quando a pessoa não tem foto própria. */
export const FOTO_GENERICA_EQUIPE = `${equipesBase}/foto-generica.png`

export function equipePhoto(folder: 'equipe' | 'consultores' | 'colaboradores', file: string) {
  return `${equipesBase}/${folder}/${file}`
}

/** Garante URL pública do Supabase; placeholders locais caem na genérica. */
export function resolveEquipePhotoUrl(photoUrl: string | null | undefined): string {
  const value = photoUrl?.trim() ?? ''
  if (!value) return FOTO_GENERICA_EQUIPE
  if (value.includes('/imgs/') || value.includes('placeholder') || value.includes('icone-placeholder')) {
    return FOTO_GENERICA_EQUIPE
  }
  return value
}
