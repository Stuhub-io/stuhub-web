import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useCreateAsset = (keys: FirstFuncParamType<typeof MUTATION_KEYS.CREATE_ASSET>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.CREATE_PAGE(keys),
        mutationFn: pageService.createAsset.bind(pageService),
    })
}