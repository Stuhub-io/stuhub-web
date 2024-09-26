import BlockBasedEditor from '@/components/common/BlockBasedEditor'
import { useUpdateDocumentContent } from '@/mutation/mutator/document/useUpdateDocumentContent'
import { Document } from '@/schema/document'
import { JSONContent } from 'novel'
import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface PageContentProps {
  documentData?: Document
}

export const PageContent = (props: PageContentProps) => {
  const { documentData } = props
  const [initLoad, setInitLoad] = useState(false)

  const { mutate: updateDocumentContent } = useUpdateDocumentContent()

  const onUpdateDocument = useDebouncedCallback(
    (content: JSONContent) => {
      if (!documentData) return
      updateDocumentContent({
        pkid: documentData?.pkid,
        json_content: JSON.stringify(content ?? ''),
      })
    },
    500,
    {
      maxWait: 2000,
      trailing: true,
    },
  )

  const [content, setContent] = useState<JSONContent>()

  useEffect(() => {
    if (documentData && !initLoad) {
      setContent(documentData?.json_content ? JSON.parse(documentData?.json_content) : {})
      setInitLoad(true)
    }
  }, [documentData, initLoad])

  return (
    <BlockBasedEditor
      jsonContent={content}
      onJsonContentChange={onUpdateDocument}
      key={documentData && initLoad ? documentData?.pkid : 'loading'}
    />
  )
}
