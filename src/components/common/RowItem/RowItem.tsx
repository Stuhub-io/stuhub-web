import { ReactNode, useMemo } from 'react'
import Typography from '../Typography'
import { getPrimaryTypoLevelBySize, getSecondaryTypoLevelBySize } from '@/utils/typography'
import { cn } from '@/libs/utils'

interface RowItemProps {
  classNames?: {
    body?: string
    title?: string
    description?: string
    wrapper?: string
  }
  className?: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  description?: ReactNode
  title?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const RowItem = (props: RowItemProps) => {
  const { startContent, endContent, title, size = 'md', description = '', className, classNames } = props

  const titleLevel = useMemo(() => getPrimaryTypoLevelBySize(size), [size])

  const descriptionLevel = useMemo(() => getSecondaryTypoLevelBySize(size), [size])

  const titleRender =
    title && typeof title === 'string' ? (
      <Typography noWrap className={cn('!mb-0 truncate', classNames?.title)} level={titleLevel}>
        {title}
      </Typography>
    ) : (
      title
    )

  const descriptionRender =
    description && typeof description === 'string' ? (
      <Typography
        noWrap
        className={cn('truncate', classNames?.description)}
        level={descriptionLevel}
        color="textTertiary"
      >
        {description}
      </Typography>
    ) : (
      description
    )

  return (
    <div className={cn('flex flex-row items-center gap-2', className, classNames?.wrapper)} role="wrapper">
      {startContent}
      <div
        className={cn(
          'flex-1 flex-col overflow-hidden pr-2 text-left',
          {
            'leading-3': size === 'sm',
            'leading-4': size === 'md' || size === 'lg',
          },
          classNames?.title,
        )}
        role="body"
      >
        {titleRender}
        {descriptionRender}
      </div>
      {endContent}
    </div>
  )
}
