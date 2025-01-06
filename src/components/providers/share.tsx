import createContext from '@/libs/context'
import { SharePageModal, useSharePageModal } from '../page/common/SharePageModal'
import { PropsWithChildren } from 'react'
import { Page } from '@/schema/page'

interface SharePageModalContextValue {
  selectedSharePage: any
  onOpenShareModal: (page: Page) => void
  onCloseShareModal: () => void
  isOpenShareModal: boolean
}

const [Provider, useSharePageContext] = createContext<SharePageModalContextValue>({
  name: 'SharePageModal',
})

export { useSharePageContext }

export const SharePageProvider = ({ children }: PropsWithChildren) => {
  const { selectedSharePage, isOpenShareModal, onCloseShareModal, onOpenShareModal } =
    useSharePageModal()
  return (
    <Provider value={{
        selectedSharePage,
        isOpenShareModal,
        onCloseShareModal,
        onOpenShareModal,
    }}>
      {children}
      {selectedSharePage && (
        <SharePageModal
          open={isOpenShareModal}
          onClose={onCloseShareModal}
          page={selectedSharePage}
        />
      )}
    </Provider>
  )
}
