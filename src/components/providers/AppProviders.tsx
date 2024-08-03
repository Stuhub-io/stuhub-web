'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'
import { SidebarProvider } from './sidebar'

const queryClient = new QueryClient()

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <OrganizationProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </OrganizationProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
