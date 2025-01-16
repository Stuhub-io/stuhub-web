import { QUERY_KEYS } from '@/mutation/keys'
import { useQuery } from '@tanstack/react-query'
import { pageService } from '@/api/page'
import { useEffect, useState } from 'react'

export interface UseFetchPages {
  allowFetch?: boolean
  pageID: string
}

export const useFetchPage = (
  args: UseFetchPages,
  option?: {
    refetchOnMount?: boolean
  },
) => {
  const { allowFetch = true, pageID } = args
  const [isError, setIsError] = useState(false)

  // disable refetch on focus if already error
  const enable = allowFetch && !isError

  const { error, ...rest } = useQuery({
    queryKey: QUERY_KEYS.GET_PAGE({
      pageID,
    }),
    queryFn: async () => pageService.getPage(pageID),
    enabled: enable,
    retry: 1,
    ...option,
  })

  useEffect(() => {
      setIsError(Boolean(error))
  }, [error])
  return { error, ...rest }
}
