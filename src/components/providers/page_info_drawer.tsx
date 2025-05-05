import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

interface PageInfoProviderValue {
  isOpenPageInfo: boolean
  onOpenPageInfo: () => void
  onClosePageInfo: () => void
}

const [Provider, usePageInfoDrawer] = createContext<PageInfoProviderValue>({
  name: 'InfoProvider',
})
export { usePageInfoDrawer }

export const PageInfoDrawerProvider = ({ children }: PropsWithChildren) => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  return (
    <Provider
      value={{
        onClosePageInfo: onClose,
        onOpenPageInfo: onOpen,
        isOpenPageInfo: isOpen,
      }}
    >
      {children}
    </Provider>
  )
}