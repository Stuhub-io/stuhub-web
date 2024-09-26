import { cn } from '@/libs/utils'
import { Button, ButtonProps } from '@nextui-org/react'
import { ComponentRef, forwardRef, PropsWithChildren } from 'react'

export type SidebarItemProps = Omit<ButtonProps, 'size'> & {
  isSelected?: boolean
  size?: 'lg' | 'md' | 'sm' | 'xs'
}

export const SidebarItem = forwardRef<ComponentRef<'button'>, SidebarItemProps>((props, ref) => {
  const { children, variant = 'light', color, size = 'sm', isSelected, className, ...rest } = props

  return (
    <Button
      ref={ref}
      disableRipple
      size={size !== 'xs' ? size : 'sm'}
      fullWidth
      variant={variant}
      className={cn(
        'justify-start truncate px-2 py-1 !text-small text-text-tertiary transition-all hover:text-text-secondary',
        {
          'bg-default/40': isSelected,
          'h-7': size === 'xs',
        },
        className,
      )}
      color={color}
      {...rest}
    >
      <span className="flex-1 truncate text-left">{children}</span>
    </Button>
  )
})

SidebarItem.displayName = 'SidebarItem'

export const SidebarSection = forwardRef<ComponentRef<'section'>, PropsWithChildren>(
  (props, ref) => {
    return (
      <section ref={ref} className="pl-1 text-tiny text-foreground-500">
        {props.children}
      </section>
    )
  },
)

SidebarSection.displayName = 'SidebarSection'
