'use client'

import { OrganizationInviteParams } from '@/constants/routes'
import { organizationService } from '@/api/organization'
// import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function ValidateOrgInvite() {
  const { data } = useSession()
  const { inviteId } = useParams<Partial<OrganizationInviteParams>>()

  useEffect(() => {
    if (!inviteId || !data) return
    const fetch = async () => {
      try {
        const res = await organizationService.validateOrgInvite({ token: inviteId })
        console.log({ res })
      } catch (error) {
        console.log({ error })
      }
    }
    fetch()
  }, [inviteId, data])

  // if (!res.data) {
  //   return null
  // }

  return <div>hello</div>
}
