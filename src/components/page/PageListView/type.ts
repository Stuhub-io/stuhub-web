import { Page } from "@/schema/page"
import { Dispatch, ReactNode, SetStateAction } from "react"


export interface BaseListViewProps {
    selectedItemPkIDs?: number[]
    items?: Page[]
    loading?: boolean
    onItemMutateSuccess?: () => void
    onItemDoubleClick?: (page: Page) => void
    onSelectedPkIDsChanged?: Dispatch<SetStateAction<number[]>>
    emptyState?: ReactNode
}