'use client'

import { ROUTES } from '@/constants/routes'
import { Button, CircularProgress } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
      <Button onClick={() => router.push(ROUTES.ORGANIZATION)}>ORGS</Button>
      <CircularProgress />
    </div>
  )
}
