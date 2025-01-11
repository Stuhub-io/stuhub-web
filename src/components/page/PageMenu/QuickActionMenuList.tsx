import { Button, useDisclosure } from '@nextui-org/react'
import { RenamePageInput } from '@/components/page/common/RenamePageInput'
import { PopperCard } from '@/components/common/PopperCard'
import { Page } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { PropsWithChildren, useMemo } from 'react'
import { useSharePageContext } from '@/components/providers/share'
import { usePermissions } from '@/components/providers/permissions'
import { RiDownloadLine, RiEditLine, RiStarFill, RiUserShared2Fill } from 'react-icons/ri'

export interface BasePageMenuProps extends PropsWithChildren {
  page: Page
  onSuccess?: () => void
}

export const PageQuickActionMenu = (props: BasePageMenuProps) => {
  const { page, onSuccess } = props
  const { permissionChecker } = usePermissions()

  const queryClient = useQueryClient()

  const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure()

  const { onOpenShareModal } = useSharePageContext()

  const { refreshOrgPages } = useSidebar()

  const onSuccessAction = async () => {
    refreshOrgPages()
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_PAGE({
        pageID: page.id,
      }),
    })

    await onSuccess?.()
  }

  const handleShare = () => {
    onOpenShareModal?.(page)
  }

  const permissions = useMemo(
    () => ({
      download: permissionChecker.page.canDownload(page),
      share: permissionChecker.page.canShare(page),
      rename: permissionChecker.page.canEdit(page),
      // star: permissionChecker.page.canStar(page),
    }),
    [page, permissionChecker.page],
  )

  return (
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
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="flex items-center gap-2 w-[136px]"
      >
        {permissions.share && (
          <Button className="group-hover:opacity-65 opacity-0 transition duration-200" variant="light" radius="full" color="default" size="sm" isIconOnly onClick={handleShare}>
            <RiUserShared2Fill size={16} />
          </Button>
        )}
        {permissions.rename && (
          <Button className="group-hover:opacity-65 opacity-0 transition duration-200" variant="light" radius="full" color="default" size="sm" isIconOnly onClick={onOpenRename}>
            <RiEditLine size={16} />
          </Button>
        )}
        {permissions.download && (
          <Button className="group-hover:opacity-65 opacity-0 transition duration-200" variant="light" radius="full" color="default" size="sm" isIconOnly>
            <RiDownloadLine size={16} />
          </Button>
        )}
        <Button className="group-hover:opacity-65 opacity-0 transition duration-200" variant="light" radius="full" color="default" size="sm" isIconOnly>
          <RiStarFill size={16} />
        </Button>
      </div>
    </PopperCard>
  )
}
