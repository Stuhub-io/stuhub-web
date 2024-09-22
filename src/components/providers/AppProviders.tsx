'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'
import { SidebarProvider } from './sidebar'
import { CreatePageProvider } from './newpage'
import { PageProvider } from './page'
import { CollapsePersistProvider } from './collapse'

const queryClient = new QueryClient()

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <CreatePageProvider>
            <OrganizationProvider>
              <CollapsePersistProvider>
                <SidebarProvider>
                  <PageProvider>{children}</PageProvider>
                </SidebarProvider>
              </CollapsePersistProvider>
            </OrganizationProvider>
          </CreatePageProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
