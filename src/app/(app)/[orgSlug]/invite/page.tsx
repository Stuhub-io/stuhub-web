'use client'

// import { organizationService } from '@/api/organization'
// import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'

export default function ValidateOrgInvite() {
  const params = useSearchParams()

  const token = params.get('token')
  // const { data } = useSession()
  console.log({ token })

  // useEffect(() => {
  //   if (!token || !data) return
  //   const fetch = async () => {
  //     try {
  //       const res = await organizationService.validateOrgInvite({ token })
  //       console.log({ res })
  //     } catch (error) {
  //       console.log({ error })
  //     }
  //   }
  //   fetch()
  // }, [token, data])

  // if (!res.data) {
  //   return null
  // }

  return <div>hello</div>
}
