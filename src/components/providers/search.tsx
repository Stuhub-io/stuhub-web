import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { GlobalSearchModal } from '../page/search/GlobalSearchModal'

interface GlobalSearchProviderProps {
  onOpenSearch?: () => void
}

const [Provider, useGlobalSearchContext] = createContext<GlobalSearchProviderProps>({
  name: 'GlobalSearchProvider',
})

export { useGlobalSearchContext }

export const GlobalSearchProvider = ({ children }: PropsWithChildren) => {
  const { onOpen: onOpenSearch, onClose, isOpen } = useDisclosure()
  return (
    <>
      <Provider
        value={{
          onOpenSearch,
        }}
      >
        {children}
      </Provider>
      <GlobalSearchModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}
