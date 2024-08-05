'use client'
import { cn } from '@/libs/utils'
import { SidebarOrgSwitcher } from './SidebarOrgSwitcher'
import { Divider } from '@nextui-org/react'
import { SidebarToolItems } from './SidebarToolItems'
import { SidebarFooter } from './SidebarFooterTool'
import { SidebarSpaces } from './space/SidebarSpaces'

export const SideBar = () => {
  return (
    <div className={cn('h-full w-full', 'border-r border-r-divider', 'flex flex-col p-2')}>
      <div className="mb-2 w-full">
        <SidebarOrgSwitcher />
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
