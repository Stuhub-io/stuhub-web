import { cn } from '@/libs/utils'
import { Skeleton, SkeletonProps } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'

export interface SidebarItemSkeletonProps extends SkeletonProps {
  hasIcon?: boolean
  delay?: number
  size?: 'md' | 'sm'
}
export const SidebarItemSkeleton = ({
  className,
  hasIcon,
  delay = 0,
  size = 'md',
  ...props
}: SidebarItemSkeletonProps) => {
  const [show, setShow] = useState(delay === 0)
  const width = useRef(Math.random() * 300)

  useEffect(() => {
    if (delay) {
      const timerId = setTimeout(() => {
        setShow(true)
      }, delay)
      return () => {
        clearTimeout(timerId)
      }
    }
  }, [delay])

  return (
    <div
      className={cn('flex h-6 items-center gap-2 px-2 py-1 transition-all duration-250', {
        'h-6 opacity-100': show && size === 'md',
        'h-0 opacity-0': !show,
        'h-5 opacity-100': show && size === 'sm',
      })}
      style={{
        width: width.current < 150 ? 100 : width.current,
      }}
    >
      {hasIcon && <Skeleton className={cn('flex-shrink-0 rounded-sm', {
        'h-5 w-5': size === 'md',
        'h-4 w-4': size === 'sm'
      })} />}
      <Skeleton className={cn('h-3 w-full rounded-small', className)} {...props} />
    </div>
  )
}
