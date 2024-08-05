import { cn } from '@/libs/utils'

export const SidebarItemLeftSpacer = ({ level = 0 }: { level: number }) => {
  if (level === 0) return null
  return (
    <span
      className={cn('h-6 shrink-0')}
      style={{
        width: `${level * 16}px`,
      }}
    />
  )
}
