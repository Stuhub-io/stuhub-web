import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useUpdatePageContent = (keys: FirstFuncParamType<typeof MUTATION_KEYS.UPDATE_PAGE_CONTENT>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.UPDATE_PAGE_CONTENT(keys),
        mutationFn: pageService.updatePageContent.bind(pageService),
    })
}