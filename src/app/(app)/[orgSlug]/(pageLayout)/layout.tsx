import { PageLayout } from '@/components/layout/PageLayout'
import { PageRightHeader } from '@/components/layout/PageLayout/PageRightHeader'
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
      rightEl={<PageRightHeader />}
      headAlert={<PageArchivedAlert />}
    >
      {children}
    </PageLayout>
  )
}
