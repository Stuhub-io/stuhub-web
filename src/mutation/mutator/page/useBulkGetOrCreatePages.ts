import { pageService } from "@/api/page"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useBulkGetOrCreatePages = () => {
return useMutation({
        mutationKey: MUTATION_KEYS.BULK_GET_OR_CREATE_PAGES,
        mutationFn: pageService.bulkGetOrCreatePages.bind(pageService),
    })
}
