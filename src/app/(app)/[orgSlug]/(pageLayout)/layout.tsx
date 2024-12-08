import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeaderMoreMenu } from '@/components/page/common/PageHeaderMoreMenu'
import { PageArchivedAlert } from '@/components/page/document/PageArchivedAlert'
import { PageBreadCrumbs } from '@/components/page/document/PageBreadCrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function WithHeaderPageDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PageLayout
      breadCrumb={<PageBreadCrumbs />}
      rightEl={<PageHeaderMoreMenu />}
      headAlert={<PageArchivedAlert />}
    >
      {children}
    </PageLayout>
  )
}
