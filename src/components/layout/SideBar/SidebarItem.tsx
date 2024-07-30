import { cn } from '@/libs/utils'
import { Button, ButtonProps } from '@nextui-org/react'
import { ComponentRef, forwardRef } from 'react'

export type SidebarItemProps = ButtonProps

export const SidebarItem = forwardRef<ComponentRef<'button'>, SidebarItemProps>((props, ref) => {
  const { children, variant = 'light', color, size = 'md', className, ...rest } = props

  return (
    <Button
      ref={ref}
      disableRipple
      size={size}
      fullWidth
      variant={variant}
      className={cn('justify-start truncate px-2 py-1 text-small', className)}
      color={color}
      {...rest}
    >
      <span className="flex-1 truncate text-left">{children}</span>
    </Button>
  )
})

SidebarItem.displayName = 'SidebarItem'
