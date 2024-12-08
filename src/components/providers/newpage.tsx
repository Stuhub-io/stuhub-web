import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { Dispatch, PropsWithChildren, SetStateAction, useId, useState } from 'react'
import { CreateNewPageModal } from '../page/common/CreateNewPageModal'
import { CreatePageRequest, Page, PageViewType, PageViewTypeEnum } from '@/schema/page'
import { newIdGenerator } from '@/libs/utils'
import { useOrganization } from './organization'
import { JSONContent } from 'novel'
import { useCreatePage } from '@/mutation/mutator/page/useCreatePage'
import { useSidebar } from './sidebar'
import { useToast } from '@/hooks/useToast'

export type IToCreatePage = CreatePageRequest & {
  uniqID: string
  status: 'loading' | 'success' | 'error'
}

export type ICreatingDoc = {
  id: string
  input: CreatePageRequest
  result?: Page
}

type CreateDocData = Omit<CreatePageRequest, 'document'> & {
  document: {
    json_content: JSONContent
  }
}
interface CreatePageContextValue {
  selectedParent?: Page
  onOpenCreateDoc: (parentPage?: Page) => void
  onCloseCreateDoc: () => void
  isOpenCreateDoc: boolean
  createDocData?: CreateDocData
  setCreateDocData?: Dispatch<SetStateAction<CreateDocData | undefined>>
  creatingPages: ICreatingDoc[]
  appendCreatingPages: (data: ICreatingDoc) => void
  doneCreatingPage: (id: string) => void
  updateCreatingPages: (id: string, data: ICreatingDoc) => void
  createID: string
}

const [Provider, useCreatePageContext] = createContext<CreatePageContextValue>({
  name: 'CreatePageContext',
})

export { useCreatePageContext }

const genID = newIdGenerator()

export const CreatePageProvider = ({ children }: PropsWithChildren) => {
  const { organization } = useOrganization()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedParent, setSelectedParent] = useState<Page>()
  const [creatingPages, setCreatingPages] = useState<ICreatingDoc[]>([])
  const [createDocData, setCreateDocData] = useState<CreateDocData>()
  const [createID, setCreateID] = useState<string>('')

  const appendCreatingPages = (data: ICreatingDoc) => {
    setCreatingPages((prev) => [...prev, data])
  }

  const updateCreatingPages = (id: string, data: ICreatingDoc) => {
    setCreatingPages((prev) => prev.map((d) => (d.id === id ? data : d)))
  }

  const doneCreatingPage = (id: string) => {
    setCreatingPages((prev) => prev.filter((data) => data.id !== id))
  }

  const onOpenCreateDoc = (parentPage?: Page) => {
    setSelectedParent(parentPage)
    setCreateDocData({
      name: '',
      org_pkid: organization?.pkid ?? -1,
      parent_page_pkid: parentPage?.pkid,
      view_type: PageViewTypeEnum.DOCUMENT,
      cover_image: '',
      document: {
        json_content: {} as JSONContent,
      },
    })
    setCreateID(genID())
    onOpen()
  }

  const onCloseCreateDoc = () => {
    setSelectedParent(undefined)
    setCreateDocData(undefined)
    setCreateID('')
    onClose()
  }

  return (
    <Provider
      value={{
        isOpenCreateDoc: isOpen,
        selectedParent,
        onCloseCreateDoc,
        onOpenCreateDoc,
        createDocData,
        setCreateDocData,
        appendCreatingPages,
        doneCreatingPage,
        creatingPages,
        updateCreatingPages,
        createID,
      }}
    >
      {children}
      <CreateNewPageModal key={selectedParent?.id ?? ''} />
    </Provider>
  )
}

export const useNewPage = ({
  parentPagePkID,
  type,
}: {
  parentPagePkID?: number
  type: PageViewType
}) => {
  const { toast } = useToast()
  const { organization } = useOrganization()
  const { refreshOrgPages } = useSidebar()

  const { appendCreatingPages, updateCreatingPages } = useCreatePageContext()
  const tempId = useId()

  const { mutateAsync, isPending } = useCreatePage({
    parent_page_pkid: parentPagePkID,
    org_pkid: organization?.pkid ?? -1,
    tempId,
  })

  const onClick = async (onSucces?: (page: Page) => void) => {
    try {
      const dataInput = {
        name: '',
        parent_page_pkid: parentPagePkID,
        org_pkid: organization?.pkid ?? -1,
        view_type: type,
        cover_image: '',
        document: {
          json_content: '{}',
        },
      }
      appendCreatingPages({
        input: dataInput,
        id: tempId,
      })

      const { data: newPage } = await mutateAsync(dataInput)

      updateCreatingPages(tempId, {
        id: tempId,
        input: dataInput,
        result: newPage,
      })

      refreshOrgPages()
      onSucces?.(newPage)
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Failed to create page',
      })
    }
  }
  return {
    onCreate: onClick,
    isPending,
  }
}
