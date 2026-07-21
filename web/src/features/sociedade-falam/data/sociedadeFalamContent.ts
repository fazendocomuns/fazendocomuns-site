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

export interface SociedadeFalamEntry {
  id: string
  number: number
  body: string
  excerpt?: string
  followUp?: string
  references: string[]
}

export const sociedadeFalamHeroImage = wixImage(
  '92a7cc_53474f3180584c978bfdc884ca5d9011',
  'jpg',
  1600,
  900,
)

export const sociedadeFalamContent = {
  title: 'A sociedade fala',
  heading: 'A SOCIEDADE FALA',
  subtitle:
    'Veja a importância do recreio e da brincadeira segundo diferentes atores da sociedade contemporânea:',
  heroImage: sociedadeFalamHeroImage,
  heroImageAlt:
    'Crianças brincando ao ar livre — registro fotográfico do projeto Fazendo Comuns',
  entries: [
    {
      id: 'winnicott',
      number: 1,
      body: 'O psicanalista Donald Winnicott (1975, p. 84) se refere ao "[...] brincar como uma experiência, sempre uma experiência criativa, uma experiência na continuidade espaço-tempo, uma forma básica de viver".',
      references: [
        'Winnicott, D. W. O Brincar & a Realidade. 1 ed. Rio de Janeiro: Imago Editora Ltda, 1975.',
      ],
    },
    {
      id: 'huizinga',
      number: 2,
      body: 'Johan Huizinga (1992) afirma que não somos tão racionais (homo sapiens) ou técnicos e produtivos (homo faber) como foi defendido, principalmente, na Modernidade. Diante disso, o autor destaca o aspecto lúdico (homo ludens), entendendo que a brincadeira é uma atividade intrínseca à cultura humana, de modo que o brincar está presente em todas as gerações e é transmitido intergeracionalmente.',
      references: [
        'Huizinga, J. Homo ludens: o jogo como elemento da cultura. São Paulo: Perspectiva, 1992.',
      ],
    },
    {
      id: 'tomich',
      number: 3,
      body: 'Para Ana Tomich (2016, p. 108), “O brincar dentro das instituições de ensino ainda é visto como um mero lazer, e não como um tempo/espaço de descobertas, de criação, do protagonismo infantil [...]”.',
      references: [
        'Tomich, A. L. L. Lydia Hortélio, uma menina do sertão: educação musical na cultura da criança. Salvador, p. 1-130, 2016.',
      ],
    },
    {
      id: 'patto',
      number: 4,
      body: 'A psicóloga brasileira Maria Helena Souza Patto (2022) salienta que, diante da rotina escolar — muitas vezes desgastante e ameaçadora — o recreio representa um momento em que as crianças são capazes de criar verdadeiras "contra-instituições"; isto é, dinâmicas oriundas da própria iniciativa infantil que as permitem desempenhar papéis que desafiem a estrutura dominante.',
      references: [
        'Patto, M. H. S. A produção do fracasso escolar: histórias de submissão e rebeldia. 5 ed. São Paulo, Instituto de Psicologia da Universidade de São Paulo, 2022.',
      ],
    },
    {
      id: 'hortelio',
      number: 5,
      body: 'Diante do mundo infantil atual, cercado pela tecnologia, cultura midiática e rotina escolar, a educadora brasileira Lydia Hortélio (2013 apud Tomich, 2016) percebe o desafio de possibilitar formas para as crianças desenvolverem sua cultura, em especial, a brincadeira; esta configura uma atividade fundamental, visto que favorece o encontro com os pares e o acesso ao mundo.',
      references: [
        'Tomich, A. L. L. Lydia Hortélio, uma menina do sertão: educação musical na cultura da criança. Salvador, p. 1-130, 2016.',
      ],
    },
    {
      id: 'eca-dcnei',
      number: 6,
      body: '“O Argumento do Direito”: ECA e DCNEI O Estatuto da Criança do Adolescente (ECA), especificamente em seu Artigo 16º, estabelece que o direito à liberdade engloba o direito de brincar, praticar esportes e divertir-se (BRASIL, 1990). Em consonância com o ECA, as Diretrizes Curriculares Nacionais da Educação Infantil (DCNEI) entendem a criança enquanto um: [...] sujeito histórico e de direitos que, nas interações, relações e práticas cotidianas que vivencia, constrói sua identidade pessoal e coletiva, brinca, imagina, fantasia, deseja, aprende, observa, experimenta, narra, questiona e constrói sentidos sobre a natureza e a sociedade, produzindo cultura.” (BRASIL, 2009, Art. 4º). Além disso, especificamente a partir do Artigo 9º das DCNEI, determina-se que as práticas pedagógicas da Educação Infantil devem ser norteadas por dois principais aspectos: a interação e a brincadeira (BRASIL, 2009). Contudo, apesar de o brincar ser reconhecido como um direito e um aspecto fundamental para a vida infantil, não existe uma obrigatoriedade de um espaço e tempo — como o recreio — voltado exclusivamente para a brincadeira nas escolas brasileiras.',
      references: [
        'BRASIL, Lei nº 8.069, de 13 de julho de 1990. Dispõe sobre o Estatuto da Criança e do Adolescente e dá outras providências. Brasília, 1990.',
        'BRASIL. Conselho Nacional de Educação; Câmara de Educação Básica. Resolução nº 5, de 17 de dezembro de 2009. Fixa as Diretrizes Curriculares Nacionais para a Educação Infantil. Diário Oficial da União, Brasília, 2009.',
      ],
    },
    {
      id: 'castro',
      number: 7,
      body: 'Em suas pesquisas sobre a experiência escolar infantil, a psicóloga brasileira Lucia Rabello de Castro (2018) observa que os próprios estudantes entendem o recreio enquanto uma experiência coletiva que pertence tanto às crianças quanto aos adultos — professores, direção e coordenação —, indicando o caráter co-geracional presente na pauta do recreio.',
      references: [
        'Castro, L. R. “Precisamos falar do recreio!” – a construção do comum pelas crianças na escola. Childhood & Philosophy, Rio de Janeiro, v. 14, n. 29, p. 129-148, 2018.',
      ],
    },
    {
      id: 'krenak',
      number: 8,
      body: 'O líder indígena Ailton Krenak (2019, p. 13) defende que, diante da sociedade atual cada vez mais esvaziada do sentido de viver, da valorização do prazer, da cultura e da conexão com o outro, "É importante viver a experiência da nossa própria circulação pelo mundo, não como uma metáfora, mas como fricção, poder contar uns com os outros". Nesse sentido, sinaliza a necessidade de resistir às tendências mercadológicas e homogeneizantes da contemporaneidade que agem sob os sujeitos desde a mais tenra idade, indicando que devemos ampliar nossos horizontes existenciais por meio do contato com o outro e da ânsia de consumir natureza e subjetividades; as nossas e as dos outros (Krenak, 2019). Assim, por mais que Krenak não fale expressamente sobre o tema do recreio e do brincar, pode-se argumentar que essas atividades, para as crianças no contexto escolar, podem proporcionar a experiência descrita e valorizada pelo autor.',
      references: [
        'Krenak, A. Ideias para adiar o fim do mundo. 1 ed. São Paulo: Companhia das Letras, 2019.',
      ],
    },
    {
      id: 'antonio-bispo',
      number: 9,
      body: 'Antonio Bispo\nOs autores Álvaro e Casimiro Tukano (2015, p. 132) destacam, sobre os escritos do líder quilombola Antônio "Nêgo" Bispo, que',
      excerpt:
        'Os nossos chefes tribais realizavam os ritos de iniciação para educar seus filhos e netos. Eram momentos de educação coletiva, momentos sagrados para os meninos de onze a quinze anos, porque a nossa sociedade precisava de bons rezadores, cantores, dançarinos, músicos de yapurutu, cariço e outros instrumentos sofisticados. As nossas avós, em sintonia com os sábios das comunidades, tinham programas de educação coletiva para as meninas.',
      followUp:
        'Dessa forma, pode-se dizer que os espaços de convivência coletiva nos quilombos, bem como o recreio nas escolas, representam momentos importantes de transmissão de conhecimento e cultura intra e intergeracionalmente.',
      references: [
        'Tukano, A. Tukano, C. Colonização, Quilombos: modos e significações. 1 ed. Brasília: Instituto Nacional de Ciência e Tecnologia de Inclusão no Ensino Superior e na Pesquisa, 2015.',
      ],
    },
  ] satisfies SociedadeFalamEntry[],
}
