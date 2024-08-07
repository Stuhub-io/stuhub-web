import { AuthContent } from '@/components/auth/AuthContent'
import { AuthHeader } from '@/components/auth/AuthHeader'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { PropsWithChildren } from 'react'

export default function AppAuthLayout({ children }: PropsWithChildren) {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthContent>{children}</AuthContent>
    </AuthLayout>
  )
}
