import { pageService } from '@/api/page'
import { QUERY_KEYS } from '@/mutation/keys'
import { useQuery } from '@tanstack/react-query'

interface UseFetchPageRoleRequestsArgs {
  allowFetch?: boolean
  pagePkID: number
}

export const useFetchPageRoleRequests = (args: UseFetchPageRoleRequestsArgs) => {
  const { allowFetch = true, pagePkID } = args
  return useQuery({
    queryKey: QUERY_KEYS.LIST_PAGE_ROLE_REQUESTS({ pagePkID }),
    queryFn: () => pageService.getUserPermissionRoleRequests(pagePkID),
    enabled: allowFetch,
  })
}
