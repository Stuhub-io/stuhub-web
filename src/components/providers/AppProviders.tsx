'use client'

import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'
import { SidebarProvider } from './sidebar'
import { CreatePageProvider } from './newpage'
import { CollapsePersistProvider } from './collapse'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <OrganizationProvider>
      <CreatePageProvider>
        <CollapsePersistProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </CollapsePersistProvider>
      </CreatePageProvider>
    </OrganizationProvider>
  )
}
