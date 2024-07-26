'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'

const queryClient = new QueryClient()

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <OrganizationProvider>{children}</OrganizationProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
