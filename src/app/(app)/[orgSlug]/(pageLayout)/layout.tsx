import { PageLayout } from '@/components/layout/PageLayout'
import { HeaderMoreMenu } from '@/components/page/HeaderMoreMenu'
import { PageBreadCrumbs } from '@/components/page/PageBreadCrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function WithHeaderPageDetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PageLayout breadCrumb={<PageBreadCrumbs />} rightEl={<HeaderMoreMenu />}>
      {children}
    </PageLayout>
  )
}
