'use client'

import { PageTitle } from '@/components/page/PageTitleInput'
import { usePageContext } from '@/components/providers/page'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { PageContent } from '@/components/page/PageTitleInput/PageContent'
import { Skeleton } from '@nextui-org/react'

export default function PageDetail() {
  const { currentPage } = usePageContext()

  const { data: { data: documentData } = {}, isRefetching } = useFetchDocument({
    allowFetch: !!currentPage,
    pagePkID: currentPage?.pk_id ?? -1,
  })

  return (
    <div className="flex flex-col py-8">
      <div className="flex flex-col">
        {currentPage && <PageTitle pageID={currentPage?.id} key={currentPage?.id} />}
      </div>
      <div className="-mx-3 pb-10">
        {documentData ? (
          <PageContent
            documentData={documentData}
            key={isRefetching ? 'refetching' : documentData?.pk_id}
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
