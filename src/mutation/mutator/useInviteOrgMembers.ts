import { useMutation } from "@tanstack/react-query"
import { MUTATION_KEYS } from "../keys"
import { organizationService } from "@/api/organization"

export const useInviteOrgMembers = () => {
    return useMutation({
        mutationKey: MUTATION_KEYS.INVITE_ORG_MEMBERS,
        mutationFn: organizationService.inviteOrgMembers.bind(organizationService)
    })
}

