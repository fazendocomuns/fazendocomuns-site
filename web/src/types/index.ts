export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Editorial {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
  category: string
}

export interface NewsItem {
  id: string
  title: string
  date: string
  image?: string
  slug: string
}

export interface HighlightCard {
  id: string
  title: string
  description: string
  href: string
  color: 'amber' | 'red' | 'yellow' | 'orange'
  rotation?: number
}

export interface VoiceSection {
  id: string
  title: string
  subtitle: string
  href: string
  image?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image?: string
}

export interface Publication {
  id: string
  title: string
  type: string
  year: string
  href: string
}
