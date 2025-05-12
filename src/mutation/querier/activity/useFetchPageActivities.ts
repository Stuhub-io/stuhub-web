import { QUERY_KEYS } from '@/mutation/keys'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { activityService } from '@/api/activity'

export interface UseFetchPages {
  allowFetch?: boolean
  pagePkID: number
  endTime?: string
  limit?: number
}

export const useFetchPageActivities = (args: UseFetchPages) => {
  const { allowFetch = true, pagePkID, endTime, limit = 50 } = args
  return useQuery({
    queryKey: QUERY_KEYS.GET_PAGE_ACTIVITIES({
      pagePkID,
      endTime,
      limit,
    }),
    queryFn: async () => activityService.getPageActivities({ pagePkID, endTime, limit }),
    enabled: allowFetch,
  })
}

export const useInfiniteFetchPageActivities = (args: UseFetchPages) => {
  const { allowFetch = true, pagePkID, endTime, limit = 50 } = args
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.GET_PAGE_ACTIVITIES({ pagePkID, endTime, limit }),
    queryFn: async ({pageParam}) =>
      activityService.getPageActivities({
        pagePkID,
        endTime: pageParam.cursor,
        limit,
      }),
    initialPageParam: { cursor: endTime },
    getNextPageParam(lastPage) {
      if (!lastPage.data.length) return undefined
      if (!lastPage.pagination?.next_cursor) return undefined
      return {
        cursor: lastPage.pagination.next_cursor,
      }
    },
    enabled: allowFetch
  })
}
