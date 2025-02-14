import { Button, ButtonGroup, Input, Modal, ModalContent } from '@nextui-org/react'
import { RiArrowDownSLine, RiCalendarLine, RiCloseLine, RiFilterFill, RiSearchLine } from 'react-icons/ri'
import { PageFileTypeSelector, PageViewTypeOptions } from '../../common/PageViewTypeDropdown'
import { useState } from 'react'
import { Selection } from '@nextui-org/react'

interface GlobalSearchModalProps {
  isOpen?: boolean
  onClose?: () => void
}

export const GlobalSearchModal = (props: GlobalSearchModalProps) => {
  const { isOpen, onClose } = props
  
    const [typeFilter, setTypeFilter] = useState<Selection>('all')

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl" hideCloseButton backdrop="opaque">
      <ModalContent className="min-h-[600px] bg-transparent shadow-none px-4">
        <Input size="lg" startContent={<RiSearchLine size={20} />} isClearable />
        <div className="mt-4 rounded-large bg-default-100 p-4">
          <div className="flex items-center gap-3">
            <ButtonGroup>
              <PageFileTypeSelector
                selectedKeys={typeFilter}
                onSelectionChange={setTypeFilter}
                selectionMode="single"
              >
                <Button
                  size="sm"
                  startContent={
                    typeFilter !== 'all' ? (
                      PageViewTypeOptions.find((option) => typeFilter.has(option.value))?.icon
                    ) : (
                      <RiFilterFill size={16} />
                    )
                  }
                >
                    Type
                  {typeFilter === 'all'
                    ? 'Type'
                    : PageViewTypeOptions.find((option) => typeFilter.has(option.value))?.label}
                </Button>
              </PageFileTypeSelector>
              {typeFilter !== 'all' && (
                <Button
                  size="sm"
                  isIconOnly
                  variant="flat"
                  onClick={() => {
                    setTypeFilter('all')
                  }}
                >
                  <RiCloseLine size={16} />
                </Button>
              )}
            </ButtonGroup>
            <Button startContent={<RiCalendarLine size={16} />} size="sm" endContent={<RiArrowDownSLine size={16} />}>
              Modified
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
