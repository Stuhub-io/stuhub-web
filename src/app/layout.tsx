import { AppProviders } from '@/components/providers'
import { cn } from '@/libs/utils'
import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import '@/styles/prosemirror.css'
import { AuthSessionProvider } from '@/components/auth/AuthSessionProvider'
import Toaster from '@/components/common/Toast'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Suspense } from 'react'

const inter = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stuhub',
  description: 'Shaping worklife',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <AuthSessionProvider>
          <AppProviders>
            <Suspense>
              <AuthGuard>{children}</AuthGuard>
            </Suspense>
          </AppProviders>
        </AuthSessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
