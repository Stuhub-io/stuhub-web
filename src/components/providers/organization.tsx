import { ORG_ROLES } from '@/constants/organization'
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

  const allowFetchOrgs = status === 'authenticated'
  const [loadingOrganization, setLoadingOrganization] = useState(allowFetchOrgs)
  const [selectedOrg, setOrg] = useState<Organization>()
  const [isNavigating, setIsNavigating] = useState(false)

  const currentUserRole = useMemo(
    () =>
      loadingOrganization || !selectedOrg
        ? undefined
        : getUserOrgPermission(selectedOrg, data?.user.pk_id ?? -1),
    [data?.user.pk_id, loadingOrganization, selectedOrg],
  )

  const {
    data: { data: joinOrgs } = {},
    isPending,
    refetch,
  } = useFetchJoinedOrgs({
    allowFetch: status === 'authenticated',
  })

  const [internalJoinedOrgs, setInternalJoinedOrgs] = useState<Organization[] | undefined>(joinOrgs)

  useEffect(() => {
    setInternalJoinedOrgs(joinOrgs)
  }, [joinOrgs])

  // check Is Loading org
  useEffect(() => {
    setLoadingOrganization(isPending && allowFetchOrgs)
  }, [allowFetchOrgs, isPending])

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
    const selectOrg =
      internalJoinedOrgs.find(
        (org) =>
          org.slug === orgSlug && getUserOrgPermission(org, data?.user.pk_id ?? -1) !== undefined,
      ) ||
      internalJoinedOrgs.find((org) => {
        return getUserOrgPermission(org, data?.user.pk_id ?? -1) === ORG_ROLES.OWNER
      }) ||
      internalJoinedOrgs.find((org) => {
        return getUserOrgPermission(org, data?.user.pk_id ?? -1) !== ORG_ROLES.OWNER
      })
    setOrg(selectOrg)

    // Navigate if need
    if (!selectOrg && !orgSlug) return
    if (!selectOrg && orgSlug) {
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
    if (!selectedOrg || status === 'unauthenticated') return
    if (selectedOrg?.slug !== orgSlug) {
      router.push(ROUTES.ORGANIZATION({ orgSlug: selectedOrg.slug }))
      setIsNavigating(true)
    }
  }, [orgSlug, router, selectedOrg, status])

  useEffect(() => {
    if (status === 'unauthenticated' && prevStatus !== status) {
      setOrg(undefined)
      setInternalJoinedOrgs(undefined)
    }
  }, [prevStatus, status])

  return (
    <Provider
      value={{
        organization: selectedOrg,
        isLoadingOrganization: loadingOrganization,
        refetchOrgs: refetch,
        isNavigating,
        currentUserRole,
      }}
    >
      {children}
    </Provider>
  )
}
