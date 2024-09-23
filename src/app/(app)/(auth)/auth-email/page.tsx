import { AuthEmailView } from '@/components/auth/AuthEmailView'
import { Suspense } from 'react'

export default function ValidateAuthEmail() {
  return (
    <Suspense>
      <AuthEmailView />
    </Suspense>
  )
}
