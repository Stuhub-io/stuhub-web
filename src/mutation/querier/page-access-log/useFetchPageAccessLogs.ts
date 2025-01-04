import { QUERY_KEYS } from '@/mutation/keys'
import { useQuery } from '@tanstack/react-query'
import { pageAccessLogService } from '@/api/page-access-log'

export interface UseFetchPageAccessLogs {
  allowFetch?: boolean
}

export const useFetchPageAccessLogs = (
  args: UseFetchPageAccessLogs,
  option?: {
    refetchOnMount?: boolean
  },
) => {
  const { allowFetch = true } = args
  return useQuery({
    queryKey: QUERY_KEYS.GET_PAGE_ACCESS_LOGS,
    queryFn: async () => pageAccessLogService.getLogs(),
    enabled: allowFetch,
    ...option,
  })
}
