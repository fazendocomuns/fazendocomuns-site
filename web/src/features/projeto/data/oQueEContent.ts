export interface OQueEImage {
  src: string
  alt: string
  caption?: string
}

export interface OQueESection {
  id: string
  title?: string
  paragraphs: string[]
  image?: OQueEImage
  imagePosition?: 'left' | 'right'
}

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

export const oQueEContent = {
  title: 'O que é',
  subtitle:
    'Projeto de pesquisa e intervenção social sobre os comuns produzidos nas escolas públicas.',
  sections: [
    {
      id: 'introducao',
      imagePosition: 'right',
      image: {
        src: wixImage('92a7cc_6c801e721f6b47f09ddb991436012b68', 'jpeg', 800, 600),
        alt: 'Estudante segurando cartaz ilustrado do projeto Fazendo Comuns na escola',
        caption: 'Cartaz produzido no âmbito do projeto nas escolas parceiras.',
      },
      paragraphs: [
        'Este é um projeto de pesquisa e intervenção social que investiga como ‘comuns’ são produzidos nas trocas entre os indivíduos nos lugares e espaços em que habitam e convivem. A noção de comuns aqui significa, utilizando a inspiração de autores como Gustavo Esteva e Massimo de Angelis, um conjunto de ações e valores que são estabelecidos pela ação, afetos e a experiência coletiva de um grupo social. Os comuns não são recursos que se usam, mas formas coletivas de abraçar, preservar e lutar pelo que é importante na vida com os outros.',
        'Estamos investigando os comuns na escola. E nestas investigações, as crianças e os adolescentes têm nos mostrado que o espaço escolar, valorizado por eles, mas que também é frequentemente sentido como uma prisão, deixa a desejar em muitos aspectos. Um deles é a falta do recreio escolar, e de um espaço apropriado para o recreio. De várias maneiras, e de forma orgânica, consistente e convincente, os estudantes têm apontado como a inexistência do recreio, ou sua duração diminuta, e outras tantas dificuldades impedem seus momentos de brincadeiras, conversas e liberdade dentro da escola.',
        'O recreio escolar se coloca como um “comum” dos estudantes. Em escolas muito distantes uma da outra, a reivindicação dos estudantes é a mesma: é importante ter o recreio como tempo livre, em que tenham tempo e lugar para brincarem, relaxarem e conversarem. Mesmo sem saberem o que se passa nas demais escolas públicas do município do Rio de Janeiro, os estudantes de nossas pesquisas convergem no sentimento e na visão de que o recreio escolar é uma demanda importante na sua vida escolar.',
        'No entanto, o ‘comum’, ou os ‘comuns’ dos estudantes, têm que ganhar visibilidade pública para serem levados em conta. Além disso, em se tratando da vida escolar, a pauta dos comuns dos estudantes deve se endereçar a outros atores sociais, como professoras/es, funcionários, pais e gestores, para que, coletivamente, possam se construir e selar acordos e mudanças. Principalmente os, e as professoras, que levam a cabo diretamente a responsabilidade da tarefa da transmissão, eles e elas são os que mais podem compreender como as expectativas e ansiedades dos estudantes interferem e impactam na aprendizagem e na boa convivência na escola. Enfim, os ‘comuns’ dos estudantes – como pauta intra-geracional (dos estudantes e para eles) – concerne também os adultos, tornando-se uma pauta co-geracional que interessa a todos os outros que estão diretamente, ou não, envolvidos no processo co-geracional da educação.',
      ],
    },
    {
      id: 'historico',
      title: 'Histórico do projeto',
      imagePosition: 'left',
      image: {
        src: wixImage('92a7cc_f89609480d1b41ea997eec2664bda3c0', 'png', 1200, 600),
        alt: 'Materiais e registros do Projeto Combinação com crianças em escola pública',
        caption: 'Registro de atividades do Projeto Combinação nas escolas municipais.',
      },
      paragraphs: [
        'Este projeto de pesquisa e intervenção social é resultado de um acúmulo de pesquisas anteriores sobre a participação social e política de crianças e jovens. Essas pesquisas têm sido divulgadas sob a forma de artigos, capítulos de livros e livros (ver Produções). Ele também é resultado das interações acadêmicas e científicas da coordenadora do projeto com outros grupos nacionais e internacionais que pesquisam a construção da subjetividade da criança e suas experiências nos seus diversos contextos sociais, culturais e políticos. Um desses grupos – ao qual se vinculam a coordenadora e os consultores do presente projeto – é o NIAJ/UFRJ, Núcleo de Estudos da Infância, Adolescência e Juventude da Universidade Federal do Rio de Janeiro.',
        'Mais recentemente, o presente projeto se apoia nos resultados do Projeto de extensão intitulado “Combinação”. O Projeto Combinação visou criar oportunidades para as crianças discutirem entre si algumas situações escolares relevantes (por exemplo, que mudanças gostariam de ver na escola) e encaminharem uma resposta coletiva sobre isso. Através de folhetos ilustrados, as crianças discutiam as situações e se posicionavam em relação a questões sobre os espaços e os objetos da escola, como agiam e podiam agir nos diferentes lugares, o que pensavam sobre mudanças importantes que deveriam ocorrer na escola.',
        'O Projeto Combinação ocorreu durante o segundo semestre de 2019 e, em consequência da pandemia, foi retomado somente em 2022, ao longo de todo aquele ano. A investigação compreendeu três CREs (Coordenadorias Regionais de Educação) – a 1ª, 2ª e 3ª CREs, da Secretaria Municipal de Educação – em que 2413 estudantes participaram da pesquisa, 110 turmas de 5º e 6º anos, provenientes de 34 escolas públicas municipais.',
      ],
    },
    {
      id: 'qualificacao',
      title: 'Qualificação e credenciamento do projeto',
      imagePosition: 'right',
      image: {
        src: wixImage('92a7cc_80d9fd8cce1c42678811f1b19b959797', 'png', 1200, 662),
        alt: 'Logos de apoio e realização: FAPERJ, CNPq e Prefeitura do Rio — Educação',
      },
      paragraphs: [
        'Este projeto de pesquisa intitula-se “Fazendo Comuns: a educação como projeto intra- e co-geracional”, aprovado pelo Edital Pró-Humanidades do CNPQ (Conselho Nacional de Desenvolvimento Científico e Tecnológico, do Ministério da Ciência, Tecnologia e Inovações), processo n. 409568/2022-8.',
        'Este projeto de pesquisa faz parte do projeto de pesquisa mais amplo intitulado “Infâncias do Sul Global: teoria, pesquisa e formação de redes”, aprovado pelo Edital Cientistas do Nosso Estado da FAPERJ (Fundação Carlos Chagas de Amparo à Pesquisa do Estado do Rio de Janeiro), processo n. Proc. N.º 201.067/2022.',
        'Este projeto de pesquisa foi aprovado pelo Setor de Convênios e Pesquisas da Subsecretaria de Ensino da Secretaria Municipal de Educação (SME-PRO-2022/25632).',
      ],
    },
  ] satisfies OQueESection[],
}
