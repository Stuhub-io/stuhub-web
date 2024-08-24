'use client'

import { AppBreadCrumbs } from '@/components/layout/AppBreadcrumbs'
import { ContentLayout } from '@/components/layout/ContentLayout'
import { useOrganization } from '@/components/providers/organization'
import { useSidebar } from '@/components/providers/sidebar'
import { ROUTES } from '@/constants/routes'
import { useSidebarBreadcrumb } from '@/hooks/breadcrumb/useSidebarBreadcrumb'

export default function OrganizationHome() {
  const { organization } = useOrganization()
  const { selectPage } = useSidebar()
  const links = useSidebarBreadcrumb()

  return (
    <ContentLayout
      breadCrumb={
        <AppBreadCrumbs
        links={[
          ...links.map((link) => ({
            title: link?.name ?? "",
            url: ""
          })),
          {
            title: selectPage?.name ?? "",
            url: ROUTES.ORGANIZATION({orgSlug: organization?.slug ?? ""}),
          },
        ]}
        />
      }
    >
    <div className="">
      <p>{organization?.name}</p>
    </div>
    </ContentLayout>
  )
}
