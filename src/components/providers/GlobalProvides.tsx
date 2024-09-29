'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { AuthGuard } from '../auth/AuthGuard'
import { AuthSessionProvider } from '../auth/AuthSessionProvider'

const queryClient = new QueryClient()

export function GlobalProviders({ children }: PropsWithChildren) {
  return (
    <AuthSessionProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <AuthGuard>{children}</AuthGuard>
          </NextUIProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthSessionProvider>
  )
}
