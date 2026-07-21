const wixBase = 'https://static.wixstatic.com/media'

function wixImage(
  fileId: string,
  ext: 'png' | 'jpeg' | 'jpg',
  width: number,
  height?: number,
) {
  const file = `${fileId}~mv2.${ext}`
  if (height) {
    return `${wixBase}/${file}/v1/fill/w_${width},h_${height},al_c,q_85,usm_0.66_1.00_0.01/${file}`
  }
  return `${wixBase}/${file}/v1/fit/w_${width},al_c,q_85,usm_0.66_1.00_0.01/${file}`
}

export interface ProfessoresFalamQuote {
  text: string
  tail: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  size?: 'sm' | 'md' | 'lg'
  positionClass?: string
}

export interface ProfessoresFalamSection {
  id: string
  title: string
  description: string
  layout: 'scattered' | 'diagonal' | 'stack'
  quotes: ProfessoresFalamQuote[]
  color: 'amber' | 'red' | 'orange'
}

export const professoresFalamContent = {
  title: 'As professoras e os professores falam',
  heading: 'AS PROFESSORAS E OS PROFESSORES FALAM',
  subtitle: 'Quando questionados sobre o recreio, o que os professores têm a falar?',
  heroImage: wixImage('92a7cc_a2ba7578408d4f7f9273cd76764c65f7', 'jpg', 1600, 900),
  heroImageAlt: 'Reportagem sobre o que professoras e professores falam sobre o recreio',
  sections: [
    {
      id: 'realidade-dos-professores',
      title: 'Realidade dos professores:',
      description:
        'Em um sistema estruturalmente deficiente, os professores denunciam um esvaziamento do sentido pedagógico da escola, que se corrompe por conta de tantos desvios de função e sobrecargas. A respeito disso, dizem:',
      layout: 'scattered',
      quotes: [
        {
          text: 'A escola está muito sozinha, nesse papel comunitário (...) a sensação que a gente tem mesmo é de abandono',
          tail: 'bottom-left',
          positionClass: 'md:-rotate-2 md:justify-self-start',
        },
        {
          text: 'Tudo é responsabilidade do professor: somos Bombril, temos mil e uma utilidades',
          tail: 'bottom-right',
          positionClass: 'md:rotate-1 md:justify-self-end',
        },
        {
          text: 'A culpa é sempre do professor: o professor tem medo do recreio: como é que eu vou levar o meu aluno pra brincar? E se acontecer alguma coisa com ele? Coisa essa que seria normal, porque criança cai, gente. Criança vai brincar pra cair. Cair faz parte do brincar. Como é que isso vai ser recebido?',
          tail: 'bottom-left',
          size: 'lg',
          positionClass: 'md:col-span-2 md:justify-self-center',
        },
      ],
      color: 'amber',
    },
    {
      id: 'tipo-de-recreio',
      title: 'De que tipo de recreio estamos falando?',
      description:
        'Questionados sobre o debate do recreio, essa pergunta sempre vem à tona. Como se define o recreio? Qual o seu valor formativo?',
      layout: 'diagonal',
      quotes: [
        {
          text: 'É o momento deles [estudantes]: vão comer (...) e vão ali ralar o joelho e sujar a roupa pra mãe lavar, ponto. É o que define recreio. Quinze a meia hora.',
          tail: 'bottom-left',
          size: 'lg',
        },
        {
          text: 'Eu acho o recreio um momento em que eles vão comer, dar uma descansada, extravasar, brincar e voltar pra matéria de novo',
          tail: 'bottom-right',
        },
        {
          text: 'Não fosse a merenda, não haveria um momento específico ao recreio',
          tail: 'bottom-left',
          positionClass: 'md:ml-auto md:max-w-sm',
        },
      ],
      color: 'red',
    },
    {
      id: 'regularidade-do-recreio',
      title: 'É possível pensar em uma regularidade do recreio?',
      description:
        'Diversas vezes, é constatado pelos professores a condicionalidade do recreio como estratégia de sobrevivência à realidade do ensino público. Em uma gangorra de direitos, deveres e valores meritocráticos, o recreio é reconhecido como um jogo de forças, interesses e perspectivas.',
      layout: 'scattered',
      quotes: [
        {
          text: 'A gente [professores] vive em um sistema de falências, e o recreio é o menor dos nossos problemas: é direito da criança ter professor, antes mesmo do recreio',
          tail: 'bottom-left',
          size: 'lg',
          positionClass: 'md:justify-self-start',
        },
        {
          text: 'É uma luta de garantias por direito, eu entendo isso: é o direito da criança ter recreio, nós não discordamos disso. Mas também é direito do professor dar uma aula de qualidade, que muitas vezes é sonegada pelo próprio Estado: quando faz você acumular funções; quando faz você ter que trabalhar em vários lugares diferentes, para poder fazer um salário de sobrevivência; quando faz você ter que dobrar de função sem ter nada registrado, mas dizendo que isso é função sua, porque a escola tem que garantir a lei… Só que não te dá condições de garantir a lei, então você lida com um trabalho sobrehumano.',
          tail: 'bottom-right',
          size: 'lg',
          positionClass: 'md:justify-self-end',
        },
        {
          text: 'Percebe que a gente tá utilizando o recreio para resolver outros problemas? O recreio virou moeda de troca.',
          tail: 'bottom-left',
          positionClass: 'md:-rotate-1 md:justify-self-start',
        },
        {
          text: 'A nossa profissão foi tão esvaziada de valor e sentido que às vezes a gente tem que usar esses mecanismos de combinação como estratégia de educação',
          tail: 'bottom-right',
          positionClass: 'md:rotate-1 md:justify-self-end',
        },
        {
          text: 'Esse direito já está garantido, só que também é preciso cumprir os combinados. Eles já começam com recreio. Eles podem perder o recreio ao longo do dia a depender deste comportamento. Não é que o recreio vai ser suprimido. A questão é que eles têm esse espaço, que normalmente é garantido para eles; talvez não da forma que eles imaginam que deveria ser, por questões de logística, por questões de espaço. Mas tem esse espaço garantido para eles. Às vezes o espaço é retirado, mas, quando isso acontece, tem uma voz muito maior do que o espaço totalmente garantido diariamente.',
          tail: 'bottom-left',
          size: 'lg',
          positionClass: 'md:col-span-2 md:justify-self-center',
        },
      ],
      color: 'orange',
    },
  ] satisfies ProfessoresFalamSection[],
}
