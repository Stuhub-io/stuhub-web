import { SidebarIconButton } from '@/components/layout/SideBar/SidebarIconbutton'
import { SidebarItem } from '@/components/layout/SideBar/SidebarItem'
import { SidebarItemLeftSpacer } from '@/components/layout/SideBar/SidebarItemLeftSpacer'
import { Page } from '@/schema/page'
import { useCallback, useMemo, useState } from 'react'
import { RiArrowDownSLine, RiCloseLine, RiFileFill } from 'react-icons/ri'
import { HiCursorClick } from 'react-icons/hi'
import { cn } from '@/libs/utils'

interface PageTreeItemProps {
  page: Page
  pages: Page[]
  level?: number
  onClick?: (page: Page) => void
  excludePageIds?: string[]
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
    excludePageIds = [],
  } = props
  const [expaned, setExpanded] = useState(false)

  const childPages = useMemo(() => {
    if (!showChild) return []
    return pages.filter((p) => p.parent_page_pkid === page.pkid && !p.archived_at)
  }, [page.pkid, pages, showChild])

  const handlePageClick = useCallback(() => {
    onClick?.(page)
  }, [onClick, page])

  if (hide) return null

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
            <SidebarIconButton hideOnGroupHover={showChild} size="sm">
              <RiFileFill />
            </SidebarIconButton>
            {showChild && (
              <SidebarIconButton
                onClick={() => setExpanded((prev) => !prev)}
                showOnGroupHoverOnly
                className={cn('rotate-0', {
                  '-rotate-90': !expaned,
                })}
                size="sm"
              >
                <RiArrowDownSLine />
              </SidebarIconButton>
            )}
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
            excludePageIds={excludePageIds}
            disabled={excludePageIds.includes(childPage.id)}
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
          No pages inside
        </SidebarItem>
      )}
    </>
  )
}
