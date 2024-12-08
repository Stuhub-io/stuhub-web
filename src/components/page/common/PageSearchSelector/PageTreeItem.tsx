import { Page, PageViewTypeEnum } from '@/schema/page'
import { useCallback, useMemo, useState } from 'react'
import { RiCloseLine, RiFolderFill, RiFolderOpenFill } from 'react-icons/ri'
import { HiCursorClick } from 'react-icons/hi'
import { cn } from '@/libs/utils'
import { IPageData } from '@/components/providers/sidebar'
import { SidebarItem, SidebarItemLeftSpacer, SidebarIconButton } from '@/components/common/Sidebar'

interface PageTreeItemProps {
  page: Page
  pages: IPageData
  level?: number
  onClick?: (page: Page) => void
  excludePagePkIds?: number[]
  showChild?: boolean
  hide?: boolean
  disabled?: boolean
}

export const PageTreeItem = (props: PageTreeItemProps) => {
  const {
    page,
    level = 0,
    pages,
    showChild = true,
    onClick,
    hide = false,
    disabled = false,
    excludePagePkIds = [],
  } = props

  const [expaned, setExpanded] = useState(false)

  const childPages = useMemo(() => {
    if (!showChild) return []
    return pages.map[page.pkid]?.childrenPkids
      .filter((p) => pages.map[p].page.view_type === PageViewTypeEnum.FOLDER)
      .map((pkid) => pages.map[pkid].page)
  }, [page.pkid, pages, showChild])

  const handlePageClick = useCallback(() => {
    onClick?.(page)
  }, [onClick, page])

  if (hide) return null
  if (page.view_type !== PageViewTypeEnum.FOLDER) {
    return null
  }

  return (
    <>
      <SidebarItem
        onClick={disabled ? undefined : handlePageClick}
        className={cn('rounded-none')}
        isDisabled={disabled}
        size="xs"
        fullWidth
        startContent={
          <>
            <SidebarItemLeftSpacer level={level} size="xs" />
            <SidebarIconButton
              onClick={() => setExpanded((prev) => !prev)}
              size="sm"
            >
              {expaned ? <RiFolderOpenFill /> : <RiFolderFill />}
            </SidebarIconButton>
          </>
        }
        endContent={
          <>
            {!disabled && (
              <SidebarIconButton size="sm" showOnGroupHoverOnly>
                <HiCursorClick />
              </SidebarIconButton>
            )}
            {disabled && (
              <SidebarIconButton size="sm" showOnGroupHoverOnly>
                <RiCloseLine />
              </SidebarIconButton>
            )}
          </>
        }
      >
        {page.name || 'Untitled'}
      </SidebarItem>
      {showChild &&
        childPages.map((childPage) => (
          <PageTreeItem
            onClick={onClick}
            excludePagePkIds={excludePagePkIds}
            disabled={excludePagePkIds.includes(childPage.pkid)}
            key={childPage.id}
            page={childPage}
            pages={pages}
            level={level + 1}
            hide={!expaned}
          />
        ))}
      {expaned && showChild && childPages.length === 0 && (
        <SidebarItem
          startContent={<SidebarItemLeftSpacer size="xs" level={level + 1} />}
          size="xs"
          isDisabled
        >
          Nothings inside
        </SidebarItem>
      )}
    </>
  )
}
