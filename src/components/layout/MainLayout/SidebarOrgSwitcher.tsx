import { ProfileBadge } from '@/components/common/ProfileBadge'
import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { RiCheckLine, RiExpandUpDownLine, RiLogoutBoxLine, RiMoreLine } from 'react-icons/ri'
import { LuSettings } from 'react-icons/lu'
import { PiUserCirclePlusDuotone } from 'react-icons/pi'
import { SidebarItem, SidebarIconButton } from '@/components/common/Sidebar'
import { signOut } from 'next-auth/react'
import { useRef } from 'react'
import { useAuthContext } from '@/components/auth/AuthGuard'

type SidebarOrgSwitcherProps = {
  openInviteMembers: () => void
  openAccountSettings: () => void
}

export const SidebarOrgSwitcher = ({
  openInviteMembers,
  openAccountSettings,
}: SidebarOrgSwitcherProps) => {
  const { user } = useAuthContext()

  const { organization, isLoadingOrganization } = useOrganization()

  const triggerRef = useRef<HTMLElement>(null)

  return (
    <>
      <Popover placement="bottom" radius="sm" triggerRef={triggerRef}>
        <PopoverTrigger disabled={isLoadingOrganization}>
          <ProfileBadge
            isLoading={isLoadingOrganization}
            disableRipple
            fullWidth
            variant="flat"
            firstName={organization?.name}
            avatar={organization?.avatar}
            description={`${organization?.members.length} members`}
            rightEl={<RiExpandUpDownLine size={16} />}
          />
        </PopoverTrigger>
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
          <div className="flex w-full items-start gap-2">
            <Button
              size="sm"
              variant="ghost"
              startContent={<LuSettings size={14} />}
              className="border-1"
              onClick={() => {
                triggerRef.current?.click()
                openAccountSettings()
              }}
            >
              Settings
            </Button>
            <Button
              size="sm"
              variant="ghost"
              startContent={<PiUserCirclePlusDuotone size={14} />}
              className="border-1"
              onClick={() => {
                triggerRef.current?.click()
                openInviteMembers()
              }}
            >
              Invite members
            </Button>
          </div>
          <div className="w-[calc(100%+24px)] space-y-1 bg-content2 px-3 py-2">
            <div className="flex items-center justify-between">
              <Typography level="p6" className="truncate">
                {user?.email}
              </Typography>
              <SidebarIconButton>
                <RiMoreLine />
              </SidebarIconButton>
            </div>
            <ProfileBadge
              size="sm"
              variant="light"
              fullWidth
              disableRipple
              firstName={organization?.name}
              description={`${organization?.members.length} members`}
              rightEl={<RiCheckLine size={16} />}
            />
          </div>
          <div className="w-full space-y-1">
            <SidebarItem
              onClick={() => {
                signOut({ redirect: false })
              }}
              color="danger"
              startContent={
                <SidebarIconButton>
                  <RiLogoutBoxLine />
                </SidebarIconButton>
              }
            >
              Logout
            </SidebarItem>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
