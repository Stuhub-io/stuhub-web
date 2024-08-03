import { ORG_ROLES } from '@/constants/organization'
import { OrgRole } from '@/schema/organization'
import { checkIsEmailValid } from '@/utils/user'
import { Divider, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'
import { useState } from 'react'
import { SearchActions } from './SearchActions'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'

type InviteMembersModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const InviteMembersModal = ({ isOpen, onClose }: InviteMembersModalProps) => {
  const [role, setRole] = useState<OrgRole>(ORG_ROLES.OWNER)
  const [emailValue, setEmailValue] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [searchedEmails] = useState<string[]>(['khoa2@gmail.com'])

  const handleAddEmail = (email: string) => {
    const existingEmail = emails.find((e) => e === email)
    if (!email || !checkIsEmailValid(email) || !!existingEmail) return

    setEmails((prev) => [...prev, email])
    setEmailValue('')
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
              emailValue={emailValue}
              emails={emails}
              setEmailValue={setEmailValue}
              addEmail={handleAddEmail}
              removeEmail={handleRemoveEmail}
            />

            <SearchActions role={role} setRole={setRole} submitInvite={() => {}} />
          </div>
          <Divider />
          <SearchResults results={searchedEmails} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
