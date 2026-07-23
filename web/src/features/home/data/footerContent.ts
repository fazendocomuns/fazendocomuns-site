const footerImg = (file: string) =>
  `https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/pagina-footer/${file}`

export interface FooterPartnerLogo {
  alt: string
  logo: string
  cellClassName?: string
}

export const footerContent = {
  address: {
    institution: 'Universidade Federal do Rio de Janeiro',
    campus: 'Campus da Praia Vermelha',
    street: 'Av. Pasteur, 250 – Urca, Rio de Janeiro',
  },
  email: 'comunicacao.fazendocomuns@gmail.com',
  instagram: 'https://www.instagram.com/fazendocomuns',
  partners: {
    realization: [
      {
        alt: 'Logo oficial UFRJ',
        logo: footerImg('ufrj-realizacao.png'),
      },
      {
        alt: 'NIAJ — Núcleo Interdisciplinar de Estudos da Infância, Adolescência e Juventude',
        logo: footerImg('niaj-realizacao.svg'),
      },
      {
        alt: 'Fazendo Comuns',
        logo: footerImg('fazendocomuns-em-pe-realizacao.png'),
      },
    ] satisfies FooterPartnerLogo[],
    support: [
      {
        alt: 'Instituto de Psicologia — UFRJ',
        logo: footerImg('IP-apoio.png'),
      },
      {
        alt: 'FAPERJ',
        logo: footerImg('faperj-apoio.png'),
      },
      {
        alt: 'Secretaria Municipal de Educação — Rio de Janeiro',
        logo: footerImg('sme-apoio.png'),
      },
      {
        alt: 'CFCH — UFRJ',
        logo: footerImg('cfch-apoio.png'),
      },
      {
        alt: 'CNPq',
        logo: footerImg('CNPq-apoio.png'),
      },
    ] satisfies FooterPartnerLogo[],
  },
}
