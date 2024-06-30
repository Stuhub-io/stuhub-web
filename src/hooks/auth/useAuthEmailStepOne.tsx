import { authService } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const AUTHEN_EMAIL_STEP_ONE_KEY = 'v1/auth-services/email-step-one'

export interface MutationAuthenEmailStepOneArgs {
  email: string
}

export const useAuthenEmailStepOne = () => {
  return useMutation({
    mutationKey: [AUTHEN_EMAIL_STEP_ONE_KEY],
    mutationFn: authService.authEmailStepOne.bind(authService),
  })
}
