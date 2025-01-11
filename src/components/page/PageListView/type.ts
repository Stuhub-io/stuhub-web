import { ViewType } from "@/hooks/useViewType"
import { Page } from "@/schema/page"
import { Dispatch, ReactNode, SetStateAction } from "react"


export interface BaseListViewProps {
    viewType?: ViewType
    selectedItemPkIDs?: number[]
    items?: Page[]
    loading?: boolean
    onItemMutateSuccess?: () => void
    onItemDoubleClick?: (page: Page) => void
    onSelectedPkIDsChanged?: Dispatch<SetStateAction<number[]>>
    emptyState?: ReactNode
    // FIXME: move page action handlers to outer component
    // onAddToFavoritesClick?: (page: Page) => void
}