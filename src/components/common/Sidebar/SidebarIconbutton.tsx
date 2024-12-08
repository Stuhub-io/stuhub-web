import { Button, ButtonProps, cn } from '@nextui-org/react'
import { forwardRef, ComponentRef } from 'react'

export const SidebarIconButton = forwardRef<
  ComponentRef<typeof Button>,
  ButtonProps & { showOnGroupHoverOnly?: boolean; hideOnGroupHover?: boolean }
>(
  (
    { children, onClick, hideOnGroupHover, showOnGroupHoverOnly, className, variant = 'light', ...props },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onClick?.(e)
    }
    return (
      <Button
        ref={ref}
        isIconOnly
        size="lg"
        className={cn(
          'h-6 w-6 min-w-0 shrink-0 cursor-pointer !rounded-small text-inherit',
          {
            'hidden group-hover:flex group-focus-visible:flex': showOnGroupHoverOnly,
            'flex group-hover:hidden group-focus-visible:hidden': hideOnGroupHover,
          },
          className,
        )}
        variant={variant}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    )
  },
)

SidebarIconButton.displayName = 'SidebarIconButton'
