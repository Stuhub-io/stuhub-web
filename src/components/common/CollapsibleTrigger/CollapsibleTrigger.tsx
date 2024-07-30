import callAllHandlers from '@/libs/utils'
import React, { useState } from 'react'

interface CollapseTriggerProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

// First element should be a trigger (button, link, etc...)
// Second element should be a component that accepts isOpen and onClose props
// This component will automatically inject useDisclosureProps into the trigger and the dialog
// While this component is save line of code, it could make the code unclear
export const CollapseTrigger = (props: CollapseTriggerProps) => {
  const { children, open, onOpenChange, defaultOpen = false } = props
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

  // Ensure that there are exactly two children
  // Ensure children is an array and contains exactly two elements
  const childrenArray = React.Children.toArray(children)
  if (childrenArray.length === 1) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }
  if (childrenArray.length !== 2) {
    throw new Error('CollapseTrigger expects exactly two children: a trigger and a content.')
  }

  // Assign the first child as the trigger and the second as the dialog
  const trigger = React.Children.toArray(children)[0] as React.ReactElement
  const dialog = React.Children.toArray(children)[1] as React.ReactElement

  const isOpen = open !== undefined ? open : internalOpen

  const handleOpen = () => {
    onOpenChange?.(true)
    setInternalOpen(true)
  }

  const handleClose = () => {
    onOpenChange?.(false)
    setInternalOpen(false)
  }

  const handleOpenChange = () => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }

  const { onClick: triggerOnClick, ...triggerProps } = trigger.props
  // Clone the trigger element and pass the onOpen function
  const triggerWithProps = React.cloneElement(trigger, {
    onClick: callAllHandlers(handleOpenChange, triggerOnClick),
    ...triggerProps,
  })

  // Clone the dialog element and pass the onClose function and isOpen state.
  const dialogWithProps = React.cloneElement(dialog, {
    ...dialog.props,
    isOpen,
    onClose: handleClose,
  })

  return (
    <>
      {triggerWithProps}
      {dialogWithProps}
    </>
  )
}
