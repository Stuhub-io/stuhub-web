import { cn } from '@/libs/utils'

export const SidebarItemLeftSpacer = ({
  level = 0,
  size = 'sm',
}: {
  level: number
  size?: 'sm' | 'xs'
}) => {
  if (level === 0) return null
  return (
    <span
      className={cn('shrink-0', {
        'h-6': size === 'sm',
        'h-5': size === 'xs',
      })}
      style={{
        width: size === 'sm' ? `${level * 16}px` : `${level * 12}px`,
      }}
    />
  )
}
