import { useMutation } from "@tanstack/react-query"
import { MUTATION_KEYS } from "../keys"
import { userService } from "@/api/user"



export const useUpdateUserInfo = () => {
    return useMutation({
        mutationKey: MUTATION_KEYS.UPDATE_USER_INFO,
        mutationFn: userService.updateProfile.bind(userService)
    })
}

