const logoBase =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/fazendocomuns-logo'

const logo = (file: string) => `${logoBase}/${file}`

export interface PartnerLogo {
  src: string
  alt: string
}

export interface PartnerGroup {
  id: string
  title: string
  logos: PartnerLogo[]
}

export const parceirosContent = {
  title: 'Parceiros',
  subtitle:
    'Instituições parceiras que apoiam e viabilizam as pesquisas e intervenções do projeto Fazendo Comuns.',
  groups: [
    {
      id: 'sme-rio',
      title: 'Secretaria Municipal de Educação (SME) da cidade do Rio',
      logos: [
        {
          src: logo('logo-sme.png'),
          alt: 'Logo da Secretaria Municipal de Educação do Rio de Janeiro',
        },
      ],
    },
    {
      id: 'cres',
      title: 'CREs — Coordenadorias Regionais de Educação',
      logos: [
        { src: logo('logo-cre-1.png'), alt: 'Logo da Coordenadoria Regional de Educação 1' },
        { src: logo('logo-cre-2.png'), alt: 'Logo da Coordenadoria Regional de Educação 2' },
        { src: logo('logo-cre-3.png'), alt: 'Logo da Coordenadoria Regional de Educação 3' },
      ],
    },
  ] satisfies PartnerGroup[],
}
