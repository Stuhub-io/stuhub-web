import Typography from '@/components/common/Typography'
import { Button, Input, useDisclosure } from '@nextui-org/react'
import { InviteMembersModal } from '../../InviteMembersModal'

interface MembersActionBar {
  totalMembers: number
  onChangeSearchKey: (value: string) => void
}

export const MembersActionBar = ({ totalMembers, onChangeSearchKey }: MembersActionBar) => {
  const {
    isOpen: isInviteMembersOpen,
    onOpen: openInviteMembers,
    onClose: closeInviteMembers,
  } = useDisclosure()

  return (
    <div className="flex w-full items-center justify-end gap-3">
      <Typography level="h8" color="textTertiary">
        {totalMembers} members
      </Typography>
      <Input
        placeholder="Type to search"
        className="w-64"
        size="sm"
        onChange={(e) => onChangeSearchKey(e.target.value)}
      />
      <Button size="sm" color="primary" onClick={openInviteMembers}>
        Add members
      </Button>
      <InviteMembersModal size="sm" isOpen={isInviteMembersOpen} onClose={closeInviteMembers} />
    </div>
  )
}
