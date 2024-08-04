import { useOrganization } from '@/components/providers/organization'
import { ORG_ROLES } from '@/constants/organization'
import { OrgRole } from '@/schema/organization'
import { User } from '@/schema/user'
import { Divider, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { SearchActions } from './SearchActions'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'

type InviteMembersModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const InviteMembersModal = ({ isOpen, onClose }: InviteMembersModalProps) => {
  const [role, setRole] = useState<OrgRole>(ORG_ROLES.OWNER)
  const [emails, setEmails] = useState<string[]>([])
  const [searchedUser, setSearchedUser] = useState<User | null>(null)

  const { organization } = useOrganization()

  const invitedEmails = useMemo(
    () => [...(organization?.members.map((m) => m.user?.email ?? '') ?? []), ...emails],
    [organization, emails],
  )

  const handleAddEmail = (email: string) => {
    setEmails((prev) => [...prev, email])
  }

  const handleRemoveEmail = (email: string) => {
    const newEmails = [...emails].filter((e) => e !== email)
    setEmails(newEmails)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      radius="sm"
      size="lg"
      hideCloseButton
      className="h-[800px]"
    >
      <ModalContent>
        <ModalBody className="flex flex-col gap-0 px-0 pt-0">
          <div className="flex w-full items-start justify-between">
            <SearchForm
              emails={emails}
              invitedEmails={invitedEmails}
              searchedUser={searchedUser}
              setSearchedUser={setSearchedUser}
              addEmail={handleAddEmail}
              removeEmail={handleRemoveEmail}
            />
            <SearchActions role={role} setRole={setRole} submitInvite={() => {}} />
          </div>
          <Divider />
          <SearchResults
            invitedEmails={invitedEmails}
            results={searchedUser ? [searchedUser] : []}
            addEmail={handleAddEmail}
          />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
