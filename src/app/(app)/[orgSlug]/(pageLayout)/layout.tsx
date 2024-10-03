import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeaderMoreMenu } from '@/components/page/PageHeaderMoreMenu'
import { PageBreadCrumbs } from '@/components/page/PageBreadCrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function WithHeaderPageDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PageLayout breadCrumb={<PageBreadCrumbs />} rightEl={<PageHeaderMoreMenu />}>
      {children}
    </PageLayout>
  )
}
