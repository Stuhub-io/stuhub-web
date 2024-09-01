import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { CreateNewPageModal } from '../page/CreateNewPageModal'
import { CreatePageRequestBody, Page } from '@/schema/page'
import { Space } from '@/schema/space'
import { newIdGenerator } from '@/libs/utils'

export type IToCreatePage = CreatePageRequestBody & {
  uniqID: string
  status: 'loading' | 'success' | 'error'
}

export type ICreatingPage = {
  id: string
  input: CreatePageRequestBody
  result?: Page
}
interface CreatePageContextValue {
  selectedParent?: Page
  selectedSpace?: Space
  onOpenCreatePage: (space: Space, parentPage?: Page) => void
  onCloseCreatePage: () => void
  isOpenCreatePage: boolean
  createPageData?: CreatePageRequestBody
  setCreatePageData?: Dispatch<SetStateAction<CreatePageRequestBody | undefined>>
  creatingPages: ICreatingPage[]
  appendCreatingPages: (data: ICreatingPage) => void
  doneCreatingPage: (id: string) => void
  updateCreatingPages: (id: string, data: ICreatingPage) => void
  createID: string
}

const [Provider, useCreatePageContext] = createContext<CreatePageContextValue>({
  name: 'CreatePageContext',
})

export { useCreatePageContext }

const genID = newIdGenerator()

export const CreatePageProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedParent, setSelectedParent] = useState<Page>()
  const [selectedSpace, setSelectedSpace] = useState<Space>()
  const [creatingPages, setCreatingPages] = useState<ICreatingPage[]>([])
  const [createPageData, setCreatePageData] = useState<CreatePageRequestBody>()
  const [ createID, setCreateID ] = useState<string>("")

  const appendCreatingPages = (data: ICreatingPage) => {
    setCreatingPages((prev) => [...prev, data])
  }

  const updateCreatingPages = (id: string, data: ICreatingPage) => {
    setCreatingPages((prev) => prev.map((d) => (d.id === id ? data : d)))
  }

  const doneCreatingPage = (id: string) => {
    setCreatingPages((prev) => prev.filter((data) => data.id !== id))
  }

  const onOpenCreatePage = (space: Space, parentPage?: Page) => {
    setSelectedSpace(space)
    setSelectedParent(parentPage)
    setCreatePageData({
      name: '',
      space_pk_id: space.pk_id,
      parent_page_pk_id: parentPage?.pk_id,
      view_type: 'document',
    })
    setCreateID(genID())
    onOpen()
  }

  const onCloseCreatePage = () => {
    setSelectedParent(undefined)
    setSelectedSpace(undefined)
    setCreatePageData(undefined)
    setCreateID("")
    onClose()
  }

  return (
    <Provider
      value={{
        isOpenCreatePage: isOpen,
        selectedParent,
        onCloseCreatePage,
        onOpenCreatePage,
        selectedSpace,
        createPageData,
        setCreatePageData,
        appendCreatingPages,
        doneCreatingPage,
        creatingPages,
        updateCreatingPages,
        createID
      }}
    >
      {children}
      <CreateNewPageModal key={(selectedParent?.id ?? '-') + (selectedSpace?.id ?? '-')}  />
    </Provider>
  )
}
