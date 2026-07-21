import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  GraduationCap,
  Handshake,
  HelpCircle,
  Library,
  Users,
  UserPlus,
} from 'lucide-react'

export interface ProjetoSection {
  id: string
  title: string
  href: string
  description: string
  icon: LucideIcon
  color: 'red' | 'amber' | 'yellow' | 'orange'
}

export const projetoHubIntro = {
  title: 'O projeto',
  subtitle:
    'Pesquisa e intervenção social sobre os comuns produzidos nas escolas públicas — com foco no recreio como direito das crianças e adolescentes.',
}

export const projetoSections: ProjetoSection[] = [
  {
    id: 'o-que-e',
    title: 'O que é',
    href: '/projeto/o-que-e',
    description:
      'Conheça a proposta, o histórico e a qualificação do projeto de pesquisa Fazendo Comuns.',
    icon: HelpCircle,
    color: 'red',
  },
  {
    id: 'equipe',
    title: 'Equipe',
    href: '/projeto/equipe',
    description:
      'Coordenação, pesquisadoras e pesquisadores do Instituto de Psicologia da UFRJ.',
    icon: Users,
    color: 'amber',
  },
  {
    id: 'colaboradores',
    title: 'Colaboradores',
    href: '/projeto/colaboradores',
    description:
      'Parceiros de campo e colaboradores que participam das investigações.',
    icon: UserPlus,
    color: 'yellow',
  },
  {
    id: 'producoes',
    title: 'Produções',
    href: '/projeto/producoes',
    description:
      'Artigos, capítulos, livros e materiais produzidos ao longo da pesquisa.',
    icon: BookOpen,
    color: 'orange',
  },
  {
    id: 'bibliografia',
    title: 'Bibliografia',
    href: '/projeto/bibliografia',
    description:
      'Referências teóricas e acadêmicas que fundamentam o projeto.',
    icon: Library,
    color: 'red',
  },
  {
    id: 'consultores',
    title: 'Consultores',
    href: '/projeto/consultores',
    description:
      'Consultoria científica vinculada ao NIAJ/UFRJ e redes de pesquisa.',
    icon: GraduationCap,
    color: 'amber',
  },
  {
    id: 'parceiros',
    title: 'Parceiros',
    href: '/projeto/parceiros',
    description:
      'Instituições parceiras, apoio institucional e redes colaborativas.',
    icon: Handshake,
    color: 'yellow',
  },
]

export const projetoPageContent = {
  intro: projetoHubIntro,
  sections: projetoSections,
}
