import { Page } from '@/schema/page'
import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { SharePageModalMain } from './SharePageModalMain'
import { SharePageAccessRequests } from './SharePageAccessRequest'

export interface SharePageModalProps {
  open?: boolean
  page?: Page
  onClose?: () => void
}

export const useSharePageModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedSharePage, setSelectedPage] = useState<Page>()

  const onOpenShareModal = (page: Page) => {
    onOpen()
    setSelectedPage(page)
  }

  const onCloseShareModal = () => {
    onClose()
    // wait for modal to close before clearing selected page
    setTimeout(() => {
      setSelectedPage(undefined)
    }, 300)
  }

  return {
    isOpenShareModal: isOpen,
    onOpenShareModal,
    onCloseShareModal,
    selectedSharePage,
  }
}

export const SharePageModal = (props: SharePageModalProps) => {
  const { onClose, open, page } = props
  const [view, setView] = useState<'share' | 'requests'>('share')
  console.log({ view })
  return (
    <>
      <Modal isOpen={open} onClose={onClose} size="xl">
        <ModalContent>
          {view === 'share' && (
            <SharePageModalMain
              page={page}
              onClose={onClose}
              onViewRequests={() => {
                setView('requests')
              }}
            />
          )}
          {view === 'requests' && page && (
            <SharePageAccessRequests
              page={page}
              onClose={() => {
                setView('share')
              }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
