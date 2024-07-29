import { MainLayout } from '@/components/layout/MainLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <MainLayout>{children}</MainLayout>
}
