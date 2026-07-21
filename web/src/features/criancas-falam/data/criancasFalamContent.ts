const wixBase = 'https://static.wixstatic.com/media'

function wixImage(
  fileId: string,
  ext: 'png' | 'jpeg' | 'jpg',
  width: number,
  height: number,
) {
  const file = `${fileId}~mv2.${ext}`
  return `${wixBase}/${file}/v1/fill/w_${width},h_${height},al_c,q_90,usm_0.66_1.00_0.01/${file}`
}

export interface CriancasFalamQuote {
  text: string
  tail: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  size?: 'sm' | 'md' | 'lg'
  positionClass?: string
}

export interface CriancasFalamSection {
  id: string
  title: string
  description: string
  layout: 'scattered' | 'diagonal' | 'stack'
  quotes: CriancasFalamQuote[]
  color: 'amber' | 'red' | 'orange'
}

export const criancasFalamContent = {
  title: 'As crianças falam',
  heading: 'AS CRIANÇAS FALAM',
  manifesto:
    'O que temos em comum é que todos nós queremos ir para o recreio!',
  heroImage: wixImage('92a7cc_c8d86dadb3b1411eb9d50ab8d4ae920a', 'jpg', 1200, 1600),
  heroImageAlt: 'Crianças em atividade escolar',
  sections: [
    {
      id: 'importancia',
      title: 'Por que o recreio é importante?',
      description:
        'Ao serem perguntadas sobre a importância do recreio, as crianças dizem:',
      layout: 'scattered',
      color: 'red',
      quotes: [
        {
          text: 'Ninguém aguenta ficar na sala respirando esse ar tóxico',
          tail: 'bottom-left',
          positionClass: 'md:-rotate-2 md:justify-self-start',
        },
        {
          text: 'Para descansar a mente',
          tail: 'bottom-right',
          positionClass: 'md:rotate-1 md:justify-self-end',
        },
        {
          text: 'A gente não pode só estudar na escola',
          tail: 'bottom-left',
          positionClass: 'md:-rotate-1 md:justify-self-start',
        },
        {
          text: 'É um direito das crianças',
          tail: 'bottom-right',
          positionClass: 'md:rotate-2 md:justify-self-end',
        },
        {
          text: 'Ajuda no aprendizado pois precisamos pegar vitamina D',
          tail: 'bottom-left',
        },
        {
          text: 'Possibilita o contato com a natureza',
          tail: 'bottom-right',
        },
        {
          text: 'Importante para que as crianças que moram em territórios de favelas, com invasões policiais, ou em condomínios pudessem ter um tempo para brincar',
          tail: 'bottom-left',
          size: 'lg',
          positionClass: 'md:col-span-2 md:max-w-3xl md:justify-self-center',
        },
        {
          text: 'Para colocarmos as fofocas em dia',
          tail: 'bottom-right',
        },
        {
          text: 'Ajuda-nos psicologicamente e deixa todos mais felizes',
          tail: 'bottom-left',
        },
        {
          text: '[...] é fundamental para estabelecermos relações com os colegas [...]',
          tail: 'bottom-right',
        },
        {
          text: 'É importante porque gastaremos nossas energias',
          tail: 'bottom-left',
        },
        {
          text: '[...] o tempo de brincar no recreio é importante para não ficarmos, na sala, batendo a cabeça nos livros',
          tail: 'bottom-right',
          size: 'lg',
          positionClass: 'md:col-span-2 md:max-w-3xl md:justify-self-center',
        },
      ],
    },
    {
      id: 'condicoes',
      title: 'Como é o recreio na sua escola?',
      description:
        'Sobre as condições atuais do recreio na sua escola, os estudantes pontuam:',
      layout: 'scattered',
      color: 'amber',
      quotes: [
        {
          text: 'O pouco tempo não é suficiente para comer e brincar. Muitos de nós comem com pressa ou não comem para aproveitar o tempo livre para brincar e conversar.',
          tail: 'bottom-left',
          size: 'lg',
          positionClass: 'md:col-span-2 md:max-w-3xl md:justify-self-center',
        },
        {
          text: 'O espaço do recreio é muito pequeno e parece ainda menor por não podermos usar a quadra. Quando faz muito sol ou chove, a gente não consegue ficar na parte descoberta e precisamos ficar na área coberta, que é muito pequena.',
          tail: 'bottom-right',
          size: 'lg',
          positionClass: 'md:col-span-2 md:max-w-3xl md:justify-self-center',
        },
        {
          text: 'Só podemos comer ou conversar. Não nos deixam jogar bola, correr, usar celular ou jogar cartas, por exemplo.',
          tail: 'bottom-left',
          size: 'lg',
        },
        {
          text: 'É melhor ter um recreio ruim do que não ter recreio nenhum.',
          tail: 'bottom-right',
        },
        {
          text: 'Eu nunca tive recreio, vou contar como foi essa experiência',
          tail: 'bottom-left',
        },
      ],
    },
    {
      id: 'enderecamento',
      title: 'Como se dá o endereçamento da demanda do recreio aos adultos?',
      description:
        'Os relacionamentos intergeracionais podem ser desafiadores, sobretudo quando existem insatisfações em jogo. Sobre o compartilhamento de demandas com os adultos, as crianças dizem:',
      layout: 'diagonal',
      color: 'orange',
      quotes: [
        {
          text: 'Não somos ouvidos quando tentamos reclamar com a direção da escola, eles dizem que não podem fazer nada. Se nem eles podem, imagina a gente?',
          tail: 'bottom-left',
          size: 'lg',
        },
        {
          text: 'A direção ou vai começar a gostar ou vai odiar a gente.',
          tail: 'bottom-right',
        },
        {
          text: 'As crianças têm medo da reação dos adultos e se perguntam: A direção sabe o que estamos fazendo?',
          tail: 'bottom-left',
          size: 'lg',
        },
        {
          text: 'Não adianta reclamar porque sempre fazemos isso e nada muda na escola.',
          tail: 'bottom-right',
        },
      ],
    },
    {
      id: 'merecer',
      title: 'É preciso merecer o recreio?',
      description: 'Sobre isso, as crianças dizem:',
      layout: 'scattered',
      color: 'red',
      quotes: [
        {
          text: 'Para ter direito ao recreio, temos que nos comportar.',
          tail: 'bottom-left',
        },
        {
          text: 'Precisamos ser educadas, prestar atenção na aula, não conversar e não brigar para todos terem recreio.',
          tail: 'bottom-right',
          size: 'lg',
        },
        {
          text: 'Mesmo que a gente não colabore com o andamento da aula, não é justo que tirem o recreio.',
          tail: 'bottom-left',
          size: 'lg',
        },
        {
          text: 'Quando tiram nosso recreio como castigo, sentimos muita raiva e tristeza.',
          tail: 'bottom-right',
        },
      ],
    },
  ] satisfies CriancasFalamSection[],
}
