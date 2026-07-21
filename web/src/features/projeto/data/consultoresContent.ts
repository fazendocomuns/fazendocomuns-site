import andreaSzulcImg from '@/assets/imgs/consultores/andrea-szulc.jpg'
import { assetSrc } from '@/lib/assetSrc'
import placeholderImg from '@/assets/imgs/consultores/icone-placeholder.png'
import lucianaGageiroImg from '@/assets/imgs/consultores/luciana-gageiro.jpg'
import conceicaoSeixasImg from '@/assets/imgs/consultores/conceicao-seixas.jpg'
import heloisaBezerraImg from '@/assets/imgs/consultores/heloisa-bezerra.jpg'
import julianaLaraImg from '@/assets/imgs/consultores/juliana-lara.jpg'
import valeriaLlobetImg from '@/assets/imgs/consultores/valeria-llobet.jpg'

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
      image: assetSrc(andreaSzulcImg),
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
      image: assetSrc(placeholderImg),
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
      image: assetSrc(placeholderImg),
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
      image: assetSrc(lucianaGageiroImg),
      roles: [
        'Doutora em Psicologia (PUC-Rio)',
        'Professora Associada da Faculdade de Educação da UFF/ PPG em Psicologia da UFF',
      ],
      linkedin: '',
      lattes: 'http://lattes.cnpq.br/2308234336807405',
    },
    {
      id: 'conceicao-seixas',
      name: 'Conceição Firmina Seixas Silva',
      image: assetSrc(conceicaoSeixasImg),
      roles: [
        'Professora Associada da Faculdade de Educação da Universidade do Estado do Rio de Janeiro (UERJ)/ Departamento de Estudos da Infância (DEDI)',
        'Professora permanente do Programa de Pós-Graduação em Educação (ProEd/ UERJ)',
        'Líder do grupo Espaço de Estudo e Pesquisa sobre Infância (EEPI)',
      ],
      linkedin: '',
      lattes: 'http://lattes.cnpq.br/9511209669396293',
    },
    {
      id: 'heloisa-bezerra',
      name: 'Heloisa Dias Bezerra',
      image: assetSrc(heloisaBezerraImg),
      roles: [
        'Professora Titular na Faculdade de Ciências Sociais da Universidade Federal do Estado do Rio de Janeiro (Unirio)',
      ],
      linkedin: '',
      lattes: 'http://lattes.cnpq.br/5901954357328179',
    },
    {
      id: 'juliana-lara',
      name: 'Juliana Siqueira de Lara',
      image: assetSrc(julianaLaraImg),
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
      image: assetSrc(valeriaLlobetImg),
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
