'use client'

import { PageParams, ROUTES } from '@/constants/routes'
import { Button } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface OrganizationHomeParams {
  orgID: string
}

export default function OrganizationHome({
  params: { orgID },
}: PageParams<OrganizationHomeParams>) {
  const router = useRouter()
  const { data } = useSession()

  console.log({ data, orgID })

  return (
    <div>
      <Button
        onClick={() => {
          router.push(ROUTES.HOME_PAGE)
        }}
      >
        Home
      </Button>
    </div>
  )
}
