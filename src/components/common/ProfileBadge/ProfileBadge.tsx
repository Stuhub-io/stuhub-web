import { Avatar, Button, ButtonProps, Skeleton } from '@nextui-org/react'
import Typography from '@/components/common/Typography'
import { ComponentRef, forwardRef, ReactNode, useMemo } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/libs/utils'

interface ProfileBadgeProps extends ButtonProps {
  avatar?: string
  firstName?: string
  lastName?: string
  rightEl?: ReactNode
  description?: string
  isLoading?: boolean
  rightElClassName?: string
}

const profileBadgeCva = cva(['flex justify-start'], {
  variants: {
    size: {
      sm: 'max-w-44 gap-x-1.5 pl-2 py-1.5 pr-2.5 h-10',
      md: 'max-w-48 gap-x-2 pl-2.5 py-2 pr-3 h-12',
      lg: 'max-w-52 gap-x-2.5 pl-3 py-2.5 pr-3.5 h-14',
    },
  },
})

const profileBadgeTextWrapperCva = cva(['overflow-hidden pr-2 text-left flex flex-col flex-1'], {
  variants: {
    size: {
      sm: 'leading-3',
      md: 'leading-4',
      lg: 'leading-4',
    },
  },
})

export const ProfileBadge = forwardRef<ComponentRef<typeof Button>, ProfileBadgeProps>(
  (props, ref) => {
    const {
      firstName,
      lastName,
      avatar,
      className,
      size = 'md',
      rightEl,
      description,
      isLoading,
      rightElClassName,
      ...restProps
    } = props
    const titleLevel = useMemo(() => {
      if (size === 'sm') return 'p6'
      if (size === 'md') return 'p5'
      if (size === 'lg') return 'p4'
    }, [size])

    const descriptionLevel = useMemo(() => {
      if (size === 'sm') return 'p7'
      if (size === 'md') return 'p6'
      if (size === 'lg') return 'p5'
    }, [size])
    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    return (
      <Button
        size={size}
        type="button"
        color="default"
        variant="bordered"
        className={profileBadgeCva({ size, className: cn(className, 'w-full max-w-full') })}
        {...restProps}
        ref={ref}
      >
        <Avatar
          src={avatar}
          fallback={`${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`}
          className="shrink-0"
          size={size === 'lg' ? 'md' : 'sm'}
        />
        <div
          className={profileBadgeTextWrapperCva({
            size,
          })}
        >
          {isLoading ? (
            <>
              <Skeleton className="h-[16px] w-[140px] rounded-md" />
              <Skeleton className="h-3 mt-0.5 w-[60px] rounded-md" />
            </>
          ) : (
            <>
              <Typography noWrap level={titleLevel}>
                {fullName}
              </Typography>
              <Typography noWrap level={descriptionLevel} className="opacity-65">
                {description}
              </Typography>
            </>
          )}
        </div>
        <span className={cn("opacity-60", rightElClassName)}>{rightEl}</span>
      </Button>
    )
  },
)

ProfileBadge.displayName = 'ProfileBadge'
