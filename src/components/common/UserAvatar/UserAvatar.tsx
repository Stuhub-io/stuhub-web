import { Avatar } from "@nextui-org/react"

interface AvatarProps extends Omit<React.ComponentProps<typeof Avatar>, 'fallback' | 'src'> {
    first_name?: string
    last_name?: string
    email?: string
    avatar?: string
}

export const UserAvatar = (props: AvatarProps) => {
    const { avatar, first_name, last_name, email, ...rest } = props
    return (
        <Avatar
            src={avatar}
            fallback={first_name?.[0] || last_name?.[0] || email?.[0]}
            {...rest}
        />
    )
}