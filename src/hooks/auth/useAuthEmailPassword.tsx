import { authService } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const AUTHEN_EMAIL_PASSWORD_MUTATION_KEY = 'v1/auth-services/email'

export const useAuthByEmailPassword = () => {
  return useMutation({
    mutationKey: [AUTHEN_EMAIL_PASSWORD_MUTATION_KEY],
    mutationFn: authService.authWithEmailPassword.bind(authService),
  })
}
