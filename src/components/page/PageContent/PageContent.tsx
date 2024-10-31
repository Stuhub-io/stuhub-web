import BlockBasedEditor from '@/components/common/BlockBasedEditor'
import { PAGE_DATA_ATTRIBUTE } from '@/components/common/BlockBasedEditor/extensions/Page'
import {
  extractHeading,
  TOCHeading,
} from '@/components/common/BlockBasedEditor/utils/extract-headings'
import { PageEditorProvider } from '@/components/providers/page/page-editor'
import { useSidebar } from '@/components/providers/sidebar'
import { useToast } from '@/hooks/useToast'
import { QUERY_KEYS } from '@/mutation/keys'
import { useUpdateDocumentContent } from '@/mutation/mutator/document/useUpdateDocumentContent'
import { useBulkArchivePages } from '@/mutation/mutator/page/useBulkArchivePages'
import { useBulkGetOrCreatePages } from '@/mutation/mutator/page/useBulkGetOrCreatePages'
import { Document } from '@/schema/document'
import { BulkGetOrCreateRequestBody, Page } from '@/schema/page'
import { useQueryClient } from '@tanstack/react-query'
import { Attrs } from '@tiptap/pm/model'
import { JSONContent } from 'novel'
import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface PageContentProps {
  documentData?: Document
  onContentHeadingChanged?: (_: TOCHeading[]) => void
  isReadOnly?: boolean
  page?: Page
  mutatePage?: () => void
  fetchingPage?: boolean
}

export const PageContent = (props: PageContentProps) => {
  const { documentData, onContentHeadingChanged, isReadOnly, page, mutatePage, fetchingPage } =
    props
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [initLoad, setInitLoad] = useState(false)

  const { mutate: updateDocumentContent } = useUpdateDocumentContent()
  const { refreshPrivatePages } = useSidebar()

  const { mutateAsync: bulkGetOrCreatePages } = useBulkGetOrCreatePages()
  const { mutateAsync: bulkArchivePages } = useBulkArchivePages()

  const updateDocument = useCallback(
    (content: JSONContent) => {
      if (!documentData || isReadOnly) return
      onContentHeadingChanged?.(extractHeading(content))
      updateDocumentContent({
        pkid: documentData?.pkid,
        json_content: JSON.stringify(content ?? ''),
      })
    },
    [documentData, isReadOnly, onContentHeadingChanged, updateDocumentContent],
  )

  const onUpdateDocumentDebounce = useDebouncedCallback(updateDocument, 500, {
    maxWait: 2000,
    trailing: true,
  })

  const [content, setContent] = useState<JSONContent>()

  const handleCreateDocument = useCallback(
    async (attr: Attrs[], snapContent: JSONContent) => {
      if (!page) return
      try {
        const inputs: BulkGetOrCreateRequestBody = {
          page_inputs: attr.map((a) => ({
            name: '',
            node_id: a[PAGE_DATA_ATTRIBUTE],
            parent_page_pkid: page.pkid,
            space_pkid: page.space_pkid,
            view_type: 'document',
          })),
        }
        updateDocument(snapContent)
        // const newPages =
        await bulkGetOrCreatePages(inputs)
        refreshPrivatePages()
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_PAGE({ pageID: page.id }),
        })
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to create document',
        })
      }
    },
    [bulkGetOrCreatePages, page, queryClient, refreshPrivatePages, toast, updateDocument],
  )

  const handleDeleteDocument = useCallback(
    async (attrs: Attrs[], snapContent: JSONContent) => {
      if (!page) return
      const childPageMap =
        page.child_pages?.reduce(
          (map, child) => {
            map[child.node_id ?? ''] = child
            return map
          },
          {} as Record<string, Page>,
        ) ?? {}
      const pagePkIDs = attrs.map((a) => childPageMap[a[PAGE_DATA_ATTRIBUTE]]?.pkid).filter(Boolean)
      try {
        updateDocument(snapContent)
        await bulkArchivePages({
          page_pkids: pagePkIDs,
        })
        refreshPrivatePages()
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_PAGE({ pageID: page.id }),
        })
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to archive document',
        })
      }
    },
    [bulkArchivePages, page, queryClient, refreshPrivatePages, toast, updateDocument],
  )

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
    <PageEditorProvider
      childPages={page?.child_pages ?? []}
      pageMutate={mutatePage}
      validatingPageMap={fetchingPage}
    >
      <BlockBasedEditor
        jsonContent={content}
        onJsonContentChange={onUpdateDocumentDebounce}
        onPageNodesAdded={handleCreateDocument}
        onPageNodesRemoved={handleDeleteDocument}
        key={documentData && initLoad ? documentData?.pkid : 'loading'}
      />
    </PageEditorProvider>
  )
}
