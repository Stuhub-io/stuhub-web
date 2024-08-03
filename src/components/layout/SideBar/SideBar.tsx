'use client'
import { cn } from '@/libs/utils'
import { RiAddLine, RiArrowDownSLine, RiFile2Fill, RiFile2Line, RiMoreFill } from 'react-icons/ri'
import { SidebarIconButton } from './SidebarIconbutton'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/Collapsible'
import { SidebarItemLeftSpacer } from './SidebarItemLeftSpacer'
import { SidebarItem, SidebarSection } from './SidebarItem'
import { SidebarOrgSwitcher } from './SidebarOrgSwitcher'
import {
  AiFillHome,
  AiFillMail,
  AiFillMessage,
  AiFillMoon,
  AiFillSetting,
  AiFillSun,
  AiOutlineSearch,
  AiOutlineTeam,
} from 'react-icons/ai'
import { Card, CardHeader, CardBody, CardFooter, Button, Divider, Kbd } from '@nextui-org/react'
import { useTheme } from '@/hooks/useTheme'
import { LuSparkle } from 'react-icons/lu'
import Typography from '@/components/common/Typography'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import { useSession } from 'next-auth/react'
import { getUserFullName } from '@/utils/user'
import { useOrganization } from '@/components/providers/organization'
import { getPermissionText } from '@/utils/organization'

export const SideBar = () => {
  const { activeTheme, setTheme } = useTheme()
  const { data } = useSession()
  const { currentUserRole } = useOrganization()
  const user = data?.user
  return (
    <div className={cn('h-full w-full', 'border-r border-r-divider', 'flex flex-col p-2')}>
      <div className="mb-2 w-full">
        <SidebarOrgSwitcher />
      </div>
      <div className="w-full space-y-1 pb-2">
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <AiOutlineSearch />
            </SidebarIconButton>
          }
          endContent={
            <Kbd className="text-xs" keys={['command']}>
              K
            </Kbd>
          }
        >
          Search
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <AiFillHome />
            </SidebarIconButton>
          }
          endContent={
            <Kbd className="text-xs" keys={['command', 'shift']}>
              H
            </Kbd>
          }
        >
          Home
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <AiFillMail />
            </SidebarIconButton>
          }
          endContent={
            <Kbd className="text-xs" keys={['command', 'shift']}>
              I
            </Kbd>
          }
        >
          Inboxes
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <AiFillMessage />
            </SidebarIconButton>
          }
        >
          Chats
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <AiFillSetting />
            </SidebarIconButton>
          }
          endContent={
            <Kbd className="text-xs" keys={['command', 'shift']}>
              P
            </Kbd>
          }
        >
          Settings & Members
        </SidebarItem>
        <SidebarItem
          onClick={() => {
            setTheme(activeTheme === 'dark' ? 'light' : 'dark')
          }}
          startContent={
            <SidebarIconButton>
              {activeTheme === 'dark' ? <AiFillMoon size={20} /> : <AiFillSun size={20} />}
            </SidebarIconButton>
          }
          endContent={
            <Kbd className="text-xs" keys={['command', 'shift']}>
              \
            </Kbd>
          }
        >
          Switch Theme
        </SidebarItem>
      </div>
      <Divider />
      <div className="space-y-1 overflow-y-auto pb-4 pt-4">
        <SidebarSection>Files</SidebarSection>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Collapsible key={i}>
            <SidebarItem
              key="item1"
              startContent={
                <>
                  <SidebarIconButton hideOnGroupHover>
                    <RiFile2Line />
                  </SidebarIconButton>
                  <CollapsibleTrigger asChild>
                    <SidebarIconButton
                      showOnGroupHoverOnly
                      className="transition-all data-[state=closed]:-rotate-90"
                    >
                      <RiArrowDownSLine />
                    </SidebarIconButton>
                  </CollapsibleTrigger>
                </>
              }
              endContent={
                <>
                  <SidebarIconButton showOnGroupHoverOnly>
                    <RiMoreFill />
                  </SidebarIconButton>
                  <SidebarIconButton showOnGroupHoverOnly>
                    <RiAddLine />
                  </SidebarIconButton>
                </>
              }
            >
              Item 1
            </SidebarItem>
            <CollapsibleContent asChild>
              <Collapsible>
                <SidebarItem
                  key="item1"
                  startContent={
                    <>
                      <SidebarItemLeftSpacer level={1} />
                      <SidebarIconButton hideOnGroupHover>
                        <RiFile2Fill />
                      </SidebarIconButton>
                      <CollapsibleTrigger asChild>
                        <SidebarIconButton
                          showOnGroupHoverOnly
                          className="transition-all data-[state=closed]:-rotate-90"
                        >
                          <RiArrowDownSLine />
                        </SidebarIconButton>
                      </CollapsibleTrigger>
                    </>
                  }
                  endContent={
                    <>
                      <SidebarIconButton showOnGroupHoverOnly>
                        <RiMoreFill />
                      </SidebarIconButton>
                      <SidebarIconButton showOnGroupHoverOnly>
                        <RiAddLine />
                      </SidebarIconButton>
                    </>
                  }
                >
                  Item 1
                </SidebarItem>
                <CollapsibleContent>
                  <SidebarItem
                    key="item1"
                    startContent={
                      <>
                        <SidebarItemLeftSpacer level={2} />
                        <SidebarIconButton hideOnGroupHover>
                          <RiFile2Fill />
                        </SidebarIconButton>
                        <SidebarIconButton
                          showOnGroupHoverOnly
                          className="data-[state=closed]:-rotate-90"
                        >
                          <RiArrowDownSLine />
                        </SidebarIconButton>
                      </>
                    }
                    endContent={
                      <>
                        <SidebarIconButton showOnGroupHoverOnly>
                          <RiMoreFill />
                        </SidebarIconButton>
                        <SidebarIconButton showOnGroupHoverOnly>
                          <RiAddLine />
                        </SidebarIconButton>
                      </>
                    }
                  >
                    Item 1
                  </SidebarItem>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      <div className="flex-1" />
      <Divider />
      <div className="shrink-0 pt-4">
        <Card shadow="sm" radius="sm">
          <CardHeader className="p-2" />
          <CardBody className="pt-0 text-small">
            <Typography level="p5" color="textSecondary">
              <LuSparkle className="inline-block" /> Get 1 month free and unlock all the features of
              the pro plan.
            </Typography>
          </CardBody>
          <CardFooter className="p-2 pt-0">
            <Button color="primary" fullWidth size="sm">
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-2 flex gap-2">
        <ProfileBadge
          variant="light"
          fullName={
            getUserFullName({
              firstName: user?.first_name,
              lastName: user?.last_name,
            }) || user?.email
          }
          description={getPermissionText(currentUserRole ?? 'other')}
          size="sm"
        />
        <Button isIconOnly variant="flat">
          <AiOutlineTeam />
        </Button>
      </div>
    </div>
  )
}
