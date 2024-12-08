'use client'

import { PopperCard } from '@/components/common/PopperCard'
import Typography from '@/components/common/Typography'
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
import { RiArrowRightDownLine, RiFileFill } from 'react-icons/ri'
import { RenamePageInput } from '@/components/page/common/RenamePageInput'
import { useEffect, useState } from 'react'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams, useRouter } from 'next/navigation'
import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { PageViewTypeEnum } from '@/schema/page'

export const PageBreadCrumbs = () => {
  const { push } = useRouter()
  const { pageID } = useParams<OrganizationPageParams>()
  const { organization } = useOrganization()
  const pagePaths = useSidebarBreadcrumb()

  const { data: { data: pageDetail } = {}, isPending } = useFetchPage({
    allowFetch: Boolean(pageID),
    pageID,
  })

  const { isPendingOrgPages } = useSidebar()

  const onSelectPage = (selectedPageID: string) => {
    push(ROUTES.VAULT_PAGE({ orgSlug: organization?.slug ?? '', pageID: selectedPageID }))
  }

  const isLoading = isPending || isPendingOrgPages
  const [openRename, setOpenRename] = useState(false)

  useEffect(() => {
    setOpenRename(false)
  }, [pageID])

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
        {pageID &&
          isLoading && [
            <BreadcrumbItem key="loading1">
              <Skeleton className="h-3.5 w-20 rounded-medium" />
            </BreadcrumbItem>,
            <BreadcrumbItem key="loading2">
              <Skeleton className="h-3.5 w-28 rounded-medium" />
            </BreadcrumbItem>,
          ]}
        {(!isLoading || !pageID) && (
          <BreadcrumbItem
            className="truncate text-nowrap"
            onClick={() => {
              push(
                ROUTES.ROOT_VAULTS({
                  orgSlug: organization?.slug ?? '',
                }),
              )
            }}
          >
            My Vault
          </BreadcrumbItem>
        )}
        {pagePaths.map((page) => {
          const isCurrentPage = page.id === pageDetail?.id
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
              startContent={page.view_type === PageViewTypeEnum.DOCUMENT ? <RiFileFill /> : null}
              className="truncate text-nowrap"
              onClick={() => {
                if (isCurrentPage) {
                  setOpenRename(true)
                  return
                }
                onSelectPage(page.id)
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
