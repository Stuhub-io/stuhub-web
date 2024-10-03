import { useMutation } from '@tanstack/react-query'
import { MUTATION_KEYS } from '../../keys'
import { organizationService } from '@/api/organization'

export const useAcceptOrgInvite = () => {
  return useMutation({
    mutationKey: MUTATION_KEYS.ACCEPT_ORG_INVITE,
    mutationFn: organizationService.validateOrgInvite.bind(organizationService),
  })
}
