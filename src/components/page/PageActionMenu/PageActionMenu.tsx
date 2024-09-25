import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { PoperContentTrigger } from '@/components/common/PopoverTrigger'
import { PageMoreMenuPopoverContent } from '@/components/page/PageMoreMenuPopover'
import { RenamePageInput } from '@/components/page/RenamePageInput'
import { PopperCard } from '@/components/common/PopperCard'
import { PageSearchSelector } from '@/components/page/PageSearchSelector'
import { WrapperRegistry } from '@/components/common/WrapperRegistry/WrapperRegistry'
import { Page } from '@/schema/page'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { useSidebar } from '@/components/providers/sidebar'
import { useToast } from '@/hooks/useToast'

interface PageActionMenuProps {
  page: Page
}

export const PageActionMenu = (props: PropsWithChildren<PageActionMenuProps>) => {
  const { children, page } = props

  const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure()

  const { isOpen: isOpenMove, onClose: onCloseMove, onOpen: onOpenMove } = useDisclosure()

  const { refreshSpacePages } = useSidebar()
  const { toast } = useToast()

  const { mutateAsync: updatePage } = useUpdatePage({
    id: page.id,
  })

  const handleMove = async (selectedPage: Page) => {
    try {
      await updatePage({
        name: page.name,
        parent_page_pk_id: selectedPage.pk_id,
        uuid: page.id,
        view_type: page.view_type,
      })
      refreshSpacePages(page.id)
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Failed to move page',
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
            <RenamePageInput ref={setRef} page={page} onClose={onCloseRename} />
          )}
          onClose={onCloseRename}
        />,
        <PopperCard
          key="popper-page-selector"
          placement="bottom"
          isOpen={isOpenMove}
          renderContent={(setRef) => (
            <PageSearchSelector
              excludePageIds={[page.id]}
              ref={setRef}
              spacePkID={page.space_pkid}
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
          <PageMoreMenuPopoverContent page={page} onRename={onOpenRename} onOpenMove={onOpenMove} />
        </PoperContentTrigger>
      </div>
    </WrapperRegistry>
  )
}
