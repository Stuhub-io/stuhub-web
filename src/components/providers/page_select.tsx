import createContext from '@/libs/context'
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

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
