import { cn } from '@/libs/utils'
import { Repeated } from '../Repeated/Repeated'

export const SidebarItemLeftSpacer = ({
  level = 0,
  size = 'sm',
}: {
  level: number
  size?: 'sm' | 'xs'
}) => {
  if (level === 0) return null
  return (
    <div
      className={cn('flex shrink-0 justify-center', {
        'h-6': size === 'sm',
        'h-5': size === 'xs',
      })}
    >
      <Repeated as={Spacer} times={level} size={size === 'sm' ? 16 : 12} />
    </div>
  )
}

const Spacer = ({ size }: { size: number }) => {
  return (
    <div className="-my-2 flex h-auto shrink-0 justify-center" style={{ width: size }}/>
  )
}
