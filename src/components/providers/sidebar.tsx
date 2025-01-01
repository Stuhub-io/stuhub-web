'use client'

import createContext from '@/libs/context'
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useOrganization } from './organization'
import { useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { useThrottledCallback } from 'use-debounce'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { usePersistCollapseContext } from './collapse'
import { useAuthContext } from '../auth/AuthGuard'

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
  getChildrenPageByPkID: (pagePkId: number) => Page[]
  showSidebar?: boolean
  setShowSidebar: (_: boolean) => void
}

const [Provider, useSidebar] = createContext<SidebarContextValue>({
  name: 'SidebarContext',
})

export { useSidebar }

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const { organization, isGuest } = useOrganization()

  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()
  const [showSidebar, setShowSidebar] = useState(() => getCollapseState(`main-layout-sidebar`))

  const { status } = useAuthContext()

  useEffect(() => {
    persistCollapseData(`main-layout-sidebar`, showSidebar)
  }, [showSidebar, persistCollapseData])

  const {
    data: { data: internalOrgPages } = {},
    refetch: refreshOrgPages,
    isPending: isPendingOrgPages,
  } = useFetchPages({
    allowFetch: Boolean(organization?.pkid) && status === 'authenticated' && !isGuest,
    is_archived: false,
    org_pkid: organization?.pkid ?? -1,
    view_types: [PageViewTypeEnum.FOLDER],
    all: true,
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

  const getChildrenPageByPkID = useCallback(
    (pagePkId: number) => {
      if (!orgPages) return []
      const childPagePkIDs = orgPages.map[pagePkId]?.childrenPkids ?? []
      const child = childPagePkIDs?.map((pkid) => orgPages.map[pkid].page)
      return child.filter((p) => !p?.archived_at)
    },
    [orgPages],
  )

  return (
    <Provider
      value={{
        orgPages,
        refreshOrgPages: debounceRefreshOrgPages,
        showSidebar,
        setShowSidebar,
        isPendingOrgPages,
        getChildrenPageByPkID,
      }}
    >
      {children}
    </Provider>
  )
}
