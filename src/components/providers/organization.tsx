import { OrganizationParams, ROUTES } from '@/constants/routes'
import createContext from '@/libs/context'
import { useFetchJoinedOrgs } from '@/mutation/querier/organization/useFetchJoinedOrgs'
import { Organization, OrgRole } from '@/schema/organization'
import { getUserOrgPermission } from '@/utils/organization'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

interface OrganizationProviderValues {
  organization?: Organization
  isLoadingOrganization: boolean
  isNavigating?: boolean
  organizations?: Organization[]
  currentUserRole?: OrgRole
  refetchOrgs: () => void
}

const [Provider, useOrganization] = createContext<OrganizationProviderValues>({
  name: 'OrganizationContext',
})

const WHITE_LIST_ROUTES = [ROUTES.INVITE_PAGE]

export { useOrganization }

export const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const { data } = useSession()
  const { orgSlug: urlOrgSlug } = useParams<Partial<OrganizationParams>>()
  const pathName = usePathname()
  const router = useRouter()

  const [selectedOrg, setSelectedOrg] = useState<Organization>()
  const isInWhiteList = WHITE_LIST_ROUTES.some((route) => pathName.startsWith(route))

  const [isNavigating, setIsNavigating] = useState(false)

  const orgSlug = useMemo(() => {
    if (isInWhiteList) return undefined
    return urlOrgSlug
  }, [isInWhiteList, urlOrgSlug])

  const {
    data: { data: internalJoinedOrgs } = {},
    isPending,
    refetch,
  } = useFetchJoinedOrgs({
    allowFetch: true,
  })

  const currentUserRole = useMemo(
    () =>
      isPending || !selectedOrg
        ? undefined
        : getUserOrgPermission(selectedOrg, data?.user.pkid ?? -1),
    [data?.user.pkid, isPending, selectedOrg],
  )

  // check isNavigating
  useEffect(() => {
    if (
      isNavigating &&
      ((selectedOrg && pathName.startsWith(`/${selectedOrg?.slug}`)) ||
        (!selectedOrg && pathName === ROUTES.HOME_PAGE))
    ) {
      setIsNavigating(false)
    }
  }, [isNavigating, pathName, selectedOrg])

  // Handle select org and navigate on init
  useEffect(() => {
    if (!internalJoinedOrgs || selectedOrg) return
    // FIXME: implement select most recent visit org
    const selectOrg = internalJoinedOrgs.find(
      (org) =>
        (org.slug === orgSlug && getUserOrgPermission(org, data?.user.pkid ?? -1) !== undefined) ||
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
  }, [data?.user.pkid, internalJoinedOrgs, isInWhiteList, orgSlug, router, selectedOrg])

  // Redirect back to org if already selected org
  useEffect(() => {
    if (!selectedOrg) return
    if (isInWhiteList) return
    if (selectedOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectedOrg.slug }))
      setIsNavigating(true)
    }
  }, [isInWhiteList, orgSlug, router, selectedOrg])

  return (
    <Provider
      value={{
        organization: selectedOrg,
        refetchOrgs: refetch,
        isLoadingOrganization: isPending,
        isNavigating,
        currentUserRole,
      }}
    >
      {children}
    </Provider>
  )
}
