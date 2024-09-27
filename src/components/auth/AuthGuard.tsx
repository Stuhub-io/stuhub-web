'use client'

import { servicesGuard } from '@/api'
import { ROUTES } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { SplashAppLogo } from '../common/SplashAppLogo'
import { useQueryClient } from '@tanstack/react-query'

const publicRoutes = [
  ROUTES.SIGNIN_PAGE,
  ROUTES.AUTH_EMAIL,
  ROUTES.LANDING_PAGE,
  ROUTES.CHANGELOG_PAGE,
]

const authRoutes = [ROUTES.SIGNIN_PAGE, ROUTES.AUTH_EMAIL]

interface AuthGuardProps extends PropsWithChildren {}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props

  const { data, status } = useSession()
  const [authStatus, setAuthStatus] = useState(status)
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const router = useRouter()
  const pathName = usePathname()
  const from = searchParams.get('from')

  useEffect(() => {
    setAuthStatus(status)
  }, [status])

  useEffect(() => {
    if (data?.user.accessToken) {
      servicesGuard.setAuthToken(data.user.accessToken)
    }
  }, [data?.user.accessToken])

  console.log({ pathName })

  useEffect(() => {
    if (authStatus === 'unauthenticated' && !publicRoutes.includes(pathName)) {
      router.push(`${ROUTES.SIGNIN_PAGE}?from=${pathName}`)
      servicesGuard.clearAuthToken()
      queryClient.clear()
      return
    }

    if (authStatus === 'authenticated' && authRoutes.includes(pathName)) {
      if (from) {
        router.push(from)
        return
      }
      router.push(ROUTES.HOME_PAGE)
      return
    }
  }, [from, pathName, queryClient, router, authStatus])

  const isLoading =
    authStatus === 'loading' ||
    (!publicRoutes.includes(pathName) && authStatus === 'unauthenticated') ||
    (authRoutes.includes(pathName) && authStatus === 'authenticated')

  return (
    <>
      {isLoading && (
        <div
          key="splash-screen"
          className="fixed flex h-[100dvh] w-full flex-col items-center justify-center"
        >
          <SplashAppLogo />
        </div>
      )}
      {!isLoading ? children : null}
    </>
  )
}
