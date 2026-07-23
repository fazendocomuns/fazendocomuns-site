export interface Consultant {
  id: string
  name: string
  image: string
  roles: string[]
  /** Perfil LinkedIn (opcional — sem URL, o ícone abre busca no LinkedIn). */
  linkedin?: string
  /** Currículo Lattes (opcional — sem URL, o ícone abre busca no Google/Lattes). */
  lattes?: string
}

export const consultoresContent = {
  title: 'Consultores',
  subtitle:
    'Consultoria científica vinculada ao NIAJ/UFRJ e redes de pesquisa nacional e internacional.',
  consultants: [
    {
      id: 'andrea-szulc',
      name: 'Andrea Szulc',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/consultores/AndreaSzulc-Perfil.jpg',
      roles: [
        'Doutora em Antropologia pela Universidade de Buenos Aires',
        'Pesquisadora do CONICET/Argentina',
        'Professora da Universidad de Buenos Aires',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'felipe-grisolia',
      name: 'Felipe Salvador Grisolia',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/foto-generica.png',
      roles: [
        'Doutor em Psicologia pela Universidade Federal do Rio de Janeiro',
        'Professor Substituto da Universidade do Estado do Rio de Janeiro',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'idilva-germano',
      name: 'Idilva Maria Pires Germano',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/foto-generica.png',
      roles: [
        'Doutora em Sociologia pela Universidade Federal do Ceará',
        'Professora Titular da Universidade Federal do Ceará',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'luciana-gageiro',
      name: 'Luciana Gageiro Coutinho',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/consultores/LucianaGageiroCoutinho-Perfil.jpg',
      roles: [
        'Doutora em Psicologia (PUC-Rio)',
        'Professora Associada da Faculdade de Educação da UFF/ PPG em Psicologia da UFF',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'conceicao-seixas',
      name: 'Conceição Firmina Seixas Silva',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/consultores/ConceicaoFirminaSeixasSilva-Perfil.png',
      roles: [
        'Professora Associada da Faculdade de Educação da Universidade do Estado do Rio de Janeiro (UERJ)/ Departamento de Estudos da Infância (DEDI)',
        'Professora permanente do Programa de Pós-Graduação em Educação (ProEd/ UERJ)',
        'Líder do grupo Espaço de Estudo e Pesquisa sobre Infância (EEPI)',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'heloisa-bezerra',
      name: 'Heloisa Dias Bezerra',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/consultores/HeloisaDiasBezerra-Perfil.jpg',
      roles: [
        'Professora Titular na Faculdade de Ciências Sociais da Universidade Federal do Estado do Rio de Janeiro (Unirio)',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'juliana-lara',
      name: 'Juliana Siqueira de Lara',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/consultores/JulianaSiqueiraDeLara-Perfil.jpg',
      roles: [
        'Pós-doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
        'Professora substituta da Faculdade de Educação da Universidade Federal do Rio de Janeiro (UFRJ)',
      ],
      linkedin: '',
      lattes: '',
    },
    {
      id: 'valeria-llobet',
      name: 'Valeria Llobet',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/consultores/ValeriaLlobet-Perfil.jpg',
      roles: [
        'Diretora do Centro de Estudos sobre Desigualdades, Sujeitos e Instituições (CEDESI) da Escola de Humanidades da Universidad Nacional de San Martín (UNSAM)',
        'Professora Associada da Universidad Nacional de San Martín (UNSAM)',
        'Pesquisadora do Conselho Nacional de Pesquisas Científicas e Técnicas (CONICET) no Laboratório de Pesquisa em Ciências Humanas (LICH)',
      ],
      linkedin: '',
      lattes: '',
    },
  ] satisfies Consultant[],
}
