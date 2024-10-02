'use client'

import { OrganizationInviteParams } from '@/constants/routes'
import { OrgInviteCard, UnavailableInviteCard } from '@/components/verify/invite'
import { useFetchOrgInviteById } from '@/mutation/querier/organization/useFetchOrgInviteById'
import { getUserFullName } from '@/utils/user'
import { CircularProgress } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'
import { useAuthContext } from '@/components/auth/AuthGuard'

export default function ValidateOrgInvite() {
  const { inviteId } = useParams<Partial<OrganizationInviteParams>>()

  const { data, isLoading } = useFetchOrgInviteById({
    id: inviteId!,
    allowFetch: !!inviteId,
  })
  const { user }= useAuthContext()

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

  if (is_used || user_pkid != user?.pkid || dayjs().isAfter(dayjs(expired_at))) {
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
