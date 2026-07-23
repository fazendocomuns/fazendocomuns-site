import { asCriancasFalamPhotos } from '@/features/eventos/data/asCriancasFalamContent'

export type FotosGalleryColor = 'amber' | 'red' | 'orange' | 'yellow'

export interface FotosGallery {
  id: string
  title: string
  href: string
  color: FotosGalleryColor
  cover: string
  images: string[]
}

export const fotosContent = {
  title: 'Fotos',
  intro:
    'Registros fotográficos de pesquisas de campo, eventos e atividades nas escolas públicas.',
  galleries: [
    {
      id: 'atividades-em-roda',
      title: 'Atividades em roda',
      href: '/multimidia/fotos/atividades-em-roda',
      color: 'amber',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/Domingos-Bebiano-001.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/Domingos-Bebiano-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Castelnuovo-010.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Castelnuovo-011.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Castelnuovo-012.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-002.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-003.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-005.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-006.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-007.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-008.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/atividades-em-roda/EM-Senegal-009.jpg',
      ],
    },
    {
      id: 'aula-e-palestra',
      title: 'Aula e Palestra',
      href: '/multimidia/fotos/aula-e-palestra',
      color: 'red',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/Celestino-da-Silva-001.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/Celestino-da-Silva-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/Domingos-Bebiano-006.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/EM-Castelnuovo-002.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/EM-Mourao-FIlho-Devolutiva-003.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/EM-Mourao-FIlho-Devolutiva-004.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/EM-Senegal-005.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/IMG-007.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/IMG-008.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/aula-e-palestra/IMG-009.jpg',
      ],
    },
    {
      id: 'brincadeira',
      title: 'Brincadeira',
      href: '/multimidia/fotos/brincadeira',
      color: 'orange',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/Domingos-Bebiano-003.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/Domingos-Bebiano-003.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Castelnuovo-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Castelnuovo-002.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Castelnuovo-004.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Castelnuovo-005.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Castelnuovo-010.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Floriano-Peixoto-006.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/EM-Floriano-Peixoto-007.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/img-008.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/img-009.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/img-011.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/brincadeira/img-012.jpg',
      ],
    },
    {
      id: 'cartazes-sobre-recreio',
      title: 'Cartazes sobre Recreio',
      href: '/multimidia/fotos/cartazes-sobre-recreio',
      color: 'yellow',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/EM-Castelnuovo-005.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/EM-Castelnuovo-005.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/EM-Castelnuovo-006.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/EM-Castelnuovo-007-2.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/EM-Castelnuovo-007.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/EM-Castelnuovo-008.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/img-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/img-003.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/img-004.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/O-recreio-alienigena-009.png',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/O-recreio-em-Marte-010.png',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/O-recreio-em-marte-missao-011.png',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/cartazes-sobre-recreio/O-recreio-na-Lua-012.png',
      ],
    },
    {
      id: 'corredores-salas-e-murais',
      title: 'Corredores, Salas e Murais',
      href: '/multimidia/fotos/corredores-salas-e-murais',
      color: 'amber',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Affonso-Penna-006.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Affonso-Penna-006.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Affonso-Penna-007.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Calouste-Gulbenkian-008.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Castelnuovo-013.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Equador-013.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Equador-014.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Reverendo-Martin-Luther-King-009.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Reverendo-Martin-Luther-King-010.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Reverendo-Martin-Luther-King-012-2.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/EM-Reverendo-Martin-Luther-King-012.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/Gustavo-Armbrust-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/Gustavo-Armbrust-002.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/Gustavo-Armbrust-003.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/Gustavo-Armbrust-004.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/corredores-salas-murais/Gustavo-Armbrust-005.jpg',
      ],
    },
    {
      id: 'fazendo-comuns-desenho-logo',
      title: 'Fazendo Comuns (desenho logo)',
      href: '/multimidia/fotos/fazendo-comuns-desenho-logo',
      color: 'red',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/Domingos-Bebiano-001.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/Domingos-Bebiano-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/Domingos-Bebiano-002.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/Domingos-Bebiano-003.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/img-004.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/img-005.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/fazendo-comuns-desenho-logo/img-006.jpg',
      ],
    },
    {
      id: 'home-do-site',
      title: 'Home do Site',
      href: '/multimidia/fotos/home-do-site',
      color: 'orange',
      cover: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/home-site/EM-Castelnuovo-001.jpg',
      images: [
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/home-site/EM-Castelnuovo-001.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/home-site/EM-Castelnuovo-002.jpg',
        'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/home-site/EM-Castelnuovo-003.jpg',
      ],
    },
    {
      id: 'evento-as-criancas-falam',
      title: 'As Crianças Falam — fotos do evento',
      href: '/multimidia/fotos/evento-as-criancas-falam',
      color: 'amber',
      cover: asCriancasFalamPhotos[0],
      images: [...asCriancasFalamPhotos],
    },
  ] satisfies FotosGallery[],
}

export function getFotosGalleryById(id: string): FotosGallery | undefined {
  return fotosContent.galleries.find((gallery) => gallery.id === id)
}
