import type { NavItem } from '@/types'

/** Navegação principal — sem imports de imagens (evita puxar assets da home no Header). */
export const mainNavigation: NavItem[] = [
  { label: 'Página inicial', href: '/' },
  {
    label: 'O projeto',
    href: '/projeto',
    children: [
      { label: 'O que é', href: '/projeto/o-que-e' },
      { label: 'Equipe', href: '/projeto/equipe' },
      { label: 'Colaboradores', href: '/projeto/colaboradores' },
      { label: 'Produções', href: '/projeto/producoes' },
      { label: 'Bibliografia', href: '/projeto/bibliografia' },
      { label: 'Consultores', href: '/projeto/consultores' },
      { label: 'Parceiros', href: '/projeto/parceiros' },
    ],
  },
  {
    label: 'Multimídia',
    href: '/multimidia',
    children: [
      { label: 'Podcast', href: '/multimidia/podcast' },
      { label: 'Vídeos', href: '/multimidia/videos' },
      { label: 'Fotos', href: '/multimidia/fotos' },
    ],
  },
  {
    label: 'Eventos',
    href: '/eventos',
    children: [
      { label: 'As Crianças Falam', href: '/eventos/as-criancas-falam' },
      {
        label: 'Em Comuns…Recrear em mundos outros',
        href: '/eventos/recrear-mundos-outros',
      },
    ],
  },
  { label: 'Editoriais', href: '/editoriais' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Livros', href: '/livros' },
  {
    label: 'Mais',
    href: '/mais',
    children: [
      { label: 'Links Parceiros', href: '/mais/links-parceiros' },
    ],
  },
]
