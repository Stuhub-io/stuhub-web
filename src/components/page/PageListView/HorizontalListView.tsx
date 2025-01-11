import { BaseListViewProps } from './type'
import { Page } from '@/schema/page'
import { memo, useMemo } from 'react'
import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useAuthContext } from '@/components/auth/AuthGuard'
import Typography from '@/components/common/Typography'
import { getUserFullName } from '@/utils/user'
import { RiMore2Fill } from 'react-icons/ri'
import { PageMenu } from '../PageMenu'
import { PageIconPreview } from './PageIconPreview'
import dayjs from 'dayjs'

type ColDef = {
  key: string
  headerTitle: string
  renderCell: (props: { page: Page; value?: any; colDef: ColDef }) => React.ReactNode
  valueGetter?: (prop: { page: Page }) => any
  width?: string
  cellProps?: TableCellProps
}

export const HorizontalListView = memo((props: BaseListViewProps) => {
  const {
    items,
    loading,
    onItemMutateSuccess,
    onItemDoubleClick,
    selectedItemPkIDs,
    onSelectedPkIDsChanged,
    emptyState,
  } = props

  const { user } = useAuthContext()

  console.log('items', selectedItemPkIDs)

  const handleItemClick = (page: Page) => {
    onSelectedPkIDsChanged?.((prev) => {
      if (prev.includes(page.pkid)) {
        return prev.filter((pkid) => pkid !== page.pkid)
      }
      return [...prev, page.pkid]
    })
  }

  const colsDef = useMemo(() => {
    return [
      {
        key: 'name',
        headerTitle: 'Name',
        renderCell: ({ page }) => (
          <div className="flex items-center gap-3">
            <PageIconPreview page={page} />
            <Typography level="p5" noWrap className="max-w-[400px]">
              {page.name}
            </Typography>
          </div>
        ),
        width: '30%',
      },
      {
        key: 'author',
        headerTitle: 'Owner',
        width: '300px',
        renderCell: ({ page }) => {
          const isMe = page.author?.pkid === user?.pkid
          return (
            <div className="flex items-center gap-3">
              <Avatar
                src={page.author?.avatar}
                fallback={user?.first_name?.charAt(0) || user?.last_name?.charAt(0)}
                size="sm"
              />
              <Typography level="p5" color="textTertiary">
                {isMe
                  ? 'Me'
                  : getUserFullName({
                      firstName: page.author?.first_name,
                      lastName: page.author?.last_name,
                      email: page.author?.email,
                    })}
              </Typography>
            </div>
          )
        },
      },
      {
        key: 'updated_at',
        headerTitle: 'Last Modified',
        width: '30%',
        renderCell: ({ page }) => (
          <div>
            <Typography level="p5" color="textTertiary">
              {dayjs(page.updated_at).format('MMM D, YYYY')}
            </Typography>
          </div>
        ),
      },
      {
        key: 'action',
        headerTitle: '',
        renderCell({ page }) {
          return (
            <div
              className="flex items-center justify-end gap-2"
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <PageMenu page={page} onSuccess={onItemMutateSuccess}>
                <Button isIconOnly radius="full" variant="light">
                  <RiMore2Fill size={16} />
                </Button>
              </PageMenu>
            </div>
          )
        },
      },
    ] as ColDef[]
  }, [onItemMutateSuccess, user])

  if (!loading && items?.length === 0) {
    return emptyState
  }

  return (
    <Table selectionMode="multiple" selectionBehavior="replace">
      <TableHeader>
        {colsDef.map((colDef) => (
          <TableColumn key={colDef.key}>{colDef.headerTitle}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {(items ?? [])?.map((item) => (
          <TableRow
            key={item.id}
            onClick={() => handleItemClick(item)}
            onDoubleClick={() => onItemDoubleClick?.(item)}
            className="group"
          >
            {colsDef.map((colDef) => {
              const value = (item as any)?.[colDef.key]
              return (
                <TableCell key={colDef.key} width={colDef.width}>
                  {colDef.renderCell({ page: item, value, colDef }) ||
                    colDef.valueGetter?.({ page: item }) ||
                    value ||
                    '-'}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

HorizontalListView.displayName = 'HorizontalListView'

// <PageCardView
//   key={item.id}
//   page={item}
//   isSelected={selectedItemPkIDs?.includes(item.pkid)}
//   onClick={handleItemClick}
//   onMutateSuccess={onItemMutateSuccess}
//   onDoubleClick={onItemDoubleClick}
// />
