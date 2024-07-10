import { authService } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const VERIFY_EMAIL_TOKEN_AUTH = 'v1/auth-services/verify-email-token'

export const useVerifyTokenEmail = () => {
  return useMutation({
    mutationKey: [VERIFY_EMAIL_TOKEN_AUTH],
    mutationFn: authService.verifyTokenEmail.bind(authService),
  })
}
