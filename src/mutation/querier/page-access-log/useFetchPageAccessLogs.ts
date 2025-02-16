import { QUERY_KEYS } from '@/mutation/keys'
import { useInfiniteQuery } from '@tanstack/react-query'
import { pageAccessLogService } from '@/api/page-access-log'
import { GetPageAccessLogsQuery, PageAccessLog } from '@/schema/page-access-log'
import { BaseResponse, CursorPagination } from '@/schema/base'

export interface UseFetchPageAccessLogs extends GetPageAccessLogsQuery {
  allowFetch?: boolean
}

export const useFetchPageAccessLogs = (
  args: UseFetchPageAccessLogs,
  option?: {
    refetchOnMount?: boolean
  },
) => {
  const { allowFetch = true } = args
  const query = useInfiniteQuery<BaseResponse<PageAccessLog[], CursorPagination>>({
    queryKey: QUERY_KEYS.GET_PAGE_ACCESS_LOGS({}),
    queryFn: async ({ pageParam }: any) => {
      const { cursor, limit } = pageParam || { cursor: undefined, limit: 10 }
      return await pageAccessLogService.getLogs({ cursor, limit })
    },
    enabled: allowFetch,
    initialPageParam: {},
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination?.next_cursor) return undefined
      return {
        cursor: lastPage.pagination?.next_cursor,
        limit: lastPage.pagination?.limit,
      } as GetPageAccessLogsQuery
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...option,
  })

  const logs: PageAccessLog[] = []
  if (query.data) {
    query.data.pages.forEach((page) => logs?.push(...page.data))
  }

  const isLoading = query.isLoading || query.isFetchingNextPage

  return {
    ...query,
    isLoading,
    logs,
  }
}
