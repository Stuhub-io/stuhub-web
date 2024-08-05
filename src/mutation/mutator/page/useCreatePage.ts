import { pageService } from "@/api/page"
import { MUTATION_KEYS } from "@/mutation/keys"
import { useMutation } from "@tanstack/react-query"


export const useCreatePage = () => {
    return useMutation({
        mutationKey: MUTATION_KEYS.CREATE_PAGE,
        mutationFn: pageService.createPage.bind(pageService),
    })
}