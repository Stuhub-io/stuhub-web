'use client'

import { cn } from '@/libs/utils'
import { Divider, useDisclosure } from '@nextui-org/react'
import { InviteMembersModal } from '@/components/modals/InviteMembersModal'
import { SidebarFooter } from './SidebarFooterTool'
import { SidebarOrgSwitcher } from './SidebarOrgSwitcher'
import { SidebarToolItems } from './SidebarToolItems'
import { AccountSettingsModal } from '@/components/modals/AccountSettingsModal'
import { SidebarOrgPages } from './page/SidebarOrgPages'
import { useSidebar } from '@/components/providers/sidebar'
import { SidebarItemSkeleton } from './SidebarItemSkeleton'

export interface SideBarProps {
  className?: string
}

export const SideBar = ({ className }: SideBarProps) => {
  const {
    isOpen: isInviteMembersOpen,
    onOpen: openInviteMembers,
    onClose: closeInviteMembers,
  } = useDisclosure()
  const {
    isOpen: isAccountSettingsOpen,
    onOpen: openAccountSettings,
    onClose: closeAccountSettings,
  } = useDisclosure()

  const { orgPages } = useSidebar()

  return (
    <div
      className={cn(
        'sidebar',
        'h-full w-full',
        'border-r border-r-divider',
        'flex flex-col p-2',
        className,
      )}
    >
      <div className="mb-2 w-full">
        <SidebarOrgSwitcher {...{ openInviteMembers, openAccountSettings }} />
        <InviteMembersModal isOpen={isInviteMembersOpen} onClose={closeInviteMembers} />
        <AccountSettingsModal isOpen={isAccountSettingsOpen} onClose={closeAccountSettings} />
      </div>
      <div className="w-full space-y-1 pb-2">
        <SidebarToolItems />
      </div>
      <Divider />
      <div className="space-y-1 overflow-y-auto pb-4 pt-4">
        {/* Favorites */}
        {orgPages && <SidebarOrgPages />}
        {!orgPages && (
          <>
            <SidebarItemSkeleton className="w-14" />
            <SidebarItemSkeleton hasIcon />
            {[1, 2, 3, 4].map((i) => (
              <SidebarItemSkeleton hasIcon delay={300 + 200 * i} key={i} />
            ))}
          </>
        )}
      </div>
      <div className="flex-1" />
      <Divider />
      <SidebarFooter />
    </div>
  )
}
