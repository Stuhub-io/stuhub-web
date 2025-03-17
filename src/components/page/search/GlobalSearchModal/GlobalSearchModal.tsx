import { Button, Divider, Input, Modal, ModalContent } from '@nextui-org/react'
import {
  RiFilter3Line,
  RiSearchLine,
} from 'react-icons/ri'
import { useEffect, useRef, useState } from 'react'
import { Selection } from '@nextui-org/react'
import { usePersistCollapseContext } from '@/components/providers/collapse'
import { GlobalSearchFilter } from './GlobalSearchFilter'
import { useOrganization } from '@/components/providers/organization'
import { GlobalSearchContent } from './GlobalSearchContent'

interface GlobalSearchModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export const GlobalSearchModal = (props: GlobalSearchModalProps) => {
  const { isOpen, onClose } = props

  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()
  const [openFilter, setOpenFilter] = useState(getCollapseState(`global-search`))
  const inputRef = useRef<HTMLInputElement|null>(null)
  const { organization } = useOrganization()

  useEffect(() => {
    persistCollapseData(`global-search`, openFilter)
  }, [openFilter, persistCollapseData])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const [typeFilter, setTypeFilter] = useState<Selection>('all')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" hideCloseButton backdrop="opaque">
      <ModalContent>
        <div className='h-[600px] flex flex-col'>
          <div className="flex items-center pr-3">
            <Input
              classNames={{
                inputWrapper: '!rounded-b-none border-none',
              }}
              autoFocus
              variant="bordered"
              size="lg"
              startContent={<RiSearchLine size={20} />}
              ref={inputRef}
              isClearable
              placeholder={`Search or ask a question in ${organization?.name || "Untitled"}`}
            />
            <Button isIconOnly variant="flat" size="sm" onClick={() => setOpenFilter(!openFilter)}>
              <RiFilter3Line size={14} />
            </Button>
          </div>
          <Divider orientation="horizontal" />
          <GlobalSearchFilter isOpen={openFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} />
          <GlobalSearchContent onClose={onClose} />
        </div>
      </ModalContent>
    </Modal>
  )
}
