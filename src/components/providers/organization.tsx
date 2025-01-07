import { OrganizationParams, ROUTES } from '@/constants/routes'
import createContext from '@/libs/context'
import { useFetchJoinedOrgs } from '@/mutation/querier/organization/useFetchJoinedOrgs'
import { Organization, OrgRole } from '@/schema/organization'
import { getUserOrgPermission } from '@/utils/organization'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo } from 'react'
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
  changeOrganization?: (org: Organization) => void
}

const [Provider, useOrganization] = createContext<OrganizationProviderValues>({
  name: 'OrganizationContext',
})

const WHITE_LIST_ROUTES = [
  ROUTES.INVITE_PAGE({
    inviteID: '*',
  }),
]

const checkInWhiteList = (pathName: string) =>
  WHITE_LIST_ROUTES.some((route) => compareRoute(pathName, route))

export { useOrganization }

export const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const { status, user } = useAuthContext()
  const { orgSlug } = useParams<Partial<OrganizationParams>>()
  const pathName = usePathname()
  const router = useRouter()

  const isInWhiteList = checkInWhiteList(pathName)

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

  console.log('internalJoinedOrgs', orgDetail)

  const isLoading = (isPendingOrgDetail && orgSlug) || (isPending && status === 'authenticated')

  const selectedOrg = useMemo(() => {
    // url do not contain org slug
    if (!orgSlug) return undefined
    if (!isLoading) {
      if (orgDetail) return orgDetail
      if (internalJoinedOrgs) {
        return internalJoinedOrgs.find((org) => org.slug === orgSlug)
      }
    }
    return undefined
  }, [internalJoinedOrgs, isLoading, orgDetail, orgSlug])

  // Redirect if org detail with given slug not found
  const toRedirectOrg = useMemo(() => {
    if (selectedOrg) return undefined
    if (isInWhiteList) return undefined
    if (isLoading) return undefined
    const redirectOrg = internalJoinedOrgs?.find(
      (org) => getUserOrgPermission(org, user?.pkid ?? -1) === 'owner',
    )
    return redirectOrg
  }, [internalJoinedOrgs, isInWhiteList, isLoading, selectedOrg, user?.pkid])

  useEffect(() => {
    if (toRedirectOrg) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: toRedirectOrg.slug }))
    }
  }, [router, toRedirectOrg])

  const currentUserRole = useMemo(
    () => (selectedOrg ? getUserOrgPermission(selectedOrg, user?.pkid ?? -1) : undefined),
    [selectedOrg, user?.pkid],
  )

  const onChangeOrganization = (org: Organization) => {
    router.push(ROUTES.ORGANIZATION({ orgSlug: org.slug }))
  }

  const isGuest = useMemo(() => {
    return !internalJoinedOrgs?.some((org) => org.slug === selectedOrg?.slug)
  }, [internalJoinedOrgs, selectedOrg?.slug])

  return (
    <Provider
      value={{
        organization: selectedOrg,
        organizations: internalJoinedOrgs,
        refetchOrgs: refetch,
        isLoadingOrganization: isPending || (isPendingOrgDetail && Boolean(orgSlug)),
        isNavigating: Boolean(toRedirectOrg),
        currentUserRole,
        isGuest,
        changeOrganization: onChangeOrganization,
      }}
    >
      {children}
    </Provider>
  )
}
