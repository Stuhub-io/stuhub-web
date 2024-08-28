import { pageService } from "@/api/page"
import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useCreatePage = (keys: FirstFuncParamType<typeof MUTATION_KEYS.CREATE_PAGE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.CREATE_PAGE(keys),
        mutationFn: pageService.createPage.bind(pageService),
    })
}