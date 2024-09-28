'use client'

import { OrganizationInviteParams } from '@/constants/routes'
import { OrgInviteCard, UnavailableInviteCard } from '@/components/verify/invite'
import { useFetchOrgInviteById } from '@/mutation/querier/organization/useFetchOrgInviteById'
import { getUserFullName } from '@/utils/user'
import { CircularProgress } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'

export default function ValidateOrgInvite() {
  const { inviteId } = useParams<Partial<OrganizationInviteParams>>()

  const { data, isLoading } = useFetchOrgInviteById({
    id: inviteId!,
    allowFetch: !!inviteId,
  })

  const { data: user } = useSession()

  if (isLoading) {
    return <CircularProgress />
  }

  if (!data) {
    return <UnavailableInviteCard />
  }

  const {
    id,
    user_pkid,
    is_used,
    expired_at,
    organization: { name, slug, avatar, owner, members },
  } = data.data

  if (is_used || user_pkid != user?.user.pk_id || dayjs().isAfter(dayjs(expired_at))) {
    return <UnavailableInviteCard />
  }

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
        orgSlug={slug}
        orgAvatar={avatar}
        ownerFullname={ownerFullname}
        orgMembersLength={members.length}
      />
    </>
  )
}
