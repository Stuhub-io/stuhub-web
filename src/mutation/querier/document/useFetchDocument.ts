import { documentService } from "@/api/document"
import { QUERY_KEYS } from "@/mutation/keys"
import { useQuery } from "@tanstack/react-query"

interface UseFetchDocument {
    allowFetch?: boolean
    pagePkID: number
}

export const useFetchDocument = (args: UseFetchDocument) => {
    const { allowFetch, pagePkID} = args
    return useQuery({
        queryKey: QUERY_KEYS.GET_PAGE_DOC({
            page_pkid: pagePkID,
        }),
        queryFn: async () => documentService.getDocumentByPagePkID(pagePkID),
        enabled: allowFetch,
    })
}