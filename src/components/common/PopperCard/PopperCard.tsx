import { Tooltip } from '@nextui-org/react'
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'

interface PopperCardProps {
  isOpen?: boolean
  onClose?: () => void
  renderContent: (setAnchorEl: (el: HTMLElement | null) => void) => ReactNode
}

export const PopperCard = (props: PropsWithChildren<PopperCardProps>) => {
  const { isOpen, renderContent, children, onClose } = props
  const [contentRef, setContentRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const handleOutSideClick: EventListener = (event) => {
      if (!contentRef?.contains(event.target as Node)) {
        onClose?.()
      }
    }
    window.addEventListener('mousedown', handleOutSideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick)
    }
  }, [contentRef, onClose])

  return (
    <Tooltip
      isOpen={isOpen}
      content={renderContent(setContentRef)}
      autoFocus={false}
      classNames={{
        content: 'p-0 bg-transparent border-none',
      }}
    >
      {children}
    </Tooltip>
  )
}
