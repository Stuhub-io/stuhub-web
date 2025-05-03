import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useCreatePageActivity = (keys: FirstFuncParamType<typeof MUTATION_KEYS.CREATE_PAGE_ACTIVITY>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.CREATE_PAGE_ACTIVITY(keys),
        mutationFn: pageService.createPageActivity.bind(pageService),
    })
}