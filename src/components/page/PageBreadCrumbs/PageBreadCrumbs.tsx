'use client'

import { useOrganization } from '@/components/providers/organization'
import { usePageContext } from '@/components/providers/page'
import { ROUTES } from '@/constants/routes'
import { useSidebarBreadcrumb } from '@/hooks/breadcrumb/useSidebarBreadcrumb'
import { BreadcrumbItem, Breadcrumbs, Skeleton } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

// FIXME: Handle loading, selector sub Links
export const PageBreadCrumbs = () => {
  const { organization } = useOrganization()
  const pagePaths = useSidebarBreadcrumb()
  const { isLoading } = usePageContext()
  const { push } = useRouter()

  return (
    <Breadcrumbs separator="/" variant="light">
      {isLoading && [
        <BreadcrumbItem key="loading1">
          <Skeleton className="h-4 w-20 rounded-medium" />
        </BreadcrumbItem>,
        <BreadcrumbItem key="loading2">
          <Skeleton className="h-4 w-28 rounded-medium" />
        </BreadcrumbItem>,
      ]}
      {pagePaths.map((page) => {
        return (
          <BreadcrumbItem
            key={page.id}
            onClick={(e) => {
              e.preventDefault()
              push(
                ROUTES.ORGANIZATION_PAGE({
                  orgSlug: organization?.slug ?? '',
                  pageID: page.id,
                }),
              )
            }}
          >
            {page.name || 'Untitled'}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
