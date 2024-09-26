import { pageService } from "@/api/page";
import { QUERY_KEYS } from "@/mutation/keys";
import { Page } from "@/schema/page";
import { SpacePkIDParams } from "@/schema/space";
import { useQuery } from "@tanstack/react-query";

export interface UseFetchPages extends SpacePkIDParams {
    allowFetch?: boolean
}

export interface IPageData {
    list: Page[]
    map: Record<number, Page>
}

export const useFetchPages = (args: UseFetchPages) => {
    const {allowFetch = true, ...restParams} = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_SPACE_PAGES(restParams),
        queryFn: async () => {
            const resp = await pageService.getPagesBySpacePkID(restParams)
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