'use client'

import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { PageView } from '@/components/page/page_view'

export default function PageDetail() {
  const { pageID } = useParams<OrganizationPageParams>()

  return <PageView pageID={pageID} />
}
