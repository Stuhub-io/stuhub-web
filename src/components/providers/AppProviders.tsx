'use client'

import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'
import { SidebarProvider } from './sidebar'
import { CreatePageProvider } from './newpage'
import { CollapsePersistProvider } from './collapse'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <CreatePageProvider>
      <OrganizationProvider>
        <CollapsePersistProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </CollapsePersistProvider>
      </OrganizationProvider>
    </CreatePageProvider>
  )
}
