import createContext from '@/libs/context'
import { Page } from '@/schema/page'
import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren, useState } from 'react'

interface PageInfoProviderValue {
  isOpenPageInfo: boolean
  onOpenPageInfo: (page: Page) => void
  onClosePageInfo: () => void
  page?: Page
}

const [Provider, usePageInfoDrawer] = createContext<PageInfoProviderValue>({
  name: 'InfoProvider',
})
export { usePageInfoDrawer }

export const PageInfoDrawerProvider = ({ children }: PropsWithChildren) => {
  const { onOpen, isOpen: isOpenPageInfo, onClose } = useDisclosure()

  const [selectedPage, setSelectedPage] = useState<Page>()
  const onOpenPageInfo = (page: Page) => {
    onOpen()
    setSelectedPage(page)
  }
  const onClosePageInfo = () => {
    onClose()
    setTimeout(() => {
      setSelectedPage(undefined)
    }, 300)
  }

  return (
    <Provider
      value={{
        onClosePageInfo,
        onOpenPageInfo,
        isOpenPageInfo,
        page: selectedPage
      }}
    >
      {children}
    </Provider>
  )
}