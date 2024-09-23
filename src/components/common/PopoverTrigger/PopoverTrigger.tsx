import callAllHandlers from '@/libs/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Children, cloneElement, ReactElement, useState } from 'react'

export const PoperContentTrigger = ({ children }: { children: React.ReactNode }) => {
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
    <Popover isOpen={open} onOpenChange={setIsOpen} placement="bottom">
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{poperContent}</PopoverContent>
    </Popover>
  )
}
