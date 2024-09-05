'use client'

import { useOrganization } from '@/components/providers/organization'

export default function OrganizationHome() {
  const { organization } = useOrganization()

  return (
        <p>{organization?.name}</p>
  )
}
