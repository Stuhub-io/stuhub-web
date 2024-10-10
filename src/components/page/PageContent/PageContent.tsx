import BlockBasedEditor from '@/components/common/BlockBasedEditor'
import { editorEmittor } from '@/components/common/BlockBasedEditor/emitter'
import {
  extractHeading,
  TOCHeading,
} from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { useCreatePageContext } from '@/components/providers/newpage'
import { useToast } from '@/hooks/useToast'
import { QUERY_KEYS } from '@/mutation/keys'
import { useCreateDocument } from '@/mutation/mutator/document/useCreateDocument'
import { useUpdateDocumentContent } from '@/mutation/mutator/document/useUpdateDocumentContent'
import { Document } from '@/schema/document'
import { Page } from '@/schema/page'
import { useQueryClient } from '@tanstack/react-query'
import { JSONContent } from 'novel'
import { useState, useEffect, useId } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface PageContentProps {
  documentData?: Document
  onContentHeadingChanged?: (_: TOCHeading[]) => void
  isReadOnly?: boolean
  page?: Page
}

export const PageContent = (props: PageContentProps) => {
  const { documentData, onContentHeadingChanged, isReadOnly, page } = props
  const { toast } = useToast()
  const { appendCreatingPages, updateCreatingPages } = useCreatePageContext()
  const queryClient = useQueryClient()

  const [initLoad, setInitLoad] = useState(false)

  const createId = useId()

  const { mutateAsync } = useCreateDocument({
    parent_page_pkid: page?.parent_page_pkid ?? -1,
    space_pkid: page?.space_pkid ?? -1,
    tempId: createId,
  })

  const { mutate: updateDocumentContent } = useUpdateDocumentContent()

  const onUpdateDocument = useDebouncedCallback(
    (content: JSONContent) => {
      if (!documentData || isReadOnly) return
      onContentHeadingChanged?.(extractHeading(content))
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

  const handleCreateDocument = async () => {
    console.log('handleCreateDocument')
    try {
      const data = {
        name: '',
        parent_page_pkid: page?.parent_page_pkid,
        space_pkid: page?.space_pkid ?? -1,
        view_type: 'document' as const,
      }
      appendCreatingPages({
        id: createId,
        input: data,
      })
      const result = await mutateAsync({
        page: data,
        json_content: '{}',
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_SPACE_PAGES({ space_pkid: data.space_pkid }),
      })
      updateCreatingPages(createId, {
        id: createId,
        input: data,
        result: result.data.page,
      })
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Failed to create document',
      })
    }
  }

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

  useEffect(() => {
    editorEmittor.on('pageAdd', () => {
      handleCreateDocument()
    })
    return () => {
      editorEmittor.off('pageAdd')
    }
  }, [])

  return (
    <BlockBasedEditor
      jsonContent={content}
      onJsonContentChange={onUpdateDocument}
      key={documentData && initLoad ? documentData?.pkid : 'loading'}
    />
  )
}
