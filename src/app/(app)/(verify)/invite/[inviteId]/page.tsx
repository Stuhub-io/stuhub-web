'use client'

import { OrganizationInviteParams } from '@/constants/routes'
import { organizationService } from '@/api/organization'
// import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { UploadButton } from '@/libs/uploadthing'

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

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res)
          alert('Upload Completed')
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`)
        }}
      />
    </div>
  )
}
