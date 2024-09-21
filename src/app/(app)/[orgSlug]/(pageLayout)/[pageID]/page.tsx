'use client'

import { BlockBasedEditor } from '@/components/common/BlockBasedEditor'
import { PageTitle } from '@/components/page/PageTitleInput'
import { usePageContext } from '@/components/providers/page'
import { useUpdateDocumentContent } from '@/mutation/mutator/document/useUpdateDocumentContent'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { JSONContent } from 'novel'
import { useThrottledCallback } from 'use-debounce'
import { useEffect, useState } from 'react'

export default function PageDetail() {
  const { currentPage } = usePageContext()
  const { data: { data: documentData } = {}, isStale } = useFetchDocument({
    allowFetch: !!currentPage,
    pagePkID: currentPage?.pk_id ?? -1,
  })
  const [initLoad, setInitLoad] = useState(false)
  const { mutate: updateDocumentContent } = useUpdateDocumentContent()

  const onUpdateDocument = useThrottledCallback(
    (content: JSONContent) => {
      if (!documentData) return
      updateDocumentContent({
        pk_id: documentData?.pk_id,
        json_content: JSON.stringify(content ?? ''),
      })
    },
    2000,
    {
      trailing: true,
    },
  )

  const [content, setContent] = useState<JSONContent>()

  useEffect(() => {
    console.log('reset content')
    if (document && !isStale && !initLoad) {
      console.log('documentData', documentData)
      setContent(documentData?.json_content ? JSON.parse(documentData?.json_content) : {})
      setInitLoad(true)
    }
  }, [documentData, initLoad, isStale])

  return (
    <>
      <div className="group flex flex-col">
        <PageTitle page={currentPage} />
      </div>
      <div className="-mx-3 mt-2 pb-10">
        {content !== undefined && (
          <BlockBasedEditor jsonContent={content} onJsonContentChange={onUpdateDocument} />
        )}
      </div>
    </>
  )
}
