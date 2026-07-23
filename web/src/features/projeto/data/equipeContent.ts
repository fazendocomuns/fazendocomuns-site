export interface TeamMember {
  id: string
  name: string
  image: string
  roles: string[]
  bio?: string
}

export interface TeamGroup {
  id: string
  title: string
  members: TeamMember[]
}

export const equipeContent = {
  title: 'Equipe',
  subtitle:
    'Coordenação e pesquisadoras(es) do Instituto de Psicologia da UFRJ vinculados ao projeto Fazendo Comuns.',
  groups: [
    {
      id: 'coordenacao',
      title: 'Coordenação-Geral',
      members: [
        {
          id: 'lucia-rabello',
          name: 'Lucia Rabello de Castro',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/LuciaRabelloDeCastro-Perfil.jpg',
          roles: [],
          bio: 'Professora Titular do Instituto de Psicologia da Universidade Federal do Rio de Janeiro, e do Programa de Pós-graduação em Psicologia desse Instituto. Possui Doutorado (Ph.D., 1988) e Mestrado (M.Sc., 1978) em Psicologia pela Universidade de Londres, Grã-Bretanha. Pesquisadora Senior do CNPQ. Membro Fundador do Núcleo Interdisciplinar de Pesquisa na Infância e Adolescência Contemporâneas - NIPIAC/UFRJ, coordenadora geral desse Núcleo (1995-2011), e atual Coordenadora Científica. Co-fundadora e primeira presidente eleita da Associação Nacional Rede de Pesquisadores e Pesquisadoras da Juventude - REDEJUBRA (2017-2020). É membro de redes nacionais e internacionais na área da infância e juventude. Membro de Conselhos Editoriais de periódicos nacionais e internacionais no campo da infância e juventude, como Childhood, Young e outras. Editora Chefe da Revista Científica da Infância, Adolescência e Juventude - DESIDADES lançada em 2013. Tem sido agraciada como Cientista do Nosso Estado pela Faperj (desde 2002). É Titular da Cátedra Pesquisa, Formação e Intervenção na Infância, Adolescência e Juventude do Colégio Brasileiro de Altos Estudos, UFRJ.',
        },
      ],
    },
    {
      id: 'assistentes',
      title: 'Pesquisadores (as) Assistentes',
      members: [
        {
          id: 'adelaide-rezende',
          name: 'Adelaide Rezende de Souza',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/AdelaideRezendeDeSouza-Perfil.jpg',
          roles: [
            'Pós-doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
            'Pesquisadora da ONG Redes da Maré',
          ],
        },
        {
          id: 'ana-leticia-lima',
          name: 'Ana Letícia Lima Silva',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/AnaLeticiaLimaSilva-Perfil.jpg',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'davi-alves',
          name: 'Davi Alves de Abreu',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/DaviAlvesDeAbreu-Perfil.jpg',
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'erica-vieira',
          name: 'Érica dos Santos Vieira',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/EricaDosSantosVieira-Perfil.jpg',
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'flavia-chrispino',
          name: 'Flávia Chrispino',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/FlaviaChrispino-Perfil.jpg',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'gabriela-castro',
          name: 'Gabriela Fernandes Castro',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/GabrielaFernandesCastro-Perfil.jpg',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'giesela-talon',
          name: 'Giesela Maria Schöpke Marques Talon',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/GieselaMariaSchopkeMarquesTalon-Perfil.png',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'isys-boos',
          name: 'Isys Boos Vieira',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/IsysBoosVieira-Perfil.png',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'julia-junqueira',
          name: 'Júlia Junqueira Castillo',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/JuliaJunqueiraCastillo-Perfil.png',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'julia-moraes',
          name: 'Julia Moraes',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/JuliaMoraes-Perfil.jpg',
          roles: [
            'Psicóloga formada pelo Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'lara-moreira',
          name: 'Lara de Oliveira Moreira',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/LaraDeOliveiraMoreira-Perfil.jpg',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'luan-gagliardi',
          name: 'Luan Gall Gagliardi',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/LuanGallGagliardi-Perfil.png',
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'lucas-abreu',
          name: 'Lucas Araujo de Jesus Meireles de Abreu',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/LucasAraujoDeJesusMeirelesDeAbreu-Perfil.png',
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'maria-clara-caiaffa',
          name: 'Maria Clara de Lima Caiaffa dos Santos',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/MariaClaraDeLimaCaiaffaDosSantos-Perfil.jpg',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'marilia-costa',
          name: 'Marília Fernanda Garcia Costa',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/MariliaFernandaGarciaCosta-Perfil.png',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'michael-paz',
          name: 'Michael Santana da Paz',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/MichaelSantanaDaPaz-Perfil.png',
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'paula-tumolo',
          name: 'Paula Pimentel Tumolo',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/PaulaPimentelTumolo-Perfil.png',
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
            'Professora Substituta da Faculdade de Educação da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'pedro-queiroz',
          name: 'Pedro Sá Campello Queiroz',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/PedroSaCampelloQueiroz-Perfil.png',
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'renata-tavares',
          name: 'Renata Tavares',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/RenataTavares-Perfil.png',
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'sofia-manzatto',
          name: 'Sofia Mitie Kanashiro Manzatto',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/SofiaMitieKanashiroManzatto-Perfil.png',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'sofia-hengen',
          name: 'Sofía Hengen',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/SofiaHengen-Perfil.png',
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'sophia-aguiar',
          name: 'Sophia Aguiar Gimenez Corrêa',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/SophiaAguiarGimenezCorrea-Perfil.png',
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'victoria-maia',
          name: 'Victoria Bersan Barbalho Maia',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/VictoriaBersanBarbalhoMaia-Perfil.png',
          roles: [
            'Mestranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'vinicius-vila-nova',
          name: 'Vinícius Vila Nova',
          image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/equipe/Vinicius-Perfil.png',
          roles: [
            'Bolsista de Apoio à Pesquisa',
            'Graduando de Engenharia de Computação pela Universidade Veiga de Almeida (UVA)',
          ],
        },
      ],
    },
  ] satisfies TeamGroup[],
}
