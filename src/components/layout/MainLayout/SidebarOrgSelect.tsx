import { useAuthContext } from '@/components/auth/AuthGuard'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import { SidebarIconButton } from '@/components/common/Sidebar'
import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import { usePermissions } from '@/components/providers/permissions'
import { getRoleColor, getUserOrgPermission, getUserOrgRoleDisplay } from '@/utils/organization'
import { Avatar, Button, Chip, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useMemo } from 'react'
import { LuSettings } from 'react-icons/lu'
import { PiUserCirclePlusDuotone } from 'react-icons/pi'
import { RiMoreLine } from 'react-icons/ri'
import _ from 'lodash'

export const SidebarOrgSelect = () => {
  const { organization, currentUserRole, organizations, isGuest, changeOrganization } = useOrganization()
  const { user } = useAuthContext()
  const { permissionChecker } = usePermissions()

  const orgPermissions = useMemo(
    () => ({
      view: permissionChecker.org.setting.view(currentUserRole),
      invite: permissionChecker.org.setting.edit(currentUserRole),
    }),
    [currentUserRole, permissionChecker.org.setting],
  )

  return (
    <Popover placement="bottom-start">
      <div className="group flex cursor-pointer select-none items-center justify-between gap-2 rounded-large bg-default-100 px-2 py-1">
        <div className="group-hover:hidden">
          <Avatar
            src={organization?.avatar}
            classNames={{
              base: 'uppercase',
            }}
            className="shrink-0"
            size="sm"
          />
        </div>
        <div className="hidden group-hover:flex">
          <PopoverTrigger>
            <Button size="sm" isIconOnly radius="full">
              <RiMoreLine size={20} />
            </Button>
          </PopoverTrigger>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Typography level="p5" noWrap className="truncate">
            {organization?.name || 'Untitled Organization'}
          </Typography>
          <Typography level="p6" color="textTertiary" noWrap>
            {organization?.members.length} members
          </Typography>
        </div>
        <Chip size="sm">{getUserOrgRoleDisplay(currentUserRole ?? 'guest')}</Chip>
      </div>
      <PopoverContent className="w-[270px] gap-3 px-3 py-2">
        <div className="flex w-full items-center gap-3 text-text-tertiary">
          <Avatar src={organization?.avatar} radius="sm" />
          <div>
            <Typography level="p4" className="flex-1 truncate">
              {organization?.name}
            </Typography>
            <div className="mt-[-5px]">
              <Typography
                level="p6"
                color="textTertiary"
              >{`${organization?.members.length} members`}</Typography>
            </div>
          </div>
        </div>
        {_.every([orgPermissions.view, orgPermissions.invite]) && (
          <div className="flex w-full items-start gap-2">
            {orgPermissions.view && (
              <Button
                size="sm"
                variant="ghost"
                startContent={<LuSettings size={14} />}
                className="border-1"
              >
                Settings
              </Button>
            )}
            {orgPermissions.invite && (
              <Button
                size="sm"
                variant="ghost"
                startContent={<PiUserCirclePlusDuotone size={14} />}
                className="border-1"
                onClick={() => {}}
              >
                Invite members
              </Button>
            )}
          </div>
        )}
        <div className="w-[calc(100%+24px)] space-y-1 bg-default-100 px-3 py-2">
          <div className="flex items-center justify-between">
            <Typography level="p6" className="truncate">
              {user?.email}
            </Typography>
            <SidebarIconButton>
              <RiMoreLine />
            </SidebarIconButton>
          </div>
          {isGuest && (
            <ProfileBadge
              size="sm"
              className="bg-default-200"
              variant="light"
              fullWidth
              disableRipple
              firstName={organization?.name}
              description={`${organization?.members.length} members`}
              rightEl={
                <Chip size="sm" color={getRoleColor('guest')}>
                  Guest
                </Chip>
              }
            />
          )}
          {organizations?.map((joinedOrg) => {
            const role = getUserOrgPermission(joinedOrg, user?.pkid ?? -1) ?? 'guest'
            return (
              <ProfileBadge
                key={joinedOrg.id}
                onClick={() => changeOrganization?.(joinedOrg)}
                size="sm"
                variant="light"
                fullWidth
                disableRipple
                firstName={joinedOrg?.name || 'Untitled'}
                description={`${joinedOrg?.members.length} members`}
                rightEl={
                  <Chip size="sm" color={getRoleColor(role)}>
                    {getUserOrgRoleDisplay(role)}
                  </Chip>
                }
              />
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
