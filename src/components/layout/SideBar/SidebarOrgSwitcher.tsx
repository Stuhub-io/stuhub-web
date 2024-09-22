import { ProfileBadge } from '@/components/common/ProfileBadge'
import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { RiCheckLine, RiExpandUpDownLine, RiLogoutBoxLine, RiMoreLine } from 'react-icons/ri'
import { LuSettings } from 'react-icons/lu'
import { PiUserCirclePlusDuotone } from 'react-icons/pi'
import { SidebarIconButton } from './SidebarIconbutton'
import { SidebarItem } from './SidebarItem'
import { signOut, useSession } from 'next-auth/react'
import { useRef } from 'react'

type SidebarOrgSwitcherProps = {
  openInviteMembers: () => void
}

export const SidebarOrgSwitcher = ({ openInviteMembers }: SidebarOrgSwitcherProps) => {
  const { data } = useSession()

  const { organization } = useOrganization()

  const triggerRef = useRef<HTMLElement>(null)

  return (
    <Popover placement="bottom" radius="sm" triggerRef={triggerRef}>
      <PopoverTrigger>
        <ProfileBadge
          disableRipple
          fullWidth
          variant="flat"
          firstName={organization?.name}
          avatar={organization?.avatar}
          description={`${organization?.members.length} members`}
          rightEl={<RiExpandUpDownLine size={16} />}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[270px] gap-3 py-2 px-3">
        <div className="flex w-full items-center gap-3 text-text-tertiary">
          <Avatar
            src={organization?.avatar}
            radius="sm"
          />
          <div>
            <Typography level="h6" className="flex-1 truncate">
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
        <div className="space-y-1 bg-content2 w-[calc(100%+24px)] px-3 py-2">
          <div className="flex items-center justify-between">
            <Typography level="p6" className="truncate">
              {data?.user.email}
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
  )
}
