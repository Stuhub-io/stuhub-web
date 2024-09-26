import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function ValidateOrgInviteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Suspense fallback={<div>fail</div>}>{children}</Suspense>
}
