import { Page, PageRoleEnum, PageViewTypeEnum } from '@/schema/page'
import { PageIconPreview } from '../../PageListView/PageIconPreview'
import Typography from '@/components/common/Typography'
import { useFetchPagePermissionRoles } from '@/mutation/querier/page/useFetchPagePermissionRoles'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Button, Divider, Tooltip } from '@nextui-org/react'
import { getUserFullName } from '@/utils/user'
import { useSharePageContext } from '@/components/providers/share'
import { RiEarthFill } from 'react-icons/ri'
import { usePermissions } from '@/components/providers/permissions'
import { ReactNode, useCallback, useMemo } from 'react'
import { getFileTypeLabel, getMenuLabelPageViewType } from '@/utils/page'
import { useFetchPageByPkID } from '@/mutation/querier/page/useFetchPageByPkID'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import dayjs from 'dayjs'
import { formatReadableExtension, formatReadableFileSize, isImageExtension, isVideoExtension } from '@/utils/file'

interface PageDrawerInfoSectionProps {
  page: Page
}

export const PageDrawerInfoSection = (props: PageDrawerInfoSectionProps) => {
  const { page } = props
  const author = page.author

  const { onOpenShareModal } = useSharePageContext()
  const { permissionChecker } = usePermissions()
  const router = useRouter()
  const { organization } = useOrganization()

  const { data: { data: pageRoles } = {} } = useFetchPagePermissionRoles({
    pagePkID: page.pkid ?? -1,
    allowFetch: Boolean(page),
  })

  const { data: { data: parentPage } = {} } = useFetchPageByPkID({
    pagePkID: page.parent_page_pkid ?? -1,
    allowFetch: Boolean(page.parent_page_pkid),
  })

  const onManageAccess = () => {
    onOpenShareModal(page)
  }

  const isEnableGeneralRole = page.general_role !== PageRoleEnum.RESTRICTED
  const isShared = Boolean(pageRoles?.length)
  const hasViewPermission = permissionChecker.page.canShare(page)

  const handleParentPageClick = useCallback(() => {
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: parentPage?.id ?? '',
      }),
    )
  }, [organization?.slug, parentPage?.id, router])

  const items = useMemo(
    () => generateInfoItems({ page, parentPage, onLocationClick: handleParentPageClick }),
    [handleParentPageClick, page, parentPage],
  )

  return (
    <div className="-mx-4 h-full flex-col items-stretch overflow-y-auto px-4 pt-4 no-scrollbar">
      <PageIconPreview size={160} page={page} isFullWidth />
      <div className="space-y-3 pt-4">
        <Typography level="p4">Who has access</Typography>
        {!hasViewPermission && (
          <Typography component="p" level="p6" fontWeight="md" color="textTertiary" className="">
            You do not have permission to view sharing information for this item
          </Typography>
        )}
        {hasViewPermission && (
          <>
            <div className="flex flex-wrap gap-2">
              <UserAvatar {...author} size="sm" className="shrink-0" />
              {(isShared || isEnableGeneralRole) && (
                <div className="h-[32px] py-1.5">
                  <Divider orientation="vertical" />
                </div>
              )}
              {isEnableGeneralRole && (
                <Tooltip content="Everyone with the link">
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-default-200 text-primary">
                    <RiEarthFill />
                  </div>
                </Tooltip>
              )}
              {pageRoles?.map((p) => (
                <Tooltip
                  content={getUserFullName({
                    firstName: p.user?.first_name,
                    lastName: p.user?.last_name,
                    email: p.email,
                  })}
                  key={p.pkid}
                >
                  <div onClick={onManageAccess} className="cursor-pointer">
                    <UserAvatar {...(p.user ?? {})} size="sm" />
                  </div>
                </Tooltip>
              ))}
            </div>
            <Typography level="p6" fontWeight="md" color="textTertiary" className="line-clamp-2">
              Owned by{' '}
              {getUserFullName({
                firstName: author?.first_name,
                lastName: author?.last_name,
                email: author?.email,
              })}
            </Typography>
            <Button variant="solid" size="sm" radius="full" onClick={onManageAccess}>
              Manage Access
            </Button>
          </>
        )}
      </div>
      <div className="-mx-4 mt-4 border-t border-t-divider px-4 py-4">
        <Typography level="p4">{getMenuLabelPageViewType(page.view_type)} details</Typography>
        <div className="mt-3 space-y-5">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <Typography level="p6" color="textSecondary">
                {item.label}
              </Typography>
              {typeof item.content === 'string' ? (
                <Typography level="p5" color="textTertiary">
                  {item.content}
                </Typography>
              ) : (
                item.content
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type InfoItem = {
  label?: string
  content?: ReactNode
}

interface GenerateInfoItemArgs {
  page?: Page
  parentPage?: Page
  onLocationClick?: () => void
}

const generateInfoItems = ({ page, parentPage, onLocationClick }: GenerateInfoItemArgs): InfoItem[] => {
  const itemMap: { [key: string]: ReactNode } = {
    Type: getFileTypeLabel(page),
    Size: null,
    Extension: null,
    'Storage used': null,
    Location: parentPage ? (
      <Button
        size="sm"
        className="mt-1 w-fit"
        startContent={<PageIconPreview className="-mx-2 -my-2 bg-transparent" size={26} page={parentPage} />}
        onClick={onLocationClick}
        variant="solid"
      >
        {parentPage.name || 'Untitled'}
      </Button>
    ) : null,
    Dimensions: null,
    Owner: page?.author
      ? getUserFullName({
          firstName: page.author.first_name,
          lastName: page.author.last_name,
          email: page.author.email,
        })
      : 'No owner',
    Modified: page ? dayjs(page.updated_at).format('MMM DD, YYYY') : null,
    Opended: null,
    Created: page ? dayjs(page.created_at).format('MMM DD, YYYY') : null,
  }
  switch (page?.view_type) {
    case PageViewTypeEnum.ASSET:
      itemMap.Size = formatReadableFileSize(page.asset?.size ?? 0)
      itemMap.Extenstion = formatReadableExtension(page.asset?.extension ?? '')
      if (isImageExtension(page.asset?.extension)) {
        itemMap.Demensions = "_"
      }
      if (isVideoExtension(page.asset?.extension)) {
        itemMap.Demensions = "_"
      }
    //NOTE: Handle More case here
  }
  return Object.entries(itemMap).map(([label, content]) => ({
    label,
    content,
  })).filter(item => item.content !== null)
}
