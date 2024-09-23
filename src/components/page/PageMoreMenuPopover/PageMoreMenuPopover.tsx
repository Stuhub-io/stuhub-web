import { Listbox, ListboxItem } from '@nextui-org/react'
import {
  RiArrowRightUpLine,
  RiDeleteBinFill,
  RiEditBoxFill,
  RiFileCopyFill,
  RiLink,
  RiNewsFill,
  RiStarFill,
} from 'react-icons/ri'

interface PageMoreMenuPopoverContentProps {
  onClose?: () => void
}

export const PageMoreMenuPopoverContent = (props: PageMoreMenuPopoverContentProps) => {
  const { onClose } = props
  return (
    <Listbox
      onAction={() => {
        onClose?.()
      }}
      classNames={{
        list: 'min-w-[240px]',
      }}
    >
      <ListboxItem key="star" startContent={<RiStarFill size={16} />} showDivider>
        Add to Favorites
      </ListboxItem>
      <ListboxItem key="star" startContent={<RiLink size={16} />}>
        Copy link
      </ListboxItem>
      <ListboxItem key="star" startContent={<RiFileCopyFill size={16} />}>
        Duplicate
      </ListboxItem>
      <ListboxItem key="star" startContent={<RiEditBoxFill size={16} />}>
        Rename
      </ListboxItem>
      <ListboxItem key="star" startContent={<RiArrowRightUpLine size={16} />} showDivider>
        Move to
      </ListboxItem>
      <ListboxItem key="star" startContent={<RiDeleteBinFill size={16} />}>
        Move to Trash
      </ListboxItem>
      <ListboxItem key="star" startContent={<RiNewsFill size={16} />}>
        Open in new tab
      </ListboxItem>
    </Listbox>
  )
}
