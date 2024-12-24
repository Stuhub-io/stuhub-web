import { pageService } from '@/api/page'
import { QUERY_KEYS } from '@/mutation/keys'
import { useQuery } from '@tanstack/react-query'

interface UseFetchPagePermissions {
  allowFetch?: boolean
  pagePkID: number
}

// FIXME: This is a mock implementation
export const useFetchPagePermissionRoles = (args: UseFetchPagePermissions) => {
  const { allowFetch, pagePkID } = args
  return useQuery({
    queryKey: QUERY_KEYS.GET_PAGE_PERMISSION_ROLES({
      pagePkID,
    }),
    queryFn: () => pageService.getPagePermissionRoles(pagePkID),
    enabled: allowFetch,
  })
}
