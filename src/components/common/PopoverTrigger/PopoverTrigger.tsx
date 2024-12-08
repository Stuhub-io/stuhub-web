import callAllHandlers, { cn } from '@/libs/utils'
import { Popover, PopoverContent, PopoverProps, PopoverTrigger } from '@nextui-org/react'
import { Children, cloneElement, ReactElement, useState } from 'react'

export const PopperContentTrigger = ({
  children,
  hasPadding,
  ...rest
}: {
  children: React.ReactNode
  hasPadding?: boolean
} & PopoverProps) => {
  if (Children.count(children) !== 2) throw Error('PopoverTrigger must have exactly 2 children')
  const trigger = Children.toArray(children)[0] as ReactElement
  const poper = Children.toArray(children)[1] as ReactElement
  const [open, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const poperContent = cloneElement(poper, {
    ...poper.props,
    onClose: callAllHandlers(poper.props.onClose, onClose),
  })

  return (
    <Popover
      isOpen={open}
      onOpenChange={setIsOpen}
      placement="bottom"
      {...rest}
      classNames={{
        content: cn({
          'p-0': !hasPadding,
        }),
      }}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        {poperContent}
      </PopoverContent>
    </Popover>
  )
}
