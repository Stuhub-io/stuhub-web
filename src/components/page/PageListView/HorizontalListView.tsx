import { BaseListViewProps, HorizontalListViewColumn } from './type'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { memo, useMemo } from 'react'
import {
  Avatar,
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useAuthContext } from '@/components/auth/AuthGuard'
import Typography from '@/components/common/Typography'
import { getUserFullName } from '@/utils/user'
import { RiMore2Fill, RiStarFill } from 'react-icons/ri'
import { PageMenu } from '../PageMenu'
import { PageIconPreview } from './PageIconPreview'
import dayjs from 'dayjs'
import { calculateDocumentSize, formatReadableFileSize } from '@/utils/file'
import { PageQuickActionMenu } from '../PageMenu/QuickActionMenuList'

export const HorizontalListView = memo((props: BaseListViewProps) => {
  const {
    items,
    loading,
    onItemMutateSuccess,
    onItemDoubleClick,
    onSelectedPkIDsChanged,
    emptyState,
    parentPage,
    customColumns,
  } = props

  const { user } = useAuthContext()

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
          <div className="flex max-w-[350px] items-center gap-3">
            <PageIconPreview page={page} />
            <Typography level="p5" noWrap className="max-w-[400px]">
              {page.name || 'Untitled'}
            </Typography>
            {Boolean(page.page_star) && (
              <div className="shrink-0">
                <RiStarFill className="text-warning" size={14} />
              </div>
            )}
          </div>
        ),
        width: '30%',
      },
      {
        key: 'author',
        headerTitle: 'Owner',
        width: '30%',
        renderCell: ({ page }) => {
          const isMe = page.author?.pkid === user?.pkid
          return (
            <div className="flex items-center gap-3">
              <Avatar
                src={page.author?.avatar}
                fallback={user?.first_name?.charAt(0) || user?.last_name?.charAt(0)}
                size="sm"
                className="shrink-0"
              />
              <Typography level="p5" color="textTertiary" noWrap>
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
        headerTitle: 'Last modified',
        width: '20%',
        renderCell: ({ page }) => (
          <div>
            <Typography level="p5" color="textTertiary" noWrap>
              {dayjs(page.updated_at).format('MMM D, YYYY')}
            </Typography>
          </div>
        ),
      },
      {
        key: 'size',
        headerTitle: 'File size',
        width: '10%',
        renderCell: ({ page }) => {
          if (page.view_type === PageViewTypeEnum.FOLDER) return null
          return (
            <div className="flex">
              <Typography level="p5" color="textTertiary" noWrap>
                {formatReadableFileSize(
                  page.asset?.size || calculateDocumentSize(page?.document?.json_content ?? '') || 0,
                )}
              </Typography>
            </div>
          )
        },
      },
      ...(customColumns ?? []),
      {
        key: 'quick_actions',
        headerTitle: '',
        width: '130px',
        renderCell: ({ page }) => <PageQuickActionMenu page={page} onSuccess={onItemMutateSuccess} />,
      },
      {
        key: 'action',
        headerTitle: '',
        width: '100px',
        renderCell({ page }) {
          return (
            <div className="flex items-center justify-end gap-2" onDoubleClick={(e) => e.stopPropagation()}>
              <PageMenu page={page} onSuccess={onItemMutateSuccess} parentPage={parentPage}>
                <Button isIconOnly radius="full" variant="light">
                  <RiMore2Fill size={16} />
                </Button>
              </PageMenu>
            </div>
          )
        },
      },
    ] as HorizontalListViewColumn[]
  }, [onItemMutateSuccess, parentPage, user?.first_name, user?.last_name, user?.pkid, customColumns])

  if (!loading && items?.length === 0) {
    return emptyState
  }

  if (loading) {
    return (
      <Table>
        <TableHeader>
          {colsDef.map((colDef) => (
            <TableColumn key={colDef.key}>{colDef.headerTitle}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            {colsDef.map((colDef) => (
              <TableCell key={colDef.key} colSpan={colsDef.length}>
                <Skeleton className="h-[30px] w-full" />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    )
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
                    value || (
                      <Typography level="p5" color="textTertiary">
                        -
                      </Typography>
                    )}
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
