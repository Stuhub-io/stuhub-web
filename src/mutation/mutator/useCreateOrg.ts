import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../keys";
import { organizationService } from "@/api/organization";

export const useCreateOrg = () => {
    return useMutation({
        mutationKey: MUTATION_KEYS.CREATE_ORG,
        mutationFn: organizationService.createOrg.bind(organizationService),
    })
}