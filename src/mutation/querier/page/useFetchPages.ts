import { QUERY_KEYS } from "@/mutation/keys";
import { GetPagesQuery } from "@/schema/page";
import { useQuery } from "@tanstack/react-query";
import { pageService } from "@/api/page";

export interface UseFetchPages extends GetPagesQuery {
    allowFetch?: boolean
}

export const useFetchPages = (args: UseFetchPages) => {
    const {allowFetch = true, ...restParams} = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_ORG_PAGES(restParams),
        queryFn: async () => pageService.getPages(restParams),
        enabled: allowFetch,
    })
}