import { useDisclosure } from '@nextui-org/react'
import { PopperContentTrigger } from '@/components/common/PopoverTrigger'
import { RenamePageInput } from '@/components/page/common/RenamePageInput'
import { PopperCard } from '@/components/common/PopperCard'
import { PageSearchSelector } from '@/components/page/common/PageSearchSelector'
import { WrapperRegistry } from '@/components/common/WrapperRegistry/WrapperRegistry'
import { Page } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useToast } from '@/hooks/useToast'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useArchivePage } from '@/mutation/mutator/page/useArchivePage'
import { useMovePage } from '@/mutation/mutator/page/useMovePage'
import { PageMoreMenuPopoverContent } from './PageMoreMenuPopover'
import { BasePageMenuProps } from '../../type'

export const PageDocumentActionMenu = (props: BasePageMenuProps) => {
  const { children, page, onSuccess } = props

  const queryClient = useQueryClient()

  const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure()

  const { isOpen: isOpenMove, onClose: onCloseMove, onOpen: onOpenMove } = useDisclosure()

  const { refreshOrgPages } = useSidebar()
  const { toast } = useToast()

  const { mutateAsync: archivePage } = useArchivePage({ id: page.id })

  const { mutateAsync: movePage } = useMovePage({
    id: page.id,
  })

  const onSuccessAction = async () => {
    refreshOrgPages()
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_PAGE({
        pageID: page.id,
      }),
    })

    await onSuccess?.()
  }

  const handleMove = async (selectedPage: Page) => {
    try {
      await movePage({
        pkid: page.pkid,
        body: {
          parent_page_pkid: selectedPage.pkid,
        },
      })
      await onSuccessAction()
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Failed to move page',
      })
    }
  }

  const handleArchive = async () => {
    try {
      await archivePage(page.pkid)
      onSuccessAction()
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Failed to archive page',
      })
    }
  }

  return (
    <WrapperRegistry
      wrappers={[
        <PopperCard
          key="popper-card"
          onClick={(e) => e.stopPropagation()}
          placement="bottom"
          isOpen={isOpenRename}
          renderContent={(setRef) => (
            <RenamePageInput
              ref={setRef}
              page={page}
              onClose={onCloseRename}
              onSuccess={onSuccessAction}
            />
          )}
          onClose={onCloseRename}
        />,
        <PopperCard
          key="popper-page-selector"
          placement="bottom"
          isOpen={isOpenMove}
          renderContent={(setRef) => (
            <PageSearchSelector
              excludePagePkIds={[page.pkid]}
              ref={setRef}
              onSelected={(selectPage) => {
                onCloseMove()
                handleMove(selectPage)
              }}
            />
          )}
          onClose={() => onCloseMove()}
        />,
      ]}
    >
      <div>
        <PopperContentTrigger>
          {children}
          <PageMoreMenuPopoverContent
            page={page}
            onRename={onOpenRename}
            onOpenMove={onOpenMove}
            onArchive={handleArchive}
          />
        </PopperContentTrigger>
      </div>
    </WrapperRegistry>
  )
}
