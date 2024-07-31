import { forwardRef, type ElementRef } from 'react'
import { cn } from '@/libs/utils'

interface Props {
  children: React.ReactNode
  className?: string
  container?: boolean
}

export const Layout = forwardRef<ElementRef<'div'>, Props>((props, ref) => {
  const { container = true, children, className, ...restProps } = props
  return (
    <div ref={ref} className={cn('', 'h-[100vh]', className ?? '')} {...restProps}>
      <div className="flex h-full w-full flex-col overflow-y-auto backdrop-blur-md">
        <div
          className={cn('flex h-full w-full flex-1 flex-col', {
            container,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  )
})

Layout.displayName = 'Layout'
