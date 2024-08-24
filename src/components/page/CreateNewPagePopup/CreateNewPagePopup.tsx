import { useToast } from "@/hooks/useToast"
import { QUERY_KEYS } from "@/mutation/keys"
import { useCreatePage } from "@/mutation/mutator/page/useCreatePage"
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react"
import { useQueryClient } from "@tanstack/react-query"
import { ReactNode, useState } from "react"
import { RiFile2Fill, RiImage2Fill, RiTable2 } from "react-icons/ri"


export interface  CreateNewPopupProps {
    renderTrigger: ReactNode
    spacePkId: number
    pagePkId: number
}

export const CreateNewPagePopup = (props: CreateNewPopupProps) => {
    const { renderTrigger, spacePkId, pagePkId } = props
    const { toast } = useToast()
    const [open, setOpen ] = useState(false)

    const { mutateAsync: createPage } = useCreatePage({
        parent_page_pk_id: pagePkId,
        space_pk_id: spacePkId,
    })
    const queryClient = useQueryClient()

    const onAddNewPage = async () => {
        setOpen(false)
        try {
        await createPage({
            name: 'Untitled',
            space_pk_id: spacePkId,
            parent_page_pk_id: pagePkId,
            view_type: 'document',
        })

        queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.GET_SPACE_PAGES({ space_pk_id: spacePkId }),
        })

    } catch (error) {
      toast({
        variant: 'danger',
        title: 'Failed to create page',
        description: "We couldn't create a new page. Please try again later.",
      })
    }
  }

    return (
        <Dropdown 
            isOpen={open}
            onOpenChange={setOpen}
        >
            <DropdownTrigger>
                {renderTrigger}
            </DropdownTrigger>
            <DropdownMenu
                variant="flat"
            >
                <DropdownSection title="Create">
                    <DropdownItem
                        startContent={
                            <RiFile2Fill/>
                        }
                        onClick={onAddNewPage}
                    >
                        Doc
                    </DropdownItem>
                    <DropdownItem
                        startContent={
                            <RiTable2/>
                        }
                    >
                        Table
                    </DropdownItem>
                    <DropdownItem
                        startContent={
                            <RiImage2Fill/>
                        }
                    >
                        Gallery
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}