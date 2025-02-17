import { Button, useDisclosure } from '@nextui-org/react'
import { RenamePageInput } from '@/components/page/common/RenamePageInput'
import { PopperCard } from '@/components/common/PopperCard'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { PropsWithChildren, useMemo, useState } from 'react'
import { useSharePageContext } from '@/components/providers/share'
import { usePermissions } from '@/components/providers/permissions'
import { RiDownloadLine, RiEditLine, RiStarFill, RiUserShared2Fill } from 'react-icons/ri'
import { cn } from '@/libs/utils'
import { useStarPage } from '@/mutation/mutator/page/useStarPage'
import { useUnstarPage } from '@/mutation/mutator/page/useUnstarPage'
import { downloadFromUrl } from '@/utils/file'
import { useToast } from '@/hooks/useToast'

export interface BasePageMenuProps extends PropsWithChildren {
  page: Page
  onSuccess?: () => void
}

export const PageQuickActionMenu = (props: BasePageMenuProps) => {
  const { page, onSuccess } = props
  const { permissionChecker } = usePermissions()
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const { isOpen: isOpenRename, onOpen: onOpenRename, onClose: onCloseRename } = useDisclosure()

  const { onOpenShareModal } = useSharePageContext()

  const { refreshOrgPages, refreshStarredOrgPages } = useSidebar()

  const [togglingStar, setTogglingStar] = useState(false)
  const { mutateAsync: starPage } = useStarPage({
    pagePkID: page.pkid,
  })
  const { mutateAsync: unstarPage } = useUnstarPage({
    pagePkID: page.pkid,
  })

  const onSuccessAction = async () => {
    refreshOrgPages()
    refreshStarredOrgPages()

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_PAGE({
        pageID: page.id,
      }),
    })

    await onSuccess?.()
  }

  const handleDownload = () => {
    if ([PageViewTypeEnum.ASSET].includes(page.view_type)) {
      // downloadAsset(page)
      downloadFromUrl(page.asset?.url ?? '', page.name)
    } else {
      toast({
        variant: 'danger',
        title: 'Download is not supported for this file type',
      })
    }
  }

  const onToggleStar = async () => {
    const mutate = page.page_star ? unstarPage : starPage
    setTogglingStar(true)
    try {
      await mutate({
        pagePkID: page.pkid,
      })
      onSuccessAction()
    } catch (e) {
      console.error(e)
    }
    setTogglingStar(false)
  }

  const handleShare = () => {
    onOpenShareModal(page)
  }

  const permissions = useMemo(
    () => ({
      download: permissionChecker.page.canDownload(page),
      share: permissionChecker.page.canShare(page),
      rename: permissionChecker.page.canEdit(page),
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
        <RenamePageInput ref={setRef} page={page} onClose={onCloseRename} onSuccess={onSuccessAction} />
      )}
      onClose={onCloseRename}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="flex w-[136px] items-center gap-2"
      >
        {permissions.share && (
          <Button
            className="opacity-0 transition duration-200 group-hover:opacity-65"
            variant="light"
            radius="full"
            color="default"
            size="sm"
            isIconOnly
            onClick={handleShare}
          >
            <RiUserShared2Fill size={16} />
          </Button>
        )}
        {permissions.rename && (
          <Button
            className="opacity-0 transition duration-200 group-hover:opacity-65"
            variant="light"
            radius="full"
            color="default"
            size="sm"
            isIconOnly
            onClick={onOpenRename}
          >
            <RiEditLine size={16} />
          </Button>
        )}
        {permissions.download && (
          <Button
            className="opacity-0 transition duration-200 group-hover:opacity-65"
            variant="light"
            radius="full"
            color="default"
            size="sm"
            isIconOnly
            onClick={handleDownload}
          >
            <RiDownloadLine size={16} />
          </Button>
        )}
        <Button
          className="opacity-0 transition duration-200 group-hover:opacity-65"
          variant="light"
          radius="full"
          color="default"
          size="sm"
          isIconOnly
          onClick={onToggleStar}
          disabled={togglingStar}
        >
          <RiStarFill
            size={16}
            className={cn({
              'text-warning': page.page_star,
            })}
          />
        </Button>
      </div>
    </PopperCard>
  )
}
