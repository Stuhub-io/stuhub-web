import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../keys'
import { organizationService } from '@/api/organization'
import { GetOrgBySlugParams } from '@/schema/organization'

export interface UseFetchOrgBySlugArgs extends GetOrgBySlugParams {
  allowFetch?: boolean
}
export const useFetchOrgBySlug = (args: UseFetchOrgBySlugArgs) => {
  const { slug } = args
  return useQuery({
    queryKey: QUERY_KEYS.GET_ORG_BY_SLUG({ slug: args.slug }),
    queryFn: () => organizationService.getOrgBySlug({ slug }),
    enabled: args.allowFetch,
  })
}
