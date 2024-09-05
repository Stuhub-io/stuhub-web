import { OrgLayout } from '@/components/layout/OrgLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function OrgDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <OrgLayout>{children}</OrgLayout>
}
