'use client'

import createContext from '@/libs/context'
import { PropsWithChildren } from 'react'
import { useOrganization } from './organization'
import { IPageData, useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { useThrottledCallback } from 'use-debounce'

interface SidebarContextValue {
  orgPages?: IPageData
  isPendingOrgPages: boolean
  refreshOrgPages: () => void
}

const [Provider, useSidebar] = createContext<SidebarContextValue>({
  name: 'SidebarContext',
})

export { useSidebar }

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const { organization } = useOrganization()

  const {
    data: { data: orgPages } = {},
    refetch: refreshOrgPages,
    isPending: isPendingOrgPages,
  } = useFetchPages({
    allowFetch: Boolean(organization?.pkid),
    org_pkid: organization?.pkid ?? -1,
  })

  const debounceRefreshOrgPages = useThrottledCallback(refreshOrgPages, 2000, {
    trailing: true,
  })

  return (
    <Provider
      value={{
        orgPages,
        refreshOrgPages: debounceRefreshOrgPages,
        isPendingOrgPages,
      }}
    >
      {children}
    </Provider>
  )
}
