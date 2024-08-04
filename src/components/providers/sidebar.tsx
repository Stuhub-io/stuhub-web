'use client'

import createContext from '@/libs/context'
import { useFetchOrgSpaces } from '@/mutation/querier/useFetchSpaces'
import { PropsWithChildren, useMemo } from 'react'
import { useOrganization } from './organization'
import { Space } from '@/schema/space'

interface SidebarContextValue {
  isPendingSpaces: boolean
  privateSpace?: Space
  publicSpaces?: Space[]
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

  return (
    <Provider
      value={{
        isPendingSpaces,
        privateSpace,
        publicSpaces,
      }}
    >
      {children}
    </Provider>
  )
}
