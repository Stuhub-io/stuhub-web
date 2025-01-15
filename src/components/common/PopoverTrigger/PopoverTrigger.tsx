import callAllHandlers, { cn } from '@/libs/utils'
import { PopoverProps } from '@nextui-org/react'
import { Children, cloneElement, ReactElement, useState } from 'react'
import { PopoverWithAnchor } from '../PopoverWithAnchor/PopoverWithAnchor'

export const PopperContentTrigger = ({
  children,
  hasPadding,
  placement = 'bottom',
  ...rest
}: {
  children: React.ReactNode
  hasPadding?: boolean
} & PopoverProps) => {
  if (Children.count(children) !== 2) throw Error('PopoverTrigger must have exactly 2 children')
  const trigger = Children.toArray(children)[0] as ReactElement
  const poper = Children.toArray(children)[1] as ReactElement

  const [anchorEl, setAnchorEl] = useState<HTMLElement>()

  const onClose = () => {
    setAnchorEl(undefined)
  }

  const poperContent = cloneElement(poper, {
    ...poper.props,
    onClose: callAllHandlers(poper.props.onClose, onClose),
  })

  const popoverTrigger = cloneElement(trigger, {
    ...trigger.props,
    onClick: callAllHandlers(trigger.props.onClick, (e: any) => {
      setAnchorEl(e.currentTarget)
    }),
  })

  return (
    <>
      {popoverTrigger}
      <PopoverWithAnchor
        anchorEl={anchorEl}
        onClose={onClose}
        placement={placement}
        classNames={{
          content: cn({
            'p-0': !hasPadding,
          }),
        }}
        {...rest}
      >
        {poperContent}
      </PopoverWithAnchor>
    </>
  )
}
