'use client'

import { PageTitle } from '@/components/page/PageTitleInput'
import { usePageContext } from '@/components/providers/page'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { PageContent } from '@/components/page/PageTitleInput/PageContent'

console.warn = () => {}
console.error = () => {}

export default function PageDetail() {
  const { currentPage } = usePageContext()

  const { data: { data: documentData } = {}, isRefetching } = useFetchDocument({
    allowFetch: !!currentPage,
    pagePkID: currentPage?.pk_id ?? -1,
  })

  return (
    <>
      <div className="group flex flex-col">
        <PageTitle page={currentPage} key={currentPage?.id} />
      </div>
      <div className="-mx-3 mt-2 pb-10">
        <PageContent
          documentData={documentData}
          key={isRefetching ? 'refetching' : documentData?.pk_id}
        />
      </div>
    </>
  )
}
