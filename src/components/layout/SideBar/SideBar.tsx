'use client'

import { cn } from '@/libs/utils'
import { Divider, useDisclosure } from '@nextui-org/react'
import { InviteMembersModal } from '@/components/modals/InviteMembersModal'
import { SidebarFooter } from './SidebarFooterTool'
import { SidebarOrgSwitcher } from './SidebarOrgSwitcher'
import { SidebarToolItems } from './SidebarToolItems'
import { SidebarSpaces } from './space/SidebarSpaces'
import { AccountSettingsModal } from '@/components/modals/AccountSettingsModal'

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
        <SidebarSpaces />
      </div>
      <div className="flex-1" />
      <Divider />
      <SidebarFooter />
    </div>
  )
}
