import { useMutation } from "@tanstack/react-query"
import { MUTATION_KEYS } from "../keys"
import { userService } from "@/api/user"

export const useFindUserByEmail = () => {
    return useMutation({
        mutationKey: MUTATION_KEYS.FIND_USER_BY_EMAIL,
        mutationFn: userService.findUserByEmail.bind(userService)
    })
}

