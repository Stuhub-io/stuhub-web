'use client'

import Typography from '@/components/common/Typography'
import { OrganizationPageParams } from '@/constants/routes'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams } from 'next/navigation'
import { formatTimeToNow } from '@/utils/time'

export const PageArchivedAlert = () => {
  const { pageID } = useParams<OrganizationPageParams>()
  const { data: { data: pageDetail } = {}, isPending } = useFetchPage({
    allowFetch: Boolean(pageID),
    pageID,
  })
  const isArchived = Boolean(pageDetail?.archived_at)

  const archivedTime = isArchived ? formatTimeToNow(pageDetail?.archived_at ?? "") : null

  if (!isArchived || isPending) {
    return null
  }

  return <div className="bg-danger-300 py-2 justify-center">
    <Typography level="p5" color='contrast' className='text-center'>
        This page has been archived {archivedTime}
    </Typography>
  </div>
}
