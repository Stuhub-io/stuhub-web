import { pageService } from "@/api/page"
import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useRequestUserPageRole = (keys: FirstFuncParamType<typeof MUTATION_KEYS.REQUEST_USER_PAGE_ROLE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.REQUEST_USER_PAGE_ROLE(keys),
        mutationFn: pageService.requestPermissionRole.bind(pageService)
    })
}