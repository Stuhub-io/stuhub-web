import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useStarPage = (keys: FirstFuncParamType<typeof MUTATION_KEYS.STAR_PAGE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.STAR_PAGE(keys),
        mutationFn: pageService.starPage.bind(pageService),
    })
}