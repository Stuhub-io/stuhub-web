'use client'

import { cn } from '@/libs/utils'
import { Divider } from '@nextui-org/react'
import { ReactNode } from 'react'

export interface SideBarProps {
  className?: string
  bodySection?: ReactNode
  toolSection?: ReactNode
  headerSection?: ReactNode
  footerSection?: ReactNode
}

export const SideBar = (props: SideBarProps) => {
  const { className,headerSection , bodySection, toolSection, footerSection  } = props

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
        {headerSection}
      </div>
      <div className="w-full space-y-1 pb-2">
        {toolSection}
      </div>
      <Divider />
      <div className="space-y-1 overflow-y-auto pb-4 pt-4 hide-scrollbar">
        {bodySection}
      </div>
      <div className="flex-1" />
      <Divider />
      {footerSection}
    </div>
  )
}
