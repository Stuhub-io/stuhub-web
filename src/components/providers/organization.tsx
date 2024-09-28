import { OrganizationParams, ROUTES } from '@/constants/routes'
import { usePrevious } from '@/hooks/usePrev'
import createContext from '@/libs/context'
import { useFetchJoinedOrgs } from '@/mutation/querier/organization/useFetchJoinedOrgs'
import { Organization, OrgRole } from '@/schema/organization'
import { getUserOrgPermission } from '@/utils/organization'
import { useSession } from 'next-auth/react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

interface OrganizationProviderValues {
  organization?: Organization
  isLoadingOrganization: boolean
  isNavigating?: boolean
  organizations?: Organization[]
  currentUserRole?: OrgRole
  refetchOrgs: () => void
}

const WHITELIST = [ROUTES.INVITE_PAGE]

const [Provider, useOrganization] = createContext<OrganizationProviderValues>({
  name: 'OrganizationContext',
})

export { useOrganization }

export const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession()
  const { orgSlug } = useParams<Partial<OrganizationParams>>()
  const pathName = usePathname()
  const router = useRouter()
  const prevStatus = usePrevious(status)

  const [selectedOrg, setSelectedOrg] = useState<Organization>()
  const [isNavigating, setIsNavigating] = useState(false)

  const isAuthenticating = status == 'loading'
  const isUnthenticated = status == 'unauthenticated'

  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  const isInWhitelist = WHITELIST.some((path) => pathName.includes(path))

  const {
    data: { data: internalJoinedOrgs } = { data: [] },
    isPending,
    refetch,
  } = useFetchJoinedOrgs({
    allowFetch: !isAuthenticating && !isInWhitelist,
    emptyReturn: isUnthenticated,
  })

  const isLoadingOrganization = isAuthenticating || isPending

  const currentUserRole = useMemo(
    () =>
      isLoadingOrganization || !selectedOrg
        ? undefined
        : getUserOrgPermission(selectedOrg, data?.user.pkid ?? -1),
    [data?.user.pkid, isLoadingOrganization, selectedOrg],
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

  // Handle select org and navigate
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
    if (!orgSlug) return
    if (!selectOrg) {
      router.push(ROUTES.HOME_PAGE)
      setIsNavigating(true)
      return
    }

    if (selectOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectOrg?.slug ?? '' }))
      setIsNavigating(true)
    }
  }, [data?.user.pkid, internalJoinedOrgs, orgSlug, router, selectedOrg, from])

  // Redirect back to org if already selected org
  useEffect(() => {
    if (!selectedOrg || isUnthenticated) return
    if (selectedOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectedOrg.slug }))
      setIsNavigating(true)
    }
  }, [orgSlug, isUnthenticated, router, selectedOrg, status, from])

  useEffect(() => {
    if (isUnthenticated && prevStatus !== status) {
      setSelectedOrg(undefined)
    }
  }, [prevStatus, status, isUnthenticated])

  return (
    <Provider
      value={{
        organization: selectedOrg,
        refetchOrgs: refetch,
        isLoadingOrganization,
        isNavigating,
        currentUserRole,
      }}
    >
      {children}
    </Provider>
  )
}
