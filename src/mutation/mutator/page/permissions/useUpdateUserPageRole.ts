import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useUpdateUserPageRole = (keys: FirstFuncParamType<typeof MUTATION_KEYS.UPDATE_USER_PAGE_ROLE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.UPDATE_USER_PAGE_ROLE(keys),
        mutationFn: pageService.updateUserPermissionRole.bind(pageService),
    })
}