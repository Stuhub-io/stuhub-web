'use client'

import { servicesGuard } from '@/api'
import { ROUTES } from '@/constants/routes'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SplashAppLogo } from '../common/SplashAppLogo'

const publicRoutes = [
  ROUTES.SIGNIN_PAGE,
  ROUTES.ONBOARDING,
  ROUTES.AUTH_EMAIL,
  ROUTES.LANDING_PAGE,
  ROUTES.CHANGELOG_PAGE,
]

const authRoutes = [ROUTES.SIGNIN_PAGE, ROUTES.AUTH_EMAIL]

interface AuthGuardProps extends PropsWithChildren {}

export const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props
  const { data, status } = useSession()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname()
  const from = searchParams.get('from')

  useEffect(() => {
    if (data?.user.accessToken) {
      servicesGuard.setAuthToken(data.user.accessToken)
    }
  }, [data?.user.accessToken])

  useEffect(() => {
    if (status === 'unauthenticated' && !publicRoutes.includes(pathName)) {
      router.push(`${ROUTES.SIGNIN_PAGE}?from=${pathName}`)
      servicesGuard.clearAuthToken()
      return
    }
    if (status === 'authenticated' && authRoutes.includes(pathName)) {
      if (from) {
        router.push(from)
        return
      }
      router.push(ROUTES.HOME_PAGE)
      return
    }
  }, [from, pathName, router, status])

  const isLoading =
    status === 'loading' ||
    (!publicRoutes.includes(pathName) && status === 'unauthenticated') ||
    (authRoutes.includes(pathName) && status === 'authenticated')

  return (
    <>
      {
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="splash-screen"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed flex h-[100dvh] w-full flex-col items-center justify-center"
            >
              <SplashAppLogo />
            </motion.div>
          )}
        </AnimatePresence>
      }
      {!isLoading ? children : null}
    </>
  )
}
