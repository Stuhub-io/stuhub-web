import { VerifyContent } from '@/components/verify/VerifyContent'
import { VerifyPageHeader } from '@/components/verify/VerifyHeader'
import { VerifyLayout } from '@/components/verify/VerifyLayout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function VerifyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <VerifyLayout>
      <VerifyPageHeader />
      <VerifyContent>{children}</VerifyContent>
    </VerifyLayout>
  )
}
