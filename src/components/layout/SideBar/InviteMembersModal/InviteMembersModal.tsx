import { useOrganization } from '@/components/providers/organization'
import { ORG_ROLES } from '@/constants/organization'
import { OrgRole } from '@/schema/organization'
import { User } from '@/schema/user'
import {
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { SearchActions } from './SearchActions'
import { SearchForm } from './SearchForm'
import { SearchResults } from './SearchResults'
import { useInviteOrgMembers } from '@/mutation/mutator/useInviteOrgMembers'
import { useToast } from '@/hooks/useToast'

type InviteMembersModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const InviteMembersModal = ({ isOpen, onClose }: InviteMembersModalProps) => {
  const [role, setRole] = useState<OrgRole>(ORG_ROLES.OWNER)
  const [emails, setEmails] = useState<string[]>([])
  const [searchedUser, setSearchedUser] = useState<User | null>(null)

  const { toast } = useToast()

  const { organization } = useOrganization()
  const invitedEmails = useMemo(
    () => [...(organization?.members.map((m) => m.user?.email ?? '') ?? []), ...emails],
    [organization, emails],
  )

  const { mutate: inviteOrgMembersMutate, isPending } = useInviteOrgMembers()

  const handleAddEmail = (email: string) => {
    setEmails((prev) => [...prev, email])
  }

  const handleRemoveEmail = (email: string) => {
    const newEmails = [...emails].filter((e) => e !== email)
    setEmails(newEmails)
  }

  const handleSubmitInvitations = () => {
    if (!organization) return
    inviteOrgMembersMutate(
      {
        org_info: {
          pkid: organization.pkid,
          name: organization.name,
          slug: organization.slug,
          avatar: organization.avatar,
          members: organization.members.length,
        },
        infos: emails.map((email) => ({ email, role })),
      },
      {
        onSuccess: ({ data: { failed_emails }, message }) => {
          if (failed_emails) {
            toast({
              variant: 'danger',
              title: 'Oops! Something wrong.',
              description: `${failed_emails.join(', ')} are not sent!`,
            })
            return
          }

          toast({
            variant: 'success',
            title: message,
          })
        },
        onError: (error) => {
          toast({
            variant: 'danger',
            title: 'Oops! Something wrong.',
            description: error.message,
          })
        },
      },
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" hideCloseButton className="h-[800px]">
      <ModalContent>
        <ModalHeader>
          <div className="flex w-full items-start justify-between">
            <SearchForm
              emails={emails}
              invitedEmails={invitedEmails}
              searchedUser={searchedUser}
              setSearchedUser={setSearchedUser}
              addEmail={handleAddEmail}
              removeEmail={handleRemoveEmail}
            />
            <SearchActions
              role={role}
              isLoading={isPending}
              disableSubmit={emails.length === 0}
              setRole={setRole}
              submitInvitations={handleSubmitInvitations}
            />
          </div>
        </ModalHeader>
        <Divider />
        <ModalBody className="flex flex-col gap-0">
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
