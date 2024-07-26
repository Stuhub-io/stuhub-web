'use client'

import { useOrganization } from '@/components/providers/organization'
import { ROUTES } from '@/constants/routes'
import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function OrganizationHome() {
  const router = useRouter()
  const { organization } = useOrganization()

  return (
    <div>
      <p>{organization?.name}</p>
      <Button
        onClick={() => {
          router.push(ROUTES.HOME_PAGE)
        }}
      >
        Home
      </Button>
      <Button
        onClick={() => {
          signOut({ redirect: false })
        }}
      >
        Sign out
      </Button>
    </div>
  )
}
