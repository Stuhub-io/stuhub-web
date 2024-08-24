import { pageService } from "@/api/page"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useCreatePage = (keys: Parameters<typeof MUTATION_KEYS.CREATE_PAGE>[0]) => {
    return useMutation({
        mutationKey: MUTATION_KEYS.CREATE_PAGE(keys),
        mutationFn: pageService.createPage.bind(pageService),
    })
}