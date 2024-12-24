import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useUpdatePageGeneralAccess = (keys: FirstFuncParamType<typeof MUTATION_KEYS.UPDATE_PAGE_GENERAL_ACCESS>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.UPDATE_PAGE_GENERAL_ACCESS(keys),
        mutationFn: pageService.updateGeneralAccess.bind(pageService),
    })
}