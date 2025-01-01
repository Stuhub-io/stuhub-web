'use client'

import { useAuthContext } from '@/components/auth/AuthGuard'
import { PageHeaderMoreMenu } from '@/components/page/common/PageHeaderMoreMenu'
import { ROUTES } from '@/constants/routes'
import { Button } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'

export const PageRightHeader = () => {
  const { status } = useAuthContext()
  const isNotAuth = status === 'unauthenticated'
  const pathName = usePathname()
  const router = useRouter()

  if (isNotAuth) {
    return (
      <div className="flex items-center justify-between">
        <Button
          onClick={() => {
            router.push(`${ROUTES.SIGNIN_PAGE}?from=${pathName}`)
          }}
          size="sm"
          variant="solid"
          color="primary"
        >
          Login
        </Button>
      </div>
    )
  }

  return <PageHeaderMoreMenu />
}
