import { QUERY_KEYS } from '@/mutation/keys'
import { useQuery } from '@tanstack/react-query'
import { pageService } from '@/api/page'
import { useEffect, useState } from 'react'

export interface UseFetchPages {
  allowFetch?: boolean
  pagePkID: number
}

export const useFetchPageByPkID = (
  args: UseFetchPages,
  option?: {
    refetchOnMount?: boolean
  },
) => {
  const { allowFetch = true, pagePkID } = args
  const [isError, setIsError] = useState(false)

  // disable refetch on focus if already error
  const enable = allowFetch && !isError

  const { error, ...rest } = useQuery({
    queryKey: QUERY_KEYS.GET_PAGE_PKID({
       pagePkID
    }),
    queryFn: async () => pageService.getPageByPkID(pagePkID),
    enabled: enable,
    retry: 1,
    ...option,
  })

  useEffect(() => {
      setIsError(Boolean(error))
  }, [error])

  const errCode = (error as any)?.body?.code
  const isPermissionDenied = errCode && errCode >= 400 && errCode < 500

  return { error, isPermissionDenied, ...rest }
}
