export type HistoriasSectionColor = 'red' | 'amber' | 'yellow' | 'orange'

export interface HistoriasSection {
  id: string
  title: string
  href: string
  color: HistoriasSectionColor
}

const wixBase = 'https://static.wixstatic.com/media'

function wixPoster(fileId: string, width = 1000) {
  const file = `${fileId}~mv2.png`
  return `${wixBase}/${file}/v1/fill/w_${width},h_${Math.round(width * 1.77)},q_90,usm_0.66_1.00_0.01/${file}`
}

const cartazIds = [
  '92a7cc_8dae3a1c65454bbcb832a9d450f751d9',
  '92a7cc_62e4c656790f41ee942e0981460439cc',
  '92a7cc_7ab920b9c1884a57a8a4cbb09632024b',
  '92a7cc_afe6e19f234a462894d70a6bdcd485ad',
]

export const historiasDoRecreioContent = {
  title: 'Histórias do recreio',
  sections: [
    {
      id: 'cartazes',
      title: 'CARTAZES com HISTÓRIAS DO RECREIO',
      href: '/cartazes-com-historias-do-recreio',
      color: 'amber',
    },
    {
      id: 'video-rap',
      title: 'VIDEO RAP HISTÓRIAS DO RECREIO',
      href: '/video-rap-historias-do-recreio',
      color: 'orange',
    },
  ] satisfies HistoriasSection[],
  cartazes: {
    title: 'Histórias Fantásticas sobre o Recreio',
    images: cartazIds.map((id, index) => ({
      url: wixPoster(id),
      alt: `Cartaz com histórias do recreio — ${index + 1}`,
    })),
  },
}
