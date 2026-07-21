const wixBase = 'https://static.wixstatic.com/media'

function wixImage(
  fileId: string,
  ext: 'png' | 'jpeg' | 'jpg',
  width: number,
  height: number,
) {
  const file = `${fileId}~mv2.${ext}`
  return `${wixBase}/${file}/v1/fill/w_${width},h_${height},al_c,q_85,usm_0.66_1.00_0.01/${file}`
}

const pdfUrl =
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_bf0d98f9dd2d48d0946095ae1602513f.pdf'

export const manifestoDasProfessorasContent = {
  title: 'Manifesto das professoras',
  heading: 'MANIFESTO DAS PROFESSORAS',
  cover: wixImage('92a7cc_43773de6cf74487687da4e2fbca15f11', 'png', 491, 660),
  coverAlt: 'Capa do Manifesto das professoras',
  downloadUrl: pdfUrl,
  downloadLabel: 'Download',
  bookHref: '/livros/manifesto-das-professoras',
}
