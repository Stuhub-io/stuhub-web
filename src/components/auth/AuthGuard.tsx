'use client'

import { servicesGuard } from '@/api'
import { ROUTES } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'

const publicRoutes = [ROUTES.SIGNIN_PAGE, ROUTES.ONBOARDING]

interface AuthGuardProps extends PropsWithChildren {}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props
  const [registeredToken, setRegisteredToken] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const router = useRouter()
  const pathName = usePathname()
  const { data, status } = useSession()

  useEffect(() => {
    if (data?.user.accessToken) {
      servicesGuard.setAuthToken(data.user.accessToken)
      setRegisteredToken(true)
    }
  }, [data?.user.accessToken])

  useEffect(() => {
    if (status === 'unauthenticated' && !publicRoutes.includes(pathName)) {
      router.push(ROUTES.SIGNIN_PAGE)
      servicesGuard.clearAuthToken()
      setRegisteredToken(false)
      return
    }
    if (status === 'authenticated' && publicRoutes.includes(pathName)) {
      router.push(ROUTES.HOME_PAGE)
      return
    }
    setLoadingAuth(false)
  }, [pathName, router, status])

  if (loadingAuth || (!publicRoutes.includes(pathName) && !registeredToken)) {
    return <div>Loading auth...</div>
  }

  return <>{children}</>
}
