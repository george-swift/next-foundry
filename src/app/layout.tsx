import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

import { Providers } from '@/components/providers'

import '@/styles/globals.css'

import { cn } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Next Foundry',
  description:
    'Production-ready Next.js + TypeScript starter to build and launch faster. Best practices baked in. Ship an MVP in days, not weeks.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'font-sans antialiased'
        )}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
