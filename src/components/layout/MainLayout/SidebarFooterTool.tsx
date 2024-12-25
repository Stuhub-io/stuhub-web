import { useAuthContext } from '@/components/auth/AuthGuard'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import { useOrganization } from '@/components/providers/organization'
import { getPermissionText } from '@/utils/organization'
import { Button } from '@nextui-org/react'
import { AiOutlineTeam } from 'react-icons/ai'

export const SidebarFooter = () => {
  const { currentUserRole } = useOrganization()
  const { user } = useAuthContext()
  return (
    <div className="mt-2 flex gap-2">
      <ProfileBadge
        variant="light"
        firstName={user?.first_name}
        lastName={user?.last_name}
        description={getPermissionText(currentUserRole ?? 'guest')}
        size="sm"
      />
      <Button isIconOnly variant="flat">
        <AiOutlineTeam />
      </Button>
    </div>
  )
}
