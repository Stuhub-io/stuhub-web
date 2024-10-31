import { pageService } from "@/api/page"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useBulkArchivePages = () => {
return useMutation({
        mutationKey: MUTATION_KEYS.BULK_ARCHIVE_PAGES,
        mutationFn: pageService.bulkArchivePages.bind(pageService),
    })
}
