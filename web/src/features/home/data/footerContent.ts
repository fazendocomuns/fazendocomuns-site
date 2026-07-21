const wixBase = 'https://static.wixstatic.com/media'

function wixLogo(fileId: string, ext: 'png' | 'jpg' | 'jpeg', width: number, height: number) {
  const file = `${fileId}~mv2.${ext}`
  return `${wixBase}/${file}/v1/fill/w_${width},h_${height},al_c,q_90,usm_0.66_1.00_0.01/${file}`
}

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
        logo: wixLogo('92a7cc_91df9dcc8a2a41cca95f5cccd58296c9', 'png', 540, 540),
      },
    ] satisfies FooterPartnerLogo[],
    support: [
      {
        alt: 'Instituto de Psicologia — UFRJ',
        logo: wixLogo('92a7cc_8e24bf8a8a6a4369b580acf019d64e9f', 'png', 644, 296),
      },
      {
        alt: 'FAPERJ',
        logo: wixLogo('92a7cc_a8497b11294046d497c3af244191afc6', 'png', 296, 468),
      },
      {
        alt: 'Secretaria Municipal de Educação — Rio de Janeiro',
        logo: wixLogo('92a7cc_0a4e3e4856c54a46a91f901ff268cc9c', 'png', 818, 208),
      },
    ] satisfies FooterPartnerLogo[],
  },
}
