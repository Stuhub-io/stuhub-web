import { forwardRef, type ElementRef } from 'react'
import { cn } from '@/libs/utils'

interface Props {
  children: React.ReactNode
  className?: string
  container?: boolean
  wrapperClassName?: string
}

export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { container = true, children, className, wrapperClassName, ...restProps } = props
  return (
    <div
      role="base"
      ref={ref}
      className={cn('h-[100dvh]', 'w-full', className ?? '')}
      {...restProps}
    >
      <div
        role="wrapper"
        className={cn('h-full overflow-y-auto backdrop-blur-md', wrapperClassName)}
      >
        {container ? <div className="container">{children}</div> : children}
      </div>
    </div>
  )
})

Layout.displayName = 'Layout'
