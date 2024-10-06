import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { LinkEditorPanel } from '../../LinkMenu/LinkMenu'
import { RiLink } from 'react-icons/ri'

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <RiLink size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <LinkEditorPanel onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  )
}
