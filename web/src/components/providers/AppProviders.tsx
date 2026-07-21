'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import { SmoothScroll } from '@/components/providers/SmoothScroll'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  )
}
