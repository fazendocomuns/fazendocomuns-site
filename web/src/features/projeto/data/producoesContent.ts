export type ProducoesSectionColor = 'red' | 'amber' | 'yellow' | 'orange'

export interface ProducoesSection {
  id: string
  title: string
  href: string
  color: ProducoesSectionColor
}

export const producoesContent = {
  title: 'Produções',
  intro:
    'Apresentamos aqui as principais produções do grupo de pesquisa que realiza o Projeto Fazendo Comuns, assim como as produções do coletivo maior onde ele está inserido, o Núcleo de Estudos da Infância, Adolescência e Juventude NIAJ, da Universidade Federal do Rio de Janeiro. Essas produções mostram o acúmulo de conhecimento já consolidado sobre a infância, a escola, a educação e os processos de subjetivação infantil e juvenil.',
  sections: [
    {
      id: 'artigos',
      title: 'Artigos',
      href: '/projeto/producoes/artigos',
      color: 'red',
    },
    {
      id: 'livros',
      title: 'Livros e capítulos de livros',
      href: '/projeto/producoes/livros',
      color: 'amber',
    },
  ] satisfies ProducoesSection[],
}
