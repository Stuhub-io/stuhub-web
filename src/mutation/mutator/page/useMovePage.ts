import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useMovePage = (keys: FirstFuncParamType<typeof MUTATION_KEYS.MOVE_PAGE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.MOVE_PAGE(keys),
        mutationFn: pageService.movePage.bind(pageService),
    })
}