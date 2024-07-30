import { ProfileBadge } from '@/components/common/ProfileBadge'
import Typography from '@/components/common/Typography'
import { useOrganization } from '@/components/providers/organization'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { RiCheckLine, RiExpandUpDownLine, RiLogoutBoxLine, RiMoreLine } from 'react-icons/ri'
import { SidebarIconButton } from './SidebarIconbutton'
import { SidebarItem } from './SidebarItem'
import { signOut } from 'next-auth/react'

export const SidebarOrgSwitcher = () => {
  const { organization } = useOrganization()

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <ProfileBadge
          disableRipple
          fullWidth
          variant="flat"
          fullName={organization?.name}
          avatar={organization?.avatar}
          description={`${organization?.members.length} members`}
          rightEl={<RiExpandUpDownLine size={16} />}
        />
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px] space-y-1 py-3">
        <div className="flex w-full text-text-tertiary">
          <Typography level="p5" className="ml-3 flex-1 truncate" color="textTertiary">
            Joined organizations
          </Typography>
          <SidebarIconButton>
            <RiMoreLine />
          </SidebarIconButton>
        </div>
        <div className="w-full space-y-1">
          <ProfileBadge
            variant="light"
            fullWidth
            disableRipple
            fullName={organization?.name}
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
