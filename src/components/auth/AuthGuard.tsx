'use client'

import { servicesGuard } from '@/api'
import { ROUTES } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useState } from 'react'
import { SplashAppLogo } from '../common/SplashAppLogo'
import { useQueryClient } from '@tanstack/react-query'
import createContext from '@/libs/context'
import { User } from '@/schema/user'
import { Session } from 'next-auth'
import { compareRoute } from '@/utils/routes'

const publicRoutes = [
  ROUTES.SIGNIN_PAGE,
  ROUTES.AUTH_EMAIL,
  ROUTES.LANDING_PAGE,
  ROUTES.CHANGELOG_PAGE,
  '/test',
  ROUTES.VAULT_PAGE({
    orgSlug: '*',
    pageID: '*',
  })
]

const authRoutes = [ROUTES.SIGNIN_PAGE, ROUTES.AUTH_EMAIL]

const isPublicRoute = (pathName: string) => publicRoutes.some((route) => compareRoute(pathName, route))

const isAuthRoute = (pathName: string) => authRoutes.some((route) => compareRoute(pathName, route))


interface AuthGuardProps extends PropsWithChildren {}

interface AuthContextValues {
  status?: 'loading' | 'authenticated' | 'unauthenticated'
  user?: User
  updateUser: (values: Partial<Session['user']>) => Promise<void>
}
const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'AuthContext',
})

export { useAuthContext }

export const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props

  const { data, status, update } = useSession()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [authStatus, setAuthStatus] = useState(status)
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)

  const router = useRouter()
  const pathName = usePathname()
  const from = searchParams.get('from')

  const updateUser = async (values: Partial<Session['user']>) => {
    setIsUpdatingUser(true)
    const newSession = {
      ...data,
      user: {
        ...data?.user,
        ...values,
      },
    }
    await update(newSession)
    setIsUpdatingUser(false)
  }

  useEffect(() => {
    if (isUpdatingUser) return
    setAuthStatus(status)
  }, [status, isUpdatingUser])

  useEffect(() => {
    if (data?.user.accessToken) {
      servicesGuard.setAuthToken(data.user.accessToken)
    }
  }, [data?.user.accessToken])

  useEffect(() => {
    // Redirect to sign in page if user is not authenticated
    if (authStatus === 'unauthenticated' && !isPublicRoute(pathName)) {
      router.push(`${ROUTES.SIGNIN_PAGE}?from=${pathName}`)
      servicesGuard.clearAuthToken()
      queryClient.clear()
      return
    }

    if (authStatus === 'authenticated' && isAuthRoute(pathName)) {
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
    (!isPublicRoute(pathName) && authStatus === 'unauthenticated') ||
    (isAuthRoute(pathName) && authStatus === 'authenticated')

  if (isLoading) {
    return (
      <div
        key="splash-screen"
        className="fixed flex h-[100dvh] w-full flex-col items-center justify-center"
      >
        <SplashAppLogo />
      </div>
    )
  }

  return (
    <Provider
      value={{
        status: authStatus,
        user: data?.user,
        updateUser,
      }}
    >
      {children}
    </Provider>
  )
}
