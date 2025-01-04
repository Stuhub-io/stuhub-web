'use client'

import { useFetchPageAccessLogs } from '@/mutation/querier/page-access-log/useFetchPageAccessLogs'

export default function Page() {
  const { data } = useFetchPageAccessLogs({
    allowFetch: true,
  })

  return <>Hello {JSON.stringify(data)}</>
}
