'use client'

import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { ReactNode } from 'react'
import { RiArrowRightUpLine, RiDeleteBinLine, RiLink, RiMore2Fill } from 'react-icons/ri'

export const HeaderMoreMenu = () => {
  return (
    <HeaderMoreMenuContent
      triggerRender={
        <Button isIconOnly size="sm" variant="flat">
          <RiMore2Fill size={20} />
        </Button>
      }
    />
  )
}

export interface HeaderMoreMenuContentProps {
  triggerRender: ReactNode
}

export const HeaderMoreMenuContent = (props: HeaderMoreMenuContentProps) => {
  const { triggerRender } = props

  return (
    <Popover>
      <PopoverTrigger>{triggerRender}</PopoverTrigger>
      <PopoverContent>
        <Listbox aria-label="Actions" onAction={(key) => alert(key)}>
          <ListboxItem key="copy" startContent={<RiLink />}>
            Copy link
          </ListboxItem>
          <ListboxItem key="move" startContent={<RiArrowRightUpLine />}>
            Move to
          </ListboxItem>
          <ListboxItem key="edit" startContent={<RiDeleteBinLine />}>
            Move to trash
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}
