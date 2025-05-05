import { ViewType } from '@/hooks/useViewType'
import { Page } from '@/schema/page'
import { TableCellProps } from '@nextui-org/react'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Selection } from '@nextui-org/react'

export interface BaseListViewProps {
  viewType?: ViewType
  items?: Page[]
  loading?: boolean
  customColumns?: HorizontalListViewColumn[]
  onItemMutateSuccess?: () => void
  onItemDoubleClick?: (page: Page) => void
  emptyState?: ReactNode
  parentPage?: Page
  pagePkIDsSelection?: Selection
  setPagePkIDsSelection?: Dispatch<SetStateAction<Selection>>
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
