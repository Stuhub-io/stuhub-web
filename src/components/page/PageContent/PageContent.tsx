import BlockBasedEditor from '@/components/common/BlockBasedEditor'
import {
  extractHeading,
  TOCHeading,
} from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { useToast } from '@/hooks/useToast'
import { Document } from '@/schema/page'
import { JSONContent } from 'novel'
import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface PageContentProps {
  documentData?: Document
  onContentHeadingChanged?: (_: TOCHeading[]) => void
  isReadOnly?: boolean
}

export const PageContent = (props: PageContentProps) => {
  const { documentData, onContentHeadingChanged, isReadOnly } =
    props
  const { toast } = useToast()

  const [initLoad, setInitLoad] = useState(false)

  const updateDocument = useCallback(
    (content: JSONContent) => {
      if (!documentData || isReadOnly) return
      onContentHeadingChanged?.(extractHeading(content))
      // updateDocumentContent({
      //   pkid: documentData?.pkid,
      //   json_content: JSON.stringify(content ?? ''),
      // })
    },
    [documentData, isReadOnly, onContentHeadingChanged],
  )

  const onUpdateDocumentDebounce = useDebouncedCallback(updateDocument, 500, {
    maxWait: 2000,
    trailing: true,
  })

  const [content, setContent] = useState<JSONContent>()

  useEffect(() => {
    if (documentData && !initLoad) {
      try {
        const validJsonContent = JSON.parse(documentData.json_content || '{}')
        setContent(validJsonContent)
        onContentHeadingChanged?.(extractHeading(validJsonContent))
      } catch (e) {
        setContent({})
        toast({
          variant: 'danger',
          title: 'Something went wrong with old content',
        })
      }
      if (!isReadOnly) {
        setInitLoad(true)
      }
    }
  }, [content, documentData, initLoad, isReadOnly, onContentHeadingChanged, toast])

  return (
    <BlockBasedEditor
      jsonContent={content}
      onJsonContentChange={onUpdateDocumentDebounce}
      key={documentData && initLoad ? documentData?.pkid : 'loading'}
    />
  )
}
