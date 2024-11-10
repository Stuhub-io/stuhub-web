import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { PoperContentTrigger } from '@/components/common/PopoverTrigger'
import { PageMoreMenuPopoverContent } from './PageMoreMenuPopover'
import { RenamePageInput } from '@/components/page/RenamePageInput'
import { PopperCard } from '@/components/common/PopperCard'
import { PageSearchSelector } from '@/components/page/PageSearchSelector'
import { WrapperRegistry } from '@/components/common/WrapperRegistry/WrapperRegistry'
import { Page } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useToast } from '@/hooks/useToast'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useArchivePage } from '@/mutation/mutator/page/useArchivePage'
import { useMovePage } from '@/mutation/mutator/page/useMovePage'

interface PageActionMenuProps {
  page: Page
  onSuccess?: () => void
}

export const PageActionMenu = (props: PropsWithChildren<PageActionMenuProps>) => {
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

  const handleMove = async (selectedPage: Page) => {
    try {
      await movePage({
        pkid: page.pkid,
        body: {
          parent_page_pkid: selectedPage.pkid,
        },
      })
      refreshOrgPages()
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PAGE({
          pageID: page.id,
        }),
      })
      await onSuccess?.()
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
      refreshOrgPages()
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.GET_PAGE({
          pageID: page.id,
        }),
      })
      await onSuccess?.()
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
          placement="bottom"
          isOpen={isOpenRename}
          renderContent={(setRef) => (
            <RenamePageInput
              ref={setRef}
              page={page}
              onClose={onCloseRename}
              onSuccess={onSuccess}
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
        <PoperContentTrigger>
          {children}
          <PageMoreMenuPopoverContent
            page={page}
            onRename={onOpenRename}
            onOpenMove={onOpenMove}
            onArchive={handleArchive}
          />
        </PoperContentTrigger>
      </div>
    </WrapperRegistry>
  )
}
