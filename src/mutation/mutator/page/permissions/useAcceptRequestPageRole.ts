import { FirstFuncParamType } from "@/libs/utils"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"
import { pageService } from "@/api/page"


export const useAcceptRequestUserPageRole = (keys: FirstFuncParamType<typeof MUTATION_KEYS.ACCEPT_USER_PAGE_ROLE>) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.ACCEPT_USER_PAGE_ROLE(keys),
        mutationFn: pageService.acceptPermissionRoleRequest.bind(pageService),
    })
}