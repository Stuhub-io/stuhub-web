import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../keys"
import { spaceService } from '@/api/space'
import { OrganizationPkIDParams } from "@/schema/space"

export interface UseFetchOrgSpaces extends OrganizationPkIDParams {
    allowFetch?: boolean
}
export const useFetchOrgSpaces = (args: UseFetchOrgSpaces) => {
    const { allowFetch, ...restArgs } = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_ORG_SPACES(restArgs),
        queryFn: () => spaceService.getSpacesByOrgPkID(restArgs),
        enabled: allowFetch,
    })
}