import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { Button, Modal, ModalBody, ModalContent, Spacer } from '@nextui-org/react'
import {
  RiArrowDropDownLine,
  RiExpandDiagonal2Line,
  RiImage2Fill,
  RiMoreFill,
  RiShareFill,
  RiStarFill,
  RiUserSmileFill,
} from 'react-icons/ri'
import { BlockBasedEditor } from '@/components/common/BlockBasedEditor'
import { useCreatePageContext } from '@/components/providers/newpage'
import { useId, useState } from 'react'

export const CreateNewPageModal = () => {
  const {
    isOpenCreatePage,
    onCloseCreatePage,
    selectedParent,
    selectedSpace,
    appendToCreatePages,
  } = useCreatePageContext()

  const [title, setTitle] = useState<string>('')
  const uniqId = useId()

  const handleOnClose = () => {
    if (!selectedSpace) return
    // FIXME: check if emptt content
    if (!title) {
      onCloseCreatePage()
      return
    }
    appendToCreatePages({
      name: title || 'Untitled',
      parent_page_pk_id: selectedParent?.pk_id,
      space_pk_id: selectedSpace.pk_id,
      view_type: 'document',
      uniqID: uniqId,
      status: 'loading',
    })
    onCloseCreatePage()
  }

  return (
    <Modal
      size="4xl"
      isOpen={isOpenCreatePage}
      hideCloseButton
      onClose={handleOnClose}
      scrollBehavior="outside"
    >
      <ModalContent>
        <ModalBody className="min-h-[80vh] px-3 py-3">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button isIconOnly size="sm" variant="light">
                <RiExpandDiagonal2Line size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="flat" endContent={<RiArrowDropDownLine size={16} />}>
                {selectedSpace?.name}
              </Button>
              <Button size="sm" variant="flat" endContent={<RiArrowDropDownLine size={16} />} disabled>
                Unselected
              </Button>
            </div>
            <Spacer className="flex-1" />
            <div className="flex items-center justify-end">
              <Button size="sm" variant="light" isIconOnly>
                <RiShareFill size={16} />
              </Button>
              <Button size="sm" variant="light" isIconOnly>
                <RiStarFill size={16} />
              </Button>
              <Button size="sm" variant="light" isIconOnly>
                <RiMoreFill size={16} />
              </Button>
            </div>
          </div>
          <div className="px-20">
            <div className="group flex flex-col">
              <div className="h-8 opacity-0 transition duration-200 group-hover:opacity-100">
                <div className="hidden gap-1 opacity-60 group-hover:flex">
                  <Button startContent={<RiUserSmileFill size={16} />} size="sm" variant="light">
                    Icons
                  </Button>
                  <Button startContent={<RiImage2Fill size={16} />} size="sm" variant="light">
                    Icons
                  </Button>
                </div>
              </div>
              <TextAreaNoBackground
                minRows={1}
                placeholder="Untitled"
                value={title}
                onValueChange={setTitle}
                classNames={{
                  input: 'text-5xl font-semibold',
                }}
              />
              <div className="-mx-3 mt-2 pb-10" role="dialog">
                <BlockBasedEditor />
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
