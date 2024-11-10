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
import { useToast } from '@/hooks/useToast'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useCreatePage } from '@/mutation/mutator/page/useCreatePage'
import { useCallback } from 'react'
import { PageViewTypeEnum } from '@/schema/page'
import { useOrganization } from '@/components/providers/organization'
import { JSONContent } from 'novel'

export const CreateNewPageModal = () => {
  const {
    isOpenCreatePage,
    onCloseCreatePage,
    selectedParent,
    appendCreatingPages,
    createPageData,
    setCreatePageData,
    updateCreatingPages,
    createID,
  } = useCreatePageContext()
  const { organization } = useOrganization()

  const queryClient = useQueryClient()
  const { toast } = useToast()

  const title = createPageData?.name
  const content = createPageData?.document.json_content ?? ({} as JSONContent)

  const setContent = useCallback(
    (value: JSONContent) => {
      setCreatePageData?.((pageInput) => ({
        ...(pageInput ?? {
          name: '',
          view_type: PageViewTypeEnum.DOCUMENT,
          parent_page_pkid: selectedParent?.pkid,
          org_pkid: organization?.pkid ?? -1,
          cover_image: '',
          document: {
            json_content: {},
          },
        }),
        document: {
          json_content: value,
        },
      }))
    },
    [organization?.pkid, selectedParent?.pkid, setCreatePageData],
  )

  const setTitle = (value: string) => {
    setCreatePageData?.((pageInput) => ({
      ...(pageInput ?? {
        view_type: PageViewTypeEnum.DOCUMENT,
        parent_page_pkid: selectedParent?.pkid,
        org_pkid: organization?.pkid ?? -1,
        cover_image: '',
        document: {
          json_content: {},
        },
      }),
      name: value,
    }))
  }

  const { mutateAsync } = useCreatePage({
    parent_page_pkid: selectedParent?.pkid ?? -1,
    org_pkid: organization?.pkid ?? -1,
    tempId: createID,
  })

  const handleOnClose = () => {
    // FIXME: check if empty content
    if (!title) {
      onCloseCreatePage()
      return
    }
    onCloseCreatePage()
    ;(async () => {
      try {
        const dataInput = {
          ...createPageData,
          document: {
            json_content: JSON.stringify(content),
          },
        }
        appendCreatingPages({
          id: createID,
          input: dataInput,
        })
        
        const { data: newPage } = await mutateAsync(dataInput)
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_ORG_PAGES({ org_pkid: organization?.pkid ?? -1 }),
        })
        updateCreatingPages(createID, {
          id: createID,
          input: dataInput,
          result: newPage,
        })
      } catch (e) {
        toast({
          title: 'Some thing wrent wrong',
          description: "Can't not create page, try again later",
          variant: 'danger',
        })
      }
    })()
  }

  return (
    <Modal
      size="4xl"
      isOpen={isOpenCreatePage}
      hideCloseButton
      onClose={handleOnClose}
      scrollBehavior="outside"
    >
      <ModalContent role="dialog">
        <ModalBody className="min-h-[80vh] px-3 py-3">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button isIconOnly size="sm" variant="light">
                <RiExpandDiagonal2Line size={16} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="flat"
                endContent={<RiArrowDropDownLine size={16} />}
                disabled
              >
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
                autoFocus
                classNames={{
                  input: 'text-5xl font-semibold',
                }}
              />
            </div>
            <div className="-mx-3 mt-2 pb-10">
              <BlockBasedEditor
                jsonContent={(content ?? '{}') as unknown as JSONContent}
                onJsonContentChange={(json) => setContent(json)}
              />
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
