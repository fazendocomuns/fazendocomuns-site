import type { Metadata } from 'next'
import { AdminProviders } from '@/app/admin/AdminProviders'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: { default: 'Admin — Fazendo Comuns', template: '%s — Admin' },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminProviders>{children}</AdminProviders>
}
