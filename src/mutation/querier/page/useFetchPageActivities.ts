import { QUERY_KEYS } from '@/mutation/keys'
import { useQuery } from '@tanstack/react-query'
import { pageService } from '@/api/page'

export interface UseFetchPages {
  allowFetch?: boolean
  pagePkID: number
}

export const useFetchPageActivities = (
  args: UseFetchPages,
) => {
  const { allowFetch = true, pagePkID } = args
  return useQuery({
    queryKey: QUERY_KEYS.GET_PAGE_ACTIVITIES({
        pagePkID
    }),
    queryFn: async () => pageService.getPageActivities({pagePkID}),
    enabled: allowFetch,
  })
}
