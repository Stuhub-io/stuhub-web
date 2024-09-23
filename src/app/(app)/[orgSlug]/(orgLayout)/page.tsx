'use client'

import Typography from '@/components/common/Typography'
import { getUserFullName } from '@/utils/user'
import { useSession } from 'next-auth/react'

export default function OrganizationHome() {
  const { data } = useSession()
  const user = data?.user

  return (
    <div className='container'>
      <Typography className="mx-auto max-w-[800px] w-fit text-center" level="h4">
        Welcome back,{' '}
        {getUserFullName({
          firstName: user?.first_name,
          lastName: user?.last_name,
          email: user?.email,
        })}
      </Typography>
    </div>
  )
}
