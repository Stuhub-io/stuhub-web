import { authService } from "@/api"
import { useMutation } from "@tanstack/react-query"

export const ACCOUNT_SET_PASSWORD = 'v1/auth-services/set-password'

export const useAccountSetPassword  = () => {
    return useMutation({
        mutationKey: [ACCOUNT_SET_PASSWORD],
        mutationFn: authService.setPassword.bind(authService)
    })
}