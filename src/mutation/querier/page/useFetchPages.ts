import { QUERY_KEYS } from "@/mutation/keys";
import { GetPagesQuery, Page } from "@/schema/page";
import { useQuery } from "@tanstack/react-query";
import { pageService } from "@/api/page";

export interface UseFetchPages extends GetPagesQuery {
    allowFetch?: boolean
}

export interface IPageData {
    list: Page[]
    map: Record<number, Page>
}

export const useFetchPages = (args: UseFetchPages) => {
    const {allowFetch = true, ...restParams} = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_ORG_PAGES(restParams),
        queryFn: async () => {
            const resp = await pageService.getPages(restParams)
            return {
                ...resp,
                data: {
                    list: resp.data,
                    map: resp.data.reduce((acc, page) => {
                        acc[page.pkid] = page
                        return acc
                    }, {} as Record<number, Page>)
                } as IPageData
            }
        },
        enabled: allowFetch,
    })
}