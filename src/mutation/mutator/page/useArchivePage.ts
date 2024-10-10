import { useMutation } from "@tanstack/react-query"
import { MUTATION_KEYS } from "@/mutation/keys"
import { FirstFuncParamType } from "@/libs/utils"
import { pageService } from "@/api/page"

export const useArchivePage = (keys: FirstFuncParamType<typeof MUTATION_KEYS.ARCHIVE_PAGE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.ARCHIVE_PAGE(keys),
        mutationFn: pageService.archivePageByID.bind(pageService)
    })
}

