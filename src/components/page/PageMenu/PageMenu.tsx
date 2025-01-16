import { PopoverProps, useDisclosure } from '@nextui-org/react'
import { PopperContentTrigger } from '@/components/common/PopoverTrigger'
import { RenamePageInput } from '@/components/page/common/RenamePageInput'
import { PopperCard } from '@/components/common/PopperCard'
import { PageSearchSelector } from '@/components/page/common/PageSearchSelector'
import { WrapperRegistry } from '@/components/common/WrapperRegistry/WrapperRegistry'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useToast } from '@/hooks/useToast'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useArchivePage } from '@/mutation/mutator/page/useArchivePage'
import { useMovePage } from '@/mutation/mutator/page/useMovePage'
import { PageMoreMenuPopoverContent } from './PageMenuPopover'
import { PropsWithChildren, useCallback } from 'react'
import { useSharePageContext } from '@/components/providers/share'
import { BASE_URL } from '@/constants/envs'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import useCopy from 'use-copy'
import { MenuSection } from './PageMenuPopover/const'
import { usePermissions } from '@/components/providers/permissions'

export interface BasePageMenuProps extends PropsWithChildren {
  page: Page
  parentPage?: Page // For future permission checker
  onSuccess?: () => void
  onClose?: () => void
  placement?: PopoverProps['placement']
}

export const PageMenu = (props: BasePageMenuProps) => {
  const { children, page, onSuccess, placement = 'bottom' } = props
  const { organization, currentUserRole } = useOrganization()
  const { permissionChecker } = usePermissions()

  const queryClient = useQueryClient()

  const pageHref =
    BASE_URL +
    ROUTES.VAULT_PAGE({
      orgSlug: organization?.slug ?? '',
      pageID: page.id,
    })

  const [, copy] = useCopy(pageHref)

  const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure()

  const { isOpen: isOpenMove, onClose: onCloseMove, onOpen: onOpenMove } = useDisclosure()

  const { onOpenShareModal } = useSharePageContext()

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

  const handleShare = () => {
    onOpenShareModal(page)
  }

  const menuFilter = useCallback(
    (menuItems: MenuSection[]) => {
      return (
        menuItems
          // Modify UI
          .map((item) => {
            switch (item.key) {
              case 'organize-menu':
                return {
                  ...item,
                  title: getOrgMenuSectionLabel(page),
                } as MenuSection
              default:
                return item
            }
          })
          // Filter out section
          .filter((item) => {
            switch (item.key) {
              case 'download':
                return permissionChecker.page.canDownload(page)
              case 'share-menu':
                return permissionChecker.page.canShare(page)
              case 'rename':
                return permissionChecker.page.canEdit(page)
              case 'organize-menu':
                return currentUserRole && permissionChecker.page.canMove(currentUserRole, page)
              case 'trash':
                return permissionChecker.page.canDelete(page)
              default:
                return true
            }
          })
      )
    },
    [currentUserRole, page, permissionChecker.page],
  )

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
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <PopperContentTrigger placement={placement}>
          {children}
          <PageMoreMenuPopoverContent
            onCopy={copy}
            onNewTab={() => {
              window.open(pageHref)
            }}
            onShare={handleShare}
            onRename={onOpenRename}
            onOpenMove={onOpenMove}
            onArchive={handleArchive}
            filterMenu={menuFilter}
          />
        </PopperContentTrigger>
      </div>
    </WrapperRegistry>
  )
}

const getOrgMenuSectionLabel = (page: Page) => {
  switch (page.view_type) {
    case PageViewTypeEnum.FOLDER:
      return 'Organize Folder'
    case PageViewTypeEnum.DOCUMENT:
      return 'Organize Document'
    case PageViewTypeEnum.ASSET:
      return 'Organize File'
    default:
      return 'Organize'
  }
}
