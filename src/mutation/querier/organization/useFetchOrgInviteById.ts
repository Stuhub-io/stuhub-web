import { organizationService } from '@/api/organization'
import { GetOrgInviteByIdParams } from '@/schema/organization'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../keys'

export interface UseFetchOrgInviteByIdArgs extends GetOrgInviteByIdParams {
  allowFetch?: boolean
}
export const useFetchOrgInviteById = (args: UseFetchOrgInviteByIdArgs) => {
  const { id } = args
  return useQuery({
    queryKey: QUERY_KEYS.GET_ORG_INVITE_BY_ID({ id }),
    queryFn: () => organizationService.getOrgInviteByID({ id }),
    enabled: args.allowFetch,
    retry: 0,
  })
}
