'use client'

import createContext from '@/libs/context'
import { useFetchOrgSpaces } from '@/mutation/querier/space/useFetchSpaces'
import { PropsWithChildren, useMemo } from 'react'
import { useOrganization } from './organization'
import { Space } from '@/schema/space'
import { IPageData, useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { useThrottledCallback } from 'use-debounce'

interface SidebarContextValue {
  isPendingSpaces: boolean
  privateSpace?: Space
  publicSpaces?: Space[]
  privatePages?: IPageData
  isPendingPrivatePages: boolean
  refreshPrivatePages: () => void
  refreshSpacePages: (pageID: string) => void
}

const [Provider, useSidebar] = createContext<SidebarContextValue>({
  name: 'SidebarContext',
})

export { useSidebar }

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const { organization } = useOrganization()

  const { data: { data: spaces } = {}, isPending: isPendingSpaces } = useFetchOrgSpaces({
    organization_pkid: organization?.pk_id ?? -1,
    allowFetch: Boolean(organization),
  })

  const privateSpace = useMemo(() => {
    return spaces?.find((space) => space.is_private)
  }, [spaces])

  const publicSpaces = useMemo(() => {
    return spaces?.filter((space) => !space.is_private)
  }, [spaces])

  const {
    data: { data: privatePages } = {},
    refetch: refreshPrivatePages,
    isPending: isPendingPrivatePages,
  } = useFetchPages({
    allowFetch: Boolean(privateSpace),
    space_pk_id: privateSpace?.pk_id ?? -1,
  })

  const debounceRefreshPrivatePages = useThrottledCallback(refreshPrivatePages, 2000, {
    trailing: true,
  })

  const refreshSpacePages = (pageID: string) => {
    // TODO: search for the space that contains the page and refresh it
    console.log('refreshing space pages', pageID)
    debounceRefreshPrivatePages()
  }

  return (
    <Provider
      value={{
        isPendingSpaces,
        privateSpace,
        publicSpaces,
        privatePages,
        refreshPrivatePages: debounceRefreshPrivatePages,
        isPendingPrivatePages,
        refreshSpacePages
      }}
    >
      {children}
    </Provider>
  )
}
