import { pageService } from "@/api/page";
import { QUERY_KEYS } from "@/mutation/keys";
import { useQuery } from "@tanstack/react-query";

export interface UseFetchPages { 
    allowFetch?: boolean
    pageID: string
}

export const useFetchPage = (args: UseFetchPages, option?: {
    refetchOnMount?: boolean
}) => {
    const {allowFetch = true, pageID} = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_PAGE({
            pageID,
        }),
        queryFn: async () => pageService.getPageByID(pageID),
        enabled: allowFetch,
        structuralSharing: false,
        ...option
    })
}