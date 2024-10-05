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

const publicRoutes = [
  ROUTES.SIGNIN_PAGE,
  ROUTES.AUTH_EMAIL,
  ROUTES.LANDING_PAGE,
  ROUTES.CHANGELOG_PAGE,
]

const authRoutes = [ROUTES.SIGNIN_PAGE, ROUTES.AUTH_EMAIL]

interface AuthGuardProps extends PropsWithChildren {}

interface AuthContextValues {
  status?: 'loading' | 'authenticated' | 'unauthenticated'
  user?: User
  updateUser: (values: Partial<Session['user']>) => void
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
