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
import { PageInfoDrawerProvider } from './page_info_drawer'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <PermissionProvider>
      <InfoProvider>
        <OrganizationProvider>
          <GlobalSearchProvider>
            <CollapsePersistProvider>
              <CreatePageProvider>
                <SharePageProvider>
                  <SidebarProvider>
                    <AssetUploaderContextProvider>
                      <PageInfoDrawerProvider>
                        {children}
                      </PageInfoDrawerProvider>
                    </AssetUploaderContextProvider>
                  </SidebarProvider>
                </SharePageProvider>
              </CreatePageProvider>
            </CollapsePersistProvider>
          </GlobalSearchProvider>
        </OrganizationProvider>
      </InfoProvider>
    </PermissionProvider>
  )
}
