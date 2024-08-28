import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren, useState } from 'react'
import { CreateNewPageModal } from '../page/CreateNewPageModal'

interface CreatePageContextValue {
    selectedParentPkID?: number
    onOpenCreatePage: (parentPKID?: number) => void
    onCloseCreatePage: () => void
    isOpenCreatePage: boolean
}

const [Provider, useCreatePageContext] = createContext<CreatePageContextValue>({
  name: 'CreatePageContext',
})

export { useCreatePageContext }

export const CreatePageProvider = ({ children }: PropsWithChildren) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ selectedParentPkID, setSelectedParentPkID ] = useState<number>()
    
    const onOpenCreatePage = (parentPKID?: number) => {
        setSelectedParentPkID(parentPKID)
        onOpen()
    }

    const onCloseCreatePage = () => {
        setSelectedParentPkID(undefined)
        onClose()
    }

    return (
        <Provider value={{
            isOpenCreatePage: isOpen,
            selectedParentPkID,
            onCloseCreatePage,
            onOpenCreatePage
        }}>
            {children}
            <CreateNewPageModal/>
        </Provider>
    )
}
