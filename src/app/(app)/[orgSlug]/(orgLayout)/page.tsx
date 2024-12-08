'use client'

import { useAuthContext } from '@/components/auth/AuthGuard'
import Typography from '@/components/common/Typography'
import { RecentVisitPageWidget } from '@/components/organization/widgets/RecentVisitPages'
import { useOrganization } from '@/components/providers/organization'
import { useSidebar } from '@/components/providers/sidebar'
import { ROUTES } from '@/constants/routes'
import { getUserFullName } from '@/utils/user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function OrganizationHome() {
  const { user } = useAuthContext()
  const { prefetch } = useRouter()
  const { organization } = useOrganization()
  const { orgPages } = useSidebar()

  useEffect(() => {
    if ((orgPages?.list.length ?? 0) === 0) return
    prefetch(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: orgPages?.list[0].id ?? '',
      }),
    )
  }, [organization?.slug, prefetch, orgPages?.list])

  return (
    <div className="container mt-4 space-y-8">
      <Typography className="mx-auto w-fit max-w-[800px] text-center" level="h3">
        Welcome back,{' '}
        {getUserFullName({
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
        })}
      </Typography>
      <RecentVisitPageWidget />
    </div>
  )
}
