import { pageService } from "@/api/page"
import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useUpdatePage = (keys: FirstFuncParamType<typeof MUTATION_KEYS.UPDATE_PAGE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.UPDATE_PAGE(keys),
        mutationFn: pageService.updatePageByID.bind(pageService),
    })
}