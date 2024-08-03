'use client'

import createContext from '@/libs/context'
import { useFetchOrgSpaces } from '@/mutation/querier/useFetchSpaces'
import { PropsWithChildren } from 'react'
import { useOrganization } from './organization'
import { Space } from '@/schema/space'

interface SidebarContextValue {
  isPendingSpaces: boolean
  spaces?: Space[]
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

  return (
    <Provider
      value={{
        isPendingSpaces,
        spaces,
      }}
    >
      {children}
    </Provider>
  )
}
