import { Avatar } from '@nextui-org/react'
import Typography from '@/components/common/Typography'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

interface ProfileBadgeProps extends ComponentPropsWithoutRef<'button'> {
  avatar?: string
  fullName?: string
}

export const ProfileBadge = forwardRef<ComponentRef<'button'>, ProfileBadgeProps>((props, ref) => {
  const { fullName, avatar } = props
  return (
    <button
      className="flex min-w-36 max-w-48 items-center gap-x-2 rounded-large border-1 border-default bg-background p-1.5 pr-2.5 shadow-sm"
      ref={ref}
    >
      <Avatar size="sm" src={avatar} fallback="NA" className="shrink-0" />
      <Typography noWrap level="p5">
        {fullName}
      </Typography>
    </button>
  )
})

ProfileBadge.displayName = 'ProfileBadge'
