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
import {
  RiArrowRightUpLine,
  RiDeleteBinLine,
  RiLink,
  RiMore2Fill,
  RiShareFill,
  RiStarLine,
} from 'react-icons/ri'

export const HeaderMoreMenu = () => {
  return (
    <div className="flex items-center gap-3">
      <Button size='sm' variant="light" isIconOnly>
        <RiShareFill size={20}/>
      </Button>
      <Button size="sm" variant="light" isIconOnly>
        <RiStarLine size={20} />
      </Button>
      <HeaderMoreMenuContent
        triggerRender={
          <Button isIconOnly size="sm" variant="flat">
            <RiMore2Fill size={20} />
          </Button>
        }
      />
    </div>
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
          <ListboxItem key="edit" startContent={<RiDeleteBinLine />} color="danger">
            Move to trash
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}
