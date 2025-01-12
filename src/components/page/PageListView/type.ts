import { ViewType } from '@/hooks/useViewType'
import { Page } from '@/schema/page'
import { TableCellProps } from '@nextui-org/react'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface BaseListViewProps {
  viewType?: ViewType
  selectedItemPkIDs?: number[]
  items?: Page[]
  loading?: boolean
  customColumns?: HorizontalListViewColumn[]
  onItemMutateSuccess?: () => void
  onItemDoubleClick?: (page: Page) => void
  onSelectedPkIDsChanged?: Dispatch<SetStateAction<number[]>>
  emptyState?: ReactNode
  parentPage?: Page
  // FIXME: move page action handlers to outer component
  // onAddToFavoritesClick?: (page: Page) => void
}

export type HorizontalListViewColumn = {
  key: string
  headerTitle: string
  renderCell: (props: { page: Page; value?: any; colDef: HorizontalListViewColumn }) => React.ReactNode
  valueGetter?: (prop: { page: Page }) => any
  width?: string
  cellProps?: TableCellProps
}
