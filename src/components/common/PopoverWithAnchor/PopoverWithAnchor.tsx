import { Popover, PopoverContent, PopoverProps, PopoverTrigger } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { useThrottledCallback } from 'use-debounce'

export interface PopoverWithAnchorProps extends Omit<PopoverProps, 'children'> {
  anchorEl?: HTMLElement
  onClose?: () => void
  children: React.ReactNode
}

export const PopoverWithAnchor = ({
  anchorEl,
  onClose,
  children,
  placement,
  ...rest
}: PopoverWithAnchorProps) => {
  const isOpen = Boolean(anchorEl)

  const [triggerRerender, setTriggerRerender] = useState(0)

  const rect = useMemo(() => {
    if (!anchorEl)
      return {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      }
    return anchorEl.getBoundingClientRect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl, triggerRerender])

  const handleResize = useThrottledCallback(
    () => {
      setTriggerRerender((prev) => (prev + 1) % 2)
    },
    300,
    {
      trailing: true,
    },
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <Popover isOpen={isOpen} onClose={onClose} placement={placement} {...rest}>
      <PopoverTrigger>
        <div
          style={{
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            transition: 'ease-in-out',
            animationDuration: '0.3s',
          }}
        />
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
