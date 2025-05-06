import { OrganizationPageParams } from '@/constants/routes'
import createContext from '@/libs/context'
import { useParams } from 'next/navigation'
import { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'

interface PageInfoProviderValue {
  selectedPagePkIDs: number[]
  setSelectedPagePkIDs: Dispatch<SetStateAction<number[]>>
}

const [Provider, usePageSelect] = createContext<PageInfoProviderValue>({
  name: 'InfoProvider',
})
export { usePageSelect }

export const PageSelectProvider = ({ children }: PropsWithChildren) => {
  const [pagePkIDs, setPagePkIDs] = useState<number[]>([])
  const { pageID } = useParams<OrganizationPageParams>()

  // Reset select page on page change
  useEffect(() => {
    setPagePkIDs([])
  }, [setPagePkIDs, pageID])

  return (
    <Provider
      value={{
        selectedPagePkIDs: pagePkIDs,
        setSelectedPagePkIDs: setPagePkIDs
      }}
    >
      {children}
    </Provider>
  )
}
