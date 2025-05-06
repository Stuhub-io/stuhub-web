import { Page, PageRoleEnum } from '@/schema/page'
import { PageIconPreview } from '../../PageListView/PageIconPreview'
import Typography from '@/components/common/Typography'
import { useFetchPagePermissionRoles } from '@/mutation/querier/page/useFetchPagePermissionRoles'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Button, Divider, Tooltip } from '@nextui-org/react'
import { getUserFullName } from '@/utils/user'
import { useSharePageContext } from '@/components/providers/share'
import { RiEarthFill } from 'react-icons/ri'
import { usePermissions } from '@/components/providers/permissions'

interface PageDrawerInfoSectionProps {
  page: Page
}

export const PageDrawerInfoSection = (props: PageDrawerInfoSectionProps) => {
  const { page } = props
  const author = page.author

  const { onOpenShareModal } = useSharePageContext()
  const { permissionChecker } = usePermissions()

  const { data: { data: pageRoles } = {} } = useFetchPagePermissionRoles({
    pagePkID: page.pkid ?? -1,
    allowFetch: Boolean(page),
  })

  const onManageAccess = () => {
    onOpenShareModal(page)
  }

  const isEnableGeneralRole = page.general_role !== PageRoleEnum.RESTRICTED
  const isShared = Boolean(pageRoles?.length)
  const hasViewPermission = permissionChecker.page.canShare(page)

  return (
    <div className="-mx-4 h-full flex-col items-stretch overflow-y-auto px-4">
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
    </div>
  )
}
