import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren, useState } from 'react'
import { CreateNewPageModal } from '../page/CreateNewPageModal'
import { CreatePageRequestBody, Page } from '@/schema/page'
import { Space } from '@/schema/space'


export type IToCreatePage = CreatePageRequestBody & {
    uniqID: string
    status: 'loading' | 'success' | 'error'
}
interface CreatePageContextValue {
    selectedParent?: Page
    selectedSpace?: Space
    onOpenCreatePage: (space: Space, parentPage?: Page) => void
    onCloseCreatePage: () => void
    isOpenCreatePage: boolean
    toCreatePages: IToCreatePage[]
    appendToCreatePages: (page: IToCreatePage) => void
    doneCreatePage: (uniqID: string) => void
}

const [Provider, useCreatePageContext] = createContext<CreatePageContextValue>({
  name: 'CreatePageContext',
})

export { useCreatePageContext }

export const CreatePageProvider = ({ children }: PropsWithChildren) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ selectedParent, setSelectedParent ] = useState<Page>()
    const [ selectedSpace, setSelectedSpace ] = useState<Space>()
    const [ toCreatePages, setToCreatePages ] = useState<IToCreatePage[]>([])

    const appendToCreatePages = (page: IToCreatePage) => {
        setToCreatePages((prev) => [...prev, page])
    }

    const doneCreatePage = (uniqID: string) => {
        setToCreatePages(prev => prev.filter(page => page.uniqID !== uniqID))
    }
    
    const onOpenCreatePage = (space: Space, parentPage?: Page) => {
        setSelectedSpace(space)
        setSelectedParent(parentPage)
        onOpen()
    }

    const onCloseCreatePage = () => {
        setSelectedParent(undefined)
        setSelectedSpace(undefined)
        onClose()
    }

    return (
        <Provider value={{
            isOpenCreatePage: isOpen,
            selectedParent,
            onCloseCreatePage,
            onOpenCreatePage,
            selectedSpace,
            toCreatePages,
            appendToCreatePages,
            doneCreatePage
        }}>
            {children}
            <CreateNewPageModal key={
                (selectedParent?.id ?? "-") + (selectedSpace?.id ?? "-")
            }/>
        </Provider>
    )
}
