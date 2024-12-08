import BlockBasedEditor from '@/components/common/BlockBasedEditor'
import {
  extractHeading,
  TOCHeading,
} from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { useToast } from '@/hooks/useToast'
import { useUpdatePageContent } from '@/mutation/mutator/page/useUpdatePageContent'
import { Page } from '@/schema/page'
import { JSONContent } from 'novel'
import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface PageContentProps {
  page?: Page
  onContentHeadingChanged?: (_: TOCHeading[]) => void
  isReadOnly?: boolean
}

export const PageContent = (props: PageContentProps) => {
  const { page, onContentHeadingChanged, isReadOnly } = props
  const { toast } = useToast()
  const { mutateAsync: updateDocumentContent } = useUpdatePageContent({
    id: String(page?.pkid) ?? '',
  })

  const [initLoad, setInitLoad] = useState(false)

  const updateDocument = useCallback(
    (content: JSONContent) => {
      if (!page || isReadOnly) return
      onContentHeadingChanged?.(extractHeading(content))
      updateDocumentContent({
        pkid: page?.pkid,
        body: {
          json_content: JSON.stringify(content ?? ''),
        },
      })
    },
    [page, isReadOnly, onContentHeadingChanged, updateDocumentContent],
  )

  const onUpdateDocumentDebounce = useDebouncedCallback(updateDocument, 500, {
    maxWait: 2000,
    trailing: true,
  })

  const [content, setContent] = useState<JSONContent>()

  useEffect(() => {
    if (page && !initLoad) {
      try {
        const validJsonContent = JSON.parse(page.document?.json_content || '{}')
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
  }, [content, page, initLoad, isReadOnly, onContentHeadingChanged, toast])

  return (
    <BlockBasedEditor
      jsonContent={content}
      onJsonContentChange={onUpdateDocumentDebounce}
      key={page && initLoad ? page.pkid : 'loading'}
    />
  )
}
