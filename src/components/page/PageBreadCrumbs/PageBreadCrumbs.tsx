'use client'

import { PopperCard } from '@/components/common/PopperCard'
import Typography from '@/components/common/Typography'
import { usePageContext } from '@/components/providers/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useSidebarBreadcrumb } from '@/hooks/breadcrumb/useSidebarBreadcrumb'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from '@nextui-org/react'
import { RiArrowRightDownLine } from 'react-icons/ri'
import { RenamePageInput } from '../RenamePageInput'
import { useEffect, useState } from 'react'

export const PageBreadCrumbs = () => {
  const pagePaths = useSidebarBreadcrumb()
  const { isLoading: isPageLoading, onSelectPage, currentPage } = usePageContext()
  const { isPendingPrivatePages, isPendingSpaces } = useSidebar()

  const isLoading = isPageLoading || isPendingSpaces || isPendingPrivatePages
  const [openRename, setOpenRename] = useState(false)

  useEffect(() => {
    setOpenRename(false)
  }, [currentPage?.id])

  return (
    <>
      <Breadcrumbs
        separator="/"
        variant="light"
        classNames={{
          base: 'flex-1',
          list: 'flex-nowrap overflow-hidden',
        }}
        maxItems={3}
        itemsBeforeCollapse={1}
        itemsAfterCollapse={2}
        renderEllipsis={({ items, ellipsisIcon, separator }) => (
          <div className="flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly className="h-6 w-6 min-w-6" size="sm" variant="flat">
                  {ellipsisIcon}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Routes">
                {items.map(({ key, ...itemProps }, index) => (
                  <DropdownItem
                    key={String(key) ?? `item${index}`}
                    href={itemProps.href}
                    onClick={itemProps.onClick}
                    startContent={index !== 0 && <RiArrowRightDownLine size={16} />}
                  >
                    {itemProps.children}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {separator}
          </div>
        )}
      >
        {isLoading && [
          <BreadcrumbItem key="loading1">
            <Skeleton className="h-3.5 w-20 rounded-medium" />
          </BreadcrumbItem>,
          <BreadcrumbItem key="loading2">
            <Skeleton className="h-3.5 w-28 rounded-medium" />
          </BreadcrumbItem>,
        ]}
        {pagePaths.map((page) => {
          const isCurrentPage = page.id === currentPage?.id
          const child = (
            <Typography noWrap level="p5" className="text-inherit">
              {page.name || 'Untitled'}
            </Typography>
          )
          const body = !isCurrentPage ? (
            child
          ) : (
            <PopperCard
              onClose={() => setOpenRename(false)}
              isOpen={openRename}
              renderContent={(setRef) => (
                <RenamePageInput ref={setRef} page={page} onClose={() => setOpenRename(false)} />
              )}
            >
              {child}
            </PopperCard>
          )

          return (
            <BreadcrumbItem
              key={page.id}
              className="max-w-[200px] truncate text-nowrap"
              onClick={() => {
                if (isCurrentPage) {
                  setOpenRename(true)
                  return
                }
                onSelectPage(page || 'Untitled')
              }}
              isCurrent={false}
            >
              {body}
            </BreadcrumbItem>
          )
        })}
      </Breadcrumbs>
    </>
  )
}
