import { cn } from '@/libs/utils'
import { Skeleton, SkeletonProps } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface Props extends SkeletonProps {
  delay?: number
}

export const LazySkeleton = (props: Props) => {
  const { delay = 10, className, ...restProps } = props
  const [show, setShow] = useState(delay === 0)

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
    <Skeleton
      {...restProps}
      className={cn(
        '!transition-all',
        {
          'opacity-100': show,
          'opacity-0': !show,
        },
        className,
      )}
    />
  )
}
