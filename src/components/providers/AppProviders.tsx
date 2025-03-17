'use client'

import { PropsWithChildren } from 'react'
import { OrganizationProvider } from './organization'
import { SidebarProvider } from './sidebar'
import { CreatePageProvider } from './newpage'
import { CollapsePersistProvider } from './collapse'
import { AssetUploaderContextProvider } from './asset_upload'
import { InfoProvider } from './info'
import { PermissionProvider } from './permissions'
import { SharePageProvider } from './share'
import { GlobalSearchProvider } from './search'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <PermissionProvider>
      <CollapsePersistProvider>
        <InfoProvider>
          <OrganizationProvider>
            <GlobalSearchProvider>
              <CreatePageProvider>
                <SharePageProvider>
                  <SidebarProvider>
                    <AssetUploaderContextProvider>{children}</AssetUploaderContextProvider>
                  </SidebarProvider>
                </SharePageProvider>
              </CreatePageProvider>
            </GlobalSearchProvider>
          </OrganizationProvider>
        </InfoProvider>
      </CollapsePersistProvider>
    </PermissionProvider>
  )
}
