import { OrganizationParams, ROUTES } from '@/constants/routes'
import { usePrevious } from '@/hooks/usePrev'
import createContext from '@/libs/context'
import { useFetchJoinedOrgs } from '@/mutation/querier/useFetchJoinedOrgs'
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

export { useOrganization }

export const OrganizationProvider = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession()
  const { orgSlug } = useParams<Partial<OrganizationParams>>()
  const pathName = usePathname()
  const router = useRouter()
  const prevStatus = usePrevious(status)

  const [selectedOrg, setOrg] = useState<Organization>()
  const [isNavigating, setIsNavigating] = useState(false)

  const isAuthenticating = status == 'loading'
  const isUnthenticated = status == 'unauthenticated'

  const {
    data: { data: internalJoinedOrgs } = { data: [] },
    isPending,
    refetch,
  } = useFetchJoinedOrgs({
    allowFetch: !isAuthenticating,
    emptyReturn: isUnthenticated,
  })

  const isLoadingOrganization = isAuthenticating || isPending

  const currentUserRole = useMemo(
    () =>
      isLoadingOrganization || !selectedOrg
        ? undefined
        : getUserOrgPermission(selectedOrg, data?.user.pk_id ?? -1),
    [data?.user.pk_id, isLoadingOrganization, selectedOrg],
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
        (org.slug === orgSlug && getUserOrgPermission(org, data?.user.pk_id ?? -1) !== undefined) ||
        true,
    )
    setOrg(selectOrg)

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
  }, [data?.user.pk_id, internalJoinedOrgs, orgSlug, router, selectedOrg])

  // Redirect back to org if already selected org
  useEffect(() => {
    if (!selectedOrg || isUnthenticated) return
    if (selectedOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectedOrg.slug }))
      setIsNavigating(true)
    }
  }, [orgSlug, isUnthenticated, router, selectedOrg, status])

  useEffect(() => {
    if (isUnthenticated && prevStatus !== status) {
      setOrg(undefined)
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
