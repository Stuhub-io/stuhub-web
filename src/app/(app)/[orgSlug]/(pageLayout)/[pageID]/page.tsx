'use client'

import { PageTitle } from '@/components/page/PageTitleInput'
import { usePageContext } from '@/components/providers/page'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { PageContent } from '@/components/page/PageTitleInput/PageContent'
import { Skeleton } from '@nextui-org/react'

console.warn = () => {}
console.error = () => {}

export default function PageDetail() {
  const { currentPage } = usePageContext()

  const { data: { data: documentData } = {}, isRefetching } = useFetchDocument({
    allowFetch: !!currentPage,
    pagePkID: currentPage?.pk_id ?? -1,
  })

  return (
    <div className="flex flex-col py-8">
      <div className="flex flex-col">
        <PageTitle page={currentPage} key={currentPage?.id} />
      </div>
      <div className="-mx-3 pb-10">
        {documentData ? (
          <PageContent
            documentData={documentData}
            key={isRefetching ? 'refetching' : documentData?.pk_id}
          />
        ) : (
          <div className="flex flex-col py-8 px-8 gap-4">
            <Skeleton className="h-[44px] max-w-full w-[400px] rounded-small" />
            <Skeleton className="h-[30px] max-w-full w-[600px] rounded-small" />
          </div>
        )}
      </div>
    </div>
  )
}
