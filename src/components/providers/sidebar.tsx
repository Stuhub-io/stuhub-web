'use client'

import createContext from '@/libs/context'
import { PropsWithChildren, useMemo } from 'react'
import { useOrganization } from './organization'
import { useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { useThrottledCallback } from 'use-debounce'
import { Page } from '@/schema/page'

export type ChildMap = Record<
    number,
    {
      page: Page
      childrenPkids: number[]
    }
  >

export interface IPageData {
  list: Page[]
  map: ChildMap
}

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
    data: { data: internalOrgPages } = {},
    refetch: refreshOrgPages,
    isPending: isPendingOrgPages,
  } = useFetchPages({
    allowFetch: Boolean(organization?.pkid),
    org_pkid: organization?.pkid ?? -1,
  })

  const orgPages: IPageData | undefined = useMemo(() => {
    if (!internalOrgPages) {
      return undefined
    }
    const childMap = {} as Record<
      number,
      {
        page: Page
        childrenPkids: number[]
      }
    >

    internalOrgPages?.forEach((page) => {
      childMap[page.pkid] = {
        page,
        childrenPkids: [],
      }
    })
    internalOrgPages?.forEach((page) => {
      if (page.parent_page_pkid && childMap[page.parent_page_pkid]) {
        childMap[page.parent_page_pkid].childrenPkids.push(page.pkid)
      }
    })

    return {
      list: internalOrgPages ?? [],
      map: childMap,
    }
  }, [internalOrgPages])

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
