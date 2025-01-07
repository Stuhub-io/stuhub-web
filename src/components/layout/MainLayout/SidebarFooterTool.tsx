import { useAuthContext } from '@/components/auth/AuthGuard'
import { ProfileBadge } from '@/components/common/ProfileBadge'

export const SidebarFooter = () => {
  const { user } = useAuthContext()
  return (
    <ProfileBadge
      variant="flat"
      radius="lg"
      firstName={user?.first_name || user?.last_name ? user.first_name : user?.email}
      lastName={user?.last_name}
      size="sm"
      avatar={user?.avatar}
    />
  )
}
