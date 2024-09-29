'use client'

import { PageTitle } from '@/components/page/PageTitleInput'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { PageContent } from '@/components/page/PageTitleInput/PageContent'
import { Skeleton } from '@nextui-org/react'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'

export default function PageDetail() {
  const { pageID } = useParams<OrganizationPageParams>()
  const {data: {data: pageDetail} = {}} = useFetchPage({
    allowFetch: true,
    pageID,
  })

  const { data: { data: documentData } = {}, isRefetching } = useFetchDocument({
    allowFetch: !!pageDetail,
    pagePkID: pageDetail?.pkid ?? -1,
  })

  return (
    <div className="flex flex-col py-8">
      <div className="flex flex-col">
        {pageDetail && <PageTitle pageID={pageDetail?.id} key={pageDetail?.id} />}
      </div>
      <div className="-mx-3 pb-10">
        {documentData ? (
          <PageContent
            documentData={documentData}
            key={isRefetching ? 'refetching' : documentData?.pkid}
          />
        ) : (
          <div className="flex flex-col gap-4 px-8 py-8">
            <Skeleton className="h-[44px] w-[400px] max-w-full rounded-small" />
            <Skeleton className="h-[30px] w-[600px] max-w-full rounded-small" />
          </div>
        )}
      </div>
    </div>
  )
}
