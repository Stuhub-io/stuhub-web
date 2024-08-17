'use client'

import { useOrganization } from '@/components/providers/organization'

export default function OrganizationHome() {
  const { organization } = useOrganization()
  return (
    <div className="p-4">
      <p>{organization?.name}</p>
    </div>
  )
}
