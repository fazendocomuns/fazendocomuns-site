export interface CombinacaoImage {
  url: string
  alt: string
}

export interface CombinacaoApresentacao {
  intro: string[]
  capa: CombinacaoImage
  metodologia: string[]
  livretosPreview: CombinacaoImage[]
}

export interface CombinacaoBook {
  id: string
  title: string
  paragraphs: string[]
  image: CombinacaoImage
}

const falatorioImg = (file: string) =>
  `https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/pagina-o-projeto-falatorio/${file}`

export const projetoCombinacaoContent = {
  title: 'O Projeto CombinAção',
  apresentacao: {
    intro: [
    'O Projeto CombinAção é um projeto de pesquisa e intervenção social, que teve início em 2019, dando continuidade a pesquisas anteriores sobre a participação social e política de crianças e jovens. Esse projeto dá sequência ao Projeto Falatório, que deu origem ao livro “Falatório: participação e democracia na escola” (Castro e Colaboradores, 2010) – acumulando, portanto, mais de uma década de pesquisas sobre esta questão da participação.',
    'O contexto contemporâneo demanda que as crianças se posicionem sobre inúmeras questões das suas vidas, principalmente as questões do âmbito privado. Neste sentido, essas perspectivas tendem a individualizar gostos, estilos e pensamentos, sem que, contudo, as crianças possam desenvolver disposições mais coletivas de ação e participação na sociedade. No entanto, fundamentando-nos nos resultados obtidos ao longo de mais de uma década, é na escola onde as crianças podem testar, experimentar e desenvolver perspectivas mais coletivas sobre suas vidas.',
    'A partir das pesquisas anteriores, temos visto que é possível a construção de “comuns” – perspectivas e sentidos coletivos construídos a partir da interação com os outros (Castro et al., 2001, 2002, 2010, 2015; Castro, Tavares, 2020). “Comuns” que podem ser intra-geracionais (relativos a uma mesma geração, por exemplo, as crianças entre elas), e “comuns” que podem ser co-geracionais (relativos a duas, ou mais, gerações, por exemplo, crianças e adultos). Na presente pesquisa, temos privilegiado o foco investigativo nos “comuns” intra-geracionais - das crianças entre si, ainda que tenhamos também investigado o que poderiam ser “comuns entre elas e os adultos”.',
    'O Projeto CombinAção põe em relevo a palavra da criança, o que significa pôr em prática – o que é frequentemente difícil por uma série de razões – escutar as demandas das crianças e criar condições para que seus endereçamentos possam ser encaminhados, discutidos, considerados e, eventualmente, realizados a partir do entrelaçamento com os interesses de outros segmentos (Castro, 2018; Castro et al., 2018).',
    'Nesse sentido, o Projeto CombinAção buscou convocar os adultos no diálogo com as crianças e empreender uma analítica da ‘subjetividade pública’ de crianças a partir da pergunta: como a criança compartilha e constrói um ‘mundo comum’ com os adultos? A partir dessa pergunta motivadora, buscou-se compreender de que formas, e em que condições, as crianças estabelecem modos de agir em conjunto e coletivamente e como participam da construção da vida social atualmente, especificamente na vida escolar.',
    'Sem a valorização da palavra da criança – deste sujeito que tem sido historicamente visto como ‘inferior’, ‘frágil’ e ‘incompetente cognitivamente’ – não se pode conceber um projeto educacional que seja mais democrático, e também, mais prazeroso e interessante, tanto para as crianças, como para os adultos. Por isso, o projeto se fundamenta na premissa de que a transmissão educacional deve se apoiar em colaboração mútua e co-participação. Nesse sentido, dá-se a importância ao que as crianças têm a falar sobre as atividades coletivas que empreendem juntos e que dá sentido às suas vivências na escola.',
    'Seguindo essa lógica, a partir de uma perspectiva teórica que compreende a ação como resultado de processos de construção e negociação de uma realidade social (Castro, Grisolia, 2016; Castro, 2016, 2018), pretendeu-se compreender como as crianças agem para fazer valer o que acham importante para elas, mesmo quando posicionadas em subordinação aos adultos como acontece no contexto escolar.',
    'A escola constitui um contexto particular e relevante para a investigação empírica da emergência de “comuns” para as crianças. Na escola as crianças se encontram com pares e podem usufruir de experiências marcantes e significativas com eles. Ao mesmo tempo, na relação com os adultos, sobretudo os/as professores/as, têm que aprender a negociar novas formas de relação intergeracional e valores.',
    'Em muitos casos, é a escola que proporciona os primeiros vínculos com outros que não lhes são familiares – pares ou adultos – com os quais têm que aprender a agir nas diversas situações de tensão, desacordo e conflito. Tendo isso em vista, o Projeto CombinAção pretendeu compreender os deslocamentos contemporâneos das relações intergeracionais, modificadas pela emergência de uma cultura de direitos da criança, e também de suas novas posições de sujeito (a de consumidor, por exemplo) (Castro et al., 2013; Castro, Lara, 2016; Castro, Tumolo, 2019).',
    ],
    capa: {
      url: falatorioImg('capa-projeto-combinacao.png'),
      alt: 'Capa do Projeto CombinAção',
    },
    metodologia: [
    'Neste projeto, por meio de dispositivos como as oficinas, rodas de conversa, feitura de tarefas que demandam decisões coletivas e outras formas de fazer junto, convidamos as crianças a falar, discutir e fazer, na direção do que parece importante assegurar para a vida coletiva na escola.',
    'O projeto aconteceu em escolas públicas do município do Rio de Janeiro e teve um alcance significativo, tendo sido realizado junto a 2.413 crianças em 110 turmas diferentes de 34 escolas da 1a, 2a e 3a Coordenadorias Regionais de Educação (CREs). Ao longo do segundo semestre de 2019, a equipe realizou visitas às escolas da 3a CRE onde a pesquisa foi feita com as crianças do 5o e 6o anos e a equipe escolar. Ao longo do ano de 2022, a equipe realizou visitas às escolas da 1a e 2a CREs, onde a pesquisa foi realizada com as crianças do 5o e 6o anos e a equipe escolar.',
    'As crianças foram convidadas a olhar 6 livretos com situações escolares diferentes, em que se pedia para escolherem uma resposta. A turma foi dividida em grupinhos pequenos para conversar e decidir em conjunto como responder àquelas situações coletivas. As respostas deveriam, então, ser combinadas entre elas.',
    'O material utilizado foi concebido a partir do acúmulo de resultados de projetos de pesquisa anteriores e durou cerca de 10 meses para sua elaboração. Ele consistiu no conjunto de 6 “livretos”, cada um mostrando, mediante texto e imagem, uma situação escolar diferente, muito provavelmente já vivida pelas crianças, e que se articulava às questões que o projeto de pesquisa buscava compreender. A equipe de pesquisa presente junto às crianças, mostrava os livretos e demandava que as crianças discutissem e combinassem uma única resposta entre elas em grupos de mais ou menos seis pessoas. Esse dispositivo de pesquisa buscou conhecer quais posições coletivas as crianças podiam tomar sobre o que acontece na escola: a escola vista da sua perspectiva.',
    ],
    livretosPreview: [
      {
        url: falatorioImg('CRIANCAS-FAZENDO.jpg'),
        alt: 'Capa do livro com crianças fazendo',
      },
      {
        url: falatorioImg('livro-aberto.jpg'),
        alt: 'Livro aberto com atividades do projeto',
      },
    ],
  } satisfies CombinacaoApresentacao,
  books: [
    {
      id: 'livro-1',
      title: 'Livro 1 — “A AULA É TOP! A ESCOLA É TOP!”',
      paragraphs: [
        'Trata-se de uma situação que demandava a posição dos estudantes sobre quais ações podem favorecer que aprendam melhor, e quais atividades podem acontecer de mais interessante na escola. A primeira imagem do livro 1, abaixo à esquerda, visa que escolham coletivamente quais ações e relações com a professora a criança privilegia; quais ações e relações entre eles, e com a professora, avaliam que podem aprender melhor. A imagem à direita demanda que as crianças pensem e digam quais atividades na escola se tornam relevantes para uma escola interessante: o recreio, a comida, os passeios ou as amizades. Portanto, nesse livro, se investigou quais ações/relações na aprendizagem são caras para elas e quais atividades parecem importantes para que a escola seja um lugar interessante. Segue abaixo a imagem do livro 1.',
      ],
      image: {
        url: falatorioImg('Livro-1-A-AULA-E-TOP-A-ESCOLA-E-TOP.png'),
        alt: 'Páginas do livro 1 — A AULA É TOP! A ESCOLA É TOP!',
      },
    },
    {
      id: 'livro-2',
      title: 'Livro 2 — “DEU A LOUCA NA ESCOLA!”',
      paragraphs: [
        'Trata-se de uma situação que demandava a posição dos estudantes sobre como as materialidades, os espaços, seus corpos e o da professora podem favorecer sua aprendizagem. A imagem à esquerda convoca as crianças a privilegiarem que tipo de objetos deveriam compor uma sala de aula construída por elas. O ponto de interrogação que se encontra entre as opções dá lugar à possibilidade das crianças expandirem as opções de objetos sugeridas pelo livro para uma sugerida por elas. A materialidade – os objetos da escola – favorecem a coletivização das experiências na escola e o compartilhar entre os estudantes: por exemplo, ter e brincar com bola no recreio, objeto que, em muitas escolas, os estudantes disseram não existir. A imagem à direita demanda que as crianças selecionem qual a relação com a professora, situando-a na materialidade do espaço e dos objetos da sala de aula, tornando mais animador o estar em sala de aula. A escola é vivida a partir da concretude e da organização dos espaços e materiais de que as crianças dispõem e do favorecimento aos seus movimentos e interações corporais. Portanto, quisemos investigar como a espacialidade dos corpos-em-relação e a materialidade dos objetos anima a aprendizagem, segundo a percepção dos estudantes. Segue abaixo a imagem do livro 2.',
      ],
      image: {
        url: falatorioImg('Livro-2-DEU-A-LOUCA-NA-ESCOLA.png'),
        alt: 'Páginas do livro 2 — DEU A LOUCA NA ESCOLA!',
      },
    },
    {
      id: 'livro-3',
      title: 'Livro 3 — “É HORA DE FALAR! BORA FALAR?”',
      paragraphs: [
        'Trata-se de uma situação que demandava a posição dos estudantes sobre as mudanças necessárias na escola, do ponto de vista dos alunos. Essa pergunta foi explorada de três modos: do ponto de vista do que os alunos querem mudar, do ponto de vista de como acham que os professores querem mudar; e do ponto de vista do que o conjunto dos alunos e dos professores querem mudar. A imagem à esquerda é composta por faixas seguradas por esses grupos, respectivamente, nas quais os alunos preencheram como veem as mudanças urgentes que cada grupo específico gostaria de ver na escola. Já na imagem e faixa a direita foi solicitado que as crianças escrevessem as reivindicações que gostariam de levar ao prefeito sobre o que é preciso mudar na escola.',
        'Lembremo-nos que as crianças precisam se colocar de acordo entre elas para decidir sua resposta. Por isso, as respostas dadas por cada grupinho de alunos significou um trabalho de discussão, negociação e decisão entre eles sobre uma miríade de possibilidades sobre o que mudar na escola.',
      ],
      image: {
        url: falatorioImg('Livro-3-E-HORA-DE-FALAR-BORA-FALAR.png'),
        alt: 'Páginas do livro 3 — É HORA DE FALAR! BORA FALAR?',
      },
    },
    {
      id: 'livro-4',
      title: 'Livro 4 — “POSTANDO NO FACE”',
      paragraphs: [
        'Trata-se de uma situação que demandava a posição das crianças sobre quais ações preferenciais dos alunos estão relacionadas aos diferentes espaços da escola. Na primeira página do livro há três imagens de lugares que representam, respectivamente, o espaço da entrada/portão da escola, o corredor e o lugar onde ocorre o recreio. Em cada caso, as crianças precisavam selecionar três ações/relações que se destacavam nos espaços representados em cada imagem. Na segunda página a demanda era que as crianças escolhessem o lugar que mais gostam na escola e o que fazem nele. As respostas, indo além de qualquer opção que pudesse ser dada por nós, estavam em aberto para que as crianças pudessem imaginar e simular como seria uma postagem no Facebook acerca de algo que fazem no seu lugar preferido da escola. As respostas das crianças aos livros mostram que há ações privilegiadas que corporificam suas experiências coletivas em cada espaço da escola, como a entrada e a saída da escola, os corredores e o espaço do recreio. Segue abaixo a imagem do livro 4.',
      ],
      image: {
        url: falatorioImg('Livro-4-POSTANDO-NO-FACE.png'),
        alt: 'Páginas do livro 4 — POSTANDO NO FACE',
      },
    },
    {
      id: 'livro-5',
      title: 'Livro 5 — “A UNIÃO FAZ A FORÇA!!”',
      paragraphs: [
        'Trata-se de uma situação que demandava aos alunos sua posição sobre as ações que podem ser empreendidas pela coletividade de atores da escola – seja os alunos em conjunto, ou os professores em conjunto, ou ainda, os professores e os alunos em conjunto. A primeira imagem do livro convida as crianças a pensarem e escreverem sobre as ações mais importantes para os estudantes realizarem coletivamente, enquanto na segunda imagem da mesma página o objetivo é que possam privilegiar quais ações os professores podem realizar com outros professores. Já na imagem da página à direita espera-se que as crianças possam discorrer sobre quais ações alunos e professores podem realizar conjuntamente. A escola pode ser o lugar de experiências individualizantes: ganhar boas notas, passar de ano, ter sucesso nos estudos. Por outro lado, a escola pode se realizar como o lugar de aprendizagens coletivas que subjetivam as crianças para a boa convivência, o diálogo, o entendimento e a vida em comum.',
        'Fazer junto significa “fazer comuns” e possibilitar tanto a criação de vínculos, formas coletivas de ser e habitar o mundo, como pactuar, convergir e agir coletivamente. As situações examinadas nos levam a atentar para o lugar, por excelência, da escola como aquele que enseja e convida o “fazer comuns” onde proliferam situações de convivência e aprendizagens coletivas. A expectativa da pergunta de que é a “união que faz a força” induz pensar que estar junto, com todas suas conflituosidades, pode apontar caminhos para a boa convivência coletiva no processo de transmissão educacional. Segue abaixo a imagem do livro 5.',
      ],
      image: {
        url: falatorioImg('Livro-5-A-UNIAO-FAZ-A-FORCA.png'),
        alt: 'Páginas do livro 5 — A UNIÃO FAZ A FORÇA!!',
      },
    },
    {
      id: 'livro-6',
      title: 'Livro 6 — “GUIA DO VISITANTE NA ESCOLA”',
      paragraphs: [
        'Trata-se de uma situação que demandava aos alunos sua posição sobre os diferentes lugares da escola. Como o nome do livro já diz, a proposta é que as crianças se imaginem em uma situação em que estão recebendo visitantes na sua escola e querem que eles a conheçam. Para isso, precisam valorar diferencialmente a espacialidade da escola escolhendo os dois melhores lugares de convivência e representá-los por meio de um desenho. Além disso, foi solicitado que caracterizassem afetivamente a escola mostrando o lugar mais legal dela, o mais feio, aquele que eles não podem ir e também o lugar que é de todos. Neste livro se buscou investigar como as relações com os espaços da escola são construídas afetivamente a partir de como as crianças, de forma coletiva, se utilizam e ocupam (ou não) os diferentes espaços. Segue abaixo a imagem do livro 6.',
      ],
      image: {
        url: falatorioImg('Livro-6-GUIA-DO-VISITANTE-NA-ESCOLA.png'),
        alt: 'Páginas do livro 6 — GUIA DO VISITANTE NA ESCOLA',
      },
    },
  ] satisfies CombinacaoBook[],
  dimensions: {
    intro:
      'Os focos das perguntas – apresentadas nos livretos - indicam a relevância de quatro dimensões importantes para a investigação da construção da experiência coletiva (“de comuns”) dos estudantes na escola que são:',
    items: [
      'Materialidades, espacialidades, corporeidades.',
      'Agir, participar em conjunto e poder transformar.',
      'As relações de poder, os afetos e a formação de vínculos na escola.',
      'A convivência coletiva e o fazer junto.',
    ],
    outro:
      'Os resultados do O Projeto CombinAção podem ser encontrados em nosso site; convidamos você a visitar as demais seções para conhecê-los um pouco mais.',
  },
  recreioImage: {
    url: falatorioImg('RECREIO-E-TEMPO-DE-SER-FELIZ.jpg'),
    alt: 'Cartaz: Recreio é tempo de ser feliz',
  },
  relatedPublication: {
    slug: 'livretos-projeto-combinacao',
    title: 'Livretos — Projeto CombinAção',
    subtitle: 'Seis situações escolares para pesquisa com crianças',
    cover:
      'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/capas-de-livros/CAPA-DO-LIVRO-COM-CRIANCAS-FAZENDO.jpg',
    coverAlt: 'Capa dos livretos do Projeto CombinAção',
    href: '/livros/livretos-projeto-combinacao',
    teaser:
      'Acesse o conjunto completo dos seis livretos para ler online ou baixar o PDF gratuitamente.',
    downloadUrl:
      'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Livrinhos-Projeto-CombinAcao.pdf',
    downloadLabel: 'Baixar PDF',
  },
  pdf: {
    label: 'Livrinhos — PDF',
    url: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/livros/livros/Livrinhos-Projeto-CombinAcao.pdf',
  },
  references: [
    'CASTRO, L. R. Da invisibilidade à ação: crianças e jovens na construção da cultura. In: CASTRO, L. R. (Org.). Crianças e jovens na construção da cultura. Rio de Janeiro: NAU, 2001. p. 19-46.',
    'CASTRO, L. R. A infância e seus destinos no contemporâneo. Psicologia em Revista, Belo Horizonte, v. 8, n. 11, p. 47-58, 2002.',
    'CASTRO, L. R. (coord.). Falatório: participação e democracia na escola. Rio de Janeiro: Contra-capa/Faperj, 2010.',
    'CASTRO, L, R. et al. Análise da produção bibliográfica em livros sobre a infância e a juventude na América Latina. DESIDADES: Revista Eletrônica de Divulgação Científica da Infância e Juventude, v. 3, n. 9, p. 33-50, 2015.',
    'CASTRO, L. R.. Subjetividades públicas juvenis: a construção do comum e os impasses de sua realização. Estudos de Psicologia (Natal. Online), v. 21, p. 80-91, 2016.',
    'CASTRO, L. R. “Precisamos falar do recreio!”: a construção do comum pelas crianças na escola. Childhood & Philosophy, Rio de Janeiro, v. 14, n. 29, p. 129-148, 2018.',
    'CASTRO, L. R. et al.. O cuidado na relação professor-aluno e sua potencialidade política. Estudos de Psicologia (UFRN), v. 18, p. 369-377, 2013.',
    'CASTRO, L. R. et al. Falas, afetos, sons e ruídos: as crianças e suas formas de habitar e participar do espaço escolar. REVISTA ELETRÔNICA DE EDUCAÇÃO (SÃO CARLOS), v. 12, p. 151-168, 2018.',
    'CASTRO, L. R.; LARA, J. S.. As crianças no encontro com o outro: uma perspectiva relacional e afetiva da responsabilidade. LATITUDE, v. 10, p. 217-249, 2016.',
    'CASTRO, L. R.; GRISOLIA, F.. SUBJETIVAÇÃO PÚBLICA OU SOCIALIZAÇÃO POLÍTICA? SOBRE AS ARTICULAÇÕES ENTRE O ?POLÍTICO? E A INFÂNCIA. EDUCAÇÃO & SOCIEDADE, v. 37, p. 971-988, 2016.',
    'CASTRO, L. R.; TAVARES, R. Direitos geracionais e ação política: os secundaristas ocupam as escolas. Educação e Pesquisa (USP) v.46, e237291, 2020.',
    'CASTRO, L. R.; TUMOLO, P. A experiência da transmissão na escola pública brasileira: a reinvenção dos laços sociais entre crianças e adultos. RUNA 40 (2), 2019.',
  ],
}
