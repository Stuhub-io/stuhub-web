'use client'

import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import { ROUTES } from '@/constants/routes'
import { getUserFullName } from '@/utils/user'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OrganizationHome() {
  const { data } = useSession()
  const user = data?.user
  const { prefetch } = useRouter()
  const { organization } = useOrganization()

  useEffect(() => {
    prefetch(ROUTES.ORGANIZATION_PAGE({
      orgSlug: organization?.slug ?? "",
      pageID: "random",
    }))
  }, [organization?.slug, prefetch])

  return (
    <div className="container">
      <Typography className="mx-auto w-fit max-w-[800px] text-center" level="h4">
        Welcome back,{' '}
        {getUserFullName({
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
        })}
      </Typography>
    </div>
  )
}
