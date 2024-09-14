'use client'

import { BlockBasedEditor } from '@/components/common/BlockBasedEditor'
import { PageTitle } from '@/components/page/PageTitleInput'
import { usePageContext } from '@/components/providers/page'
import { useDebounce } from '@/hooks/useDebounce'
import { useUpdateDocumentContent } from '@/mutation/mutator/document/useUpdateDocumentContent'
import { useFetchDocument } from '@/mutation/querier/document/useFetchDocument'
import { JSONContent } from 'novel'
import { useEffect, useState } from 'react'

export default function PageDetail() {
  const { currentPage } = usePageContext()
  const { data: { data: documentData } = {} } = useFetchDocument({
    allowFetch: !!currentPage,
    pagePkID: currentPage?.pk_id ?? -1,
  })
  const { mutate: updateDocumentContent } = useUpdateDocumentContent()

  const [content, setContent] = useState<JSONContent>()

  const debouncedContent = useDebounce(content)

  useEffect(() => {
    if (document) {
      setContent(documentData?.json_content ? JSON.parse(documentData?.json_content) : {})
    }
  }, [documentData, currentPage?.name])

  useEffect(() => {
    if (!debouncedContent || !currentPage || !documentData) return
    updateDocumentContent(
      {
        pk_id: documentData?.pk_id,
        json_content: JSON.stringify(content ?? ''),
      },
      {
        onError: (e) => console.log(e),
      },
    )
  }, [debouncedContent])

  return (
    <>
      <div className="group flex flex-col">
        <PageTitle page={currentPage} />
      </div>
      <div className="-mx-3 mt-2 pb-10">
        {content !== undefined && (
          <BlockBasedEditor
            jsonContent={content}
            onJsonContentChange={(json) => setContent(json)}
          />
        )}
      </div>
    </>
  )
}
