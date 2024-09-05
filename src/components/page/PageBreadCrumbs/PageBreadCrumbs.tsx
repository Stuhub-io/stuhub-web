'use client'

import { usePageContext } from '@/components/providers/page'
import { useSidebarBreadcrumb } from '@/hooks/breadcrumb/useSidebarBreadcrumb'
import { BreadcrumbItem, Breadcrumbs, Skeleton } from '@nextui-org/react'

// FIXME: Handle loading, selector sub Links
export const PageBreadCrumbs = () => {
  const pagePaths = useSidebarBreadcrumb()
  const { isLoading, onSelectPage } = usePageContext()

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
              onSelectPage(page)
            }}
          >
            {page.name || 'Untitled'}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumbs>
  )
}
