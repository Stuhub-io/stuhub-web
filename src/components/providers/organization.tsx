import { OrganizationParams, ROUTES } from '@/constants/routes'
import createContext from '@/libs/context'
import { useFetchJoinedOrgs } from '@/mutation/querier/organization/useFetchJoinedOrgs'
import { Organization, OrgRole } from '@/schema/organization'
import { getUserOrgPermission } from '@/utils/organization'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '../auth/AuthGuard'
import { compareRoute } from '@/utils/routes'
import { useFetchOrgBySlug } from '@/mutation/querier/organization/useFetchOrgBySlug'

interface OrganizationProviderValues {
  organization?: Organization
  isLoadingOrganization: boolean
  isNavigating?: boolean
  organizations?: Organization[]
  currentUserRole?: OrgRole
  refetchOrgs: () => void
  isGuest?: boolean
}

const [Provider, useOrganization] = createContext<OrganizationProviderValues>({
  name: 'OrganizationContext',
})

const WHITE_LIST_ROUTES = [ROUTES.INVITE_PAGE]

const checkInWhiteList = (pathName: string) =>
  WHITE_LIST_ROUTES.some((route) => compareRoute(pathName, route))

export { useOrganization }

export const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const { status, user } = useAuthContext()
  const { orgSlug } = useParams<Partial<OrganizationParams>>()
  const pathName = usePathname()
  const router = useRouter()

  const [selectedOrg, setSelectedOrg] = useState<Organization>()
  const isInWhiteList = checkInWhiteList(pathName)

  const [isNavigating, setIsNavigating] = useState(false)

  const {
    data: { data: internalJoinedOrgs } = {},
    isPending,
    refetch,
  } = useFetchJoinedOrgs({
    allowFetch: status === 'authenticated',
  })

  const { data: { data: orgDetail } = {}, isPending: isPendingOrgDetail } = useFetchOrgBySlug({
    slug: orgSlug ?? '',
    allowFetch: !!orgSlug,
  })

  const currentUserRole = useMemo(
    () =>
      isPending || !selectedOrg ? undefined : getUserOrgPermission(selectedOrg, user?.pkid ?? -1),
    [isPending, selectedOrg, user?.pkid],
  )

  // check isNavigating
  useEffect(() => {
    if (
      (isNavigating && selectedOrg && pathName.startsWith(`/${selectedOrg?.slug}`)) ||
      (isNavigating && isInWhiteList) || 
      (isNavigating && !selectedOrg && pathName === ROUTES.HOME_PAGE)
    ) {
      setIsNavigating(false)
    }
  }, [isInWhiteList, isNavigating, pathName, selectedOrg])

  // Handle select org and navigate on init

  useEffect(() => {
    // skip if joinOrg or orgDetail is pending
    if (!internalJoinedOrgs || selectedOrg) return

    if (orgSlug && isPendingOrgDetail) return

    const selectOrg =
      orgDetail ??
      internalJoinedOrgs.find(
        (org) =>
          (org.slug === orgSlug && getUserOrgPermission(org, user?.pkid ?? -1) !== undefined) ||
          true,
      )
    setSelectedOrg(selectOrg)
    // Navigate if need
    if (!selectOrg) {
      router.push(ROUTES.HOME_PAGE)
      setIsNavigating(true)
      return
    }

    if (isInWhiteList) return

    if (selectOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectOrg?.slug ?? '' }))
      setIsNavigating(true)
    }
  }, [
    user?.pkid,
    internalJoinedOrgs,
    isInWhiteList,
    orgSlug,
    router,
    selectedOrg,
    orgDetail,
    isPendingOrgDetail,
    pathName,
  ])

  // Redirect back to org if already selected org
  useEffect(() => {
    if (!selectedOrg) return
    if (isInWhiteList) return
    if (selectedOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectedOrg.slug }))
      setIsNavigating(true)
    }
  }, [isInWhiteList, orgSlug, router, selectedOrg])

  const isGuest = useMemo(() => {
    return !internalJoinedOrgs?.some((org) => org.slug === selectedOrg?.slug)
  }, [internalJoinedOrgs, selectedOrg?.slug])

  return (
    <Provider
      value={{
        organization: selectedOrg,
        organizations: internalJoinedOrgs,
        refetchOrgs: refetch,
        isLoadingOrganization: isPending || isPendingOrgDetail,
        isNavigating,
        currentUserRole,
        isGuest,
      }}
    >
      {children}
    </Provider>
  )
}

// export const PublicOrganizationViewProvider = ({ children }: PropsWithChildren) => {

//   return <>{children}</>
// }
