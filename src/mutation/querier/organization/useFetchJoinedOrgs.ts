import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../keys'
import { organizationService } from '@/api/organization'
import { Organization } from '@/schema/organization'

export interface UseFetchJoinedOrgsArgs {
  allowFetch?: boolean
  emptyReturn?: boolean
}

export const useFetchJoinedOrgs = ({ allowFetch, emptyReturn }: UseFetchJoinedOrgsArgs) => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_JOIN_ORGS,
    queryFn: emptyReturn
      ? () => ({ data: [] as Organization[] })
      : organizationService.getJoinedOrgs.bind(organizationService),
    enabled: allowFetch,
  })
}
