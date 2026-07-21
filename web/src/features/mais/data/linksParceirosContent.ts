export interface PartnerExternalLink {
  label: string
  url: string
}

export interface PartnerLinkEntry {
  id: string
  title: string
  subtitle?: string
  highlight?: string
  description?: string
  links: PartnerExternalLink[]
}

export const linksParceirosContent = {
  title: 'Links Parceiros',
  partners: [
    {
      id: 'humanamente',
      title: 'HUMANAMENTE',
      subtitle: 'Divulgação científica em Humanidades',
      highlight:
        '“Fazendo Comuns”: a Educação como projeto intra- e co-geracional',
      links: [
        {
          label: 'Projeto no HUMANAMENTE (Fiocruz)',
          url: 'https://humanamente.fiocruz.br/projetos_aprovados/fazendo-comuns-a-educacao-como-projeto-intra-e-co-geracional/',
        },
      ],
    },
    {
      id: 'desidades',
      title: 'DESIDADES',
      description:
        'DESIDADES é uma revista científica eletrônica na área da infância e juventude latino-americanas, com periodicidade quadrimestral. Publica textos em português ou espanhol. É uma publicação do Núcleo Interdisciplinar de Pesquisa para a Infância e Adolescência Contemporâneas, NIPIAC, da Universidade Federal do Rio de Janeiro. Está comprometida em divulgar a pesquisa científica para além dos muros da Universidade estabelecendo um diálogo com pesquisadores, profissionais, estudantes e demais interessados na área da infância e juventude. A Revista publica originais inéditos de artigos, entrevistas e resenhas desde uma abordagem multidisciplinar da infância e juventude.',
      links: [
        {
          label: 'desidades.ufrj.br',
          url: 'https://desidades.ufrj.br',
        },
        {
          label: 'revistas.ufrj.br/index.php/desidades',
          url: 'https://revistas.ufrj.br/index.php/desidades',
        },
      ],
    },
  ] satisfies PartnerLinkEntry[],
}
