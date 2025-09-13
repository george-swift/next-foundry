'use client'

import { NuqsProvider } from '@/components/providers/nuqs'
import { ThemeProvider } from '@/components/providers/theme'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsProvider>{children}</NuqsProvider>
      <Toaster richColors />
    </ThemeProvider>
  )
}
