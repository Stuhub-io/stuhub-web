'use client'

import { OrganizationInviteParams } from '@/constants/routes'
import { OrgInviteCard } from '@/components/verify/invite'
import { useFetchOrgInviteById } from '@/mutation/querier/organization/useFetchOrgInviteById'
import { getUserFullName } from '@/utils/user'
import { CircularProgress } from '@nextui-org/react'
import { useParams } from 'next/navigation'

export default function ValidateOrgInvite() {
  const { inviteId } = useParams<Partial<OrganizationInviteParams>>()

  const { data, isLoading } = useFetchOrgInviteById({
    id: inviteId!,
    allowFetch: !!inviteId,
  })

  if (isLoading) {
    return <CircularProgress />
  }

  if (!data) {
    return <p>Invalid invite</p>
  }

  const {
    id,
    organization: { name, avatar, owner, members },
  } = data.data

  const ownerFullname = getUserFullName({
    firstName: owner?.first_name,
    lastName: owner?.last_name,
    email: owner?.email,
  })

  return (
    <>
      <OrgInviteCard
        inviteId={id}
        orgName={name}
        orgAvatar={avatar}
        ownerFullname={ownerFullname}
        orgMembersLength={members.length}
      />
    </>
  )
}
