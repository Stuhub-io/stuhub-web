import { QUERY_KEYS } from "@/mutation/keys";
import { useQuery } from "@tanstack/react-query";
import { SearchUserBody } from "@/schema/user";
import { userService } from "@/api/user";

export interface UseFetchPages { 
    allowFetch?: boolean
    body:  SearchUserBody
}

export const useSearchUsers = (args: UseFetchPages, option?: {
    refetchOnMount?: boolean
}) => {
    const {allowFetch = true, body} = args
    return useQuery({
        queryKey: QUERY_KEYS.SEARCH_USERS(body),
        queryFn: async () => userService.searchUser(body),
        enabled: allowFetch,
        ...option
    })
}