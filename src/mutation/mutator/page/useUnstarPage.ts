import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useUnstarPage = (keys: FirstFuncParamType<typeof MUTATION_KEYS.UNSTAR_PAGE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.UNSTAR_PAGE(keys),
        mutationFn: pageService.unstarPage.bind(pageService),
    })
}