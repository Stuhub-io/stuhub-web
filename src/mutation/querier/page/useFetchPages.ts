import { pageService } from "@/api/page";
import { QUERY_KEYS } from "@/mutation/keys";
import { SpacePkIDParams } from "@/schema/space";
import { useQuery } from "@tanstack/react-query";

export interface UseFetchPages extends SpacePkIDParams {
    allowFetch?: boolean
}

export const useFetchPages = (args: UseFetchPages) => {
    const {allowFetch = true, ...restParams} = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_SPACE_PAGES(restParams),
        queryFn: () => pageService.getPagesBySpacePkID(restParams),
        enabled: allowFetch,
    })
}