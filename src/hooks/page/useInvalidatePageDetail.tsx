import { QUERY_KEYS } from "@/mutation/keys"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"

export const useInvalidatePageDetail = ({pageID, pagePkID}: {
    pageID: string,
    pagePkID: number 
}) => {
    const queryClient = useQueryClient()
    const invalidatePageDetail = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.GET_PAGE({pageID})
        })
        queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.GET_PAGE_PKID({pagePkID})
        })
    }, [pageID, pagePkID, queryClient])

    return invalidatePageDetail
}