'use client'

import { AdminAuthGuard } from '@/features/admin/components/layout/AdminAuthGuard'

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>
}
