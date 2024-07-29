import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../keys"
import { organizationService } from "@/api/organization"

export interface UseFetchJoinedOrgsArgs {
    allowFetch?: boolean
}

export const useFetchJoinedOrgs = (args: UseFetchJoinedOrgsArgs) => {
    return useQuery({
        queryKey: QUERY_KEYS.GET_JOIN_ORGS,
        queryFn: organizationService.getJoinedOrgs.bind(organizationService),
        enabled: args.allowFetch,
    })
}