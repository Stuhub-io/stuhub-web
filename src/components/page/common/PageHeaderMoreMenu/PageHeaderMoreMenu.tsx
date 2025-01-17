'use client'

import { Button, Skeleton } from '@nextui-org/react'
import { RiMore2Fill, RiShareFill, RiStarLine } from 'react-icons/ri'
import { PageMenu } from '../../PageMenu'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams, useSearchParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { useSharePageContext } from '@/components/providers/share'
import { useEffect, useState } from 'react'

export const PageHeaderMoreMenu = () => {
  const { pageID } = useParams<OrganizationPageParams>()
  
  const searchParams = useSearchParams()

  const [ initOpenShare, setInitOpenShare ] = useState(searchParams.get('openShare') !== undefined)

  const { onOpenShareModal } = useSharePageContext()

  const { data: { data: page } = {}, isPending } = useFetchPage({
    allowFetch: Boolean(pageID),
    pageID,
  })

  useEffect(() => {
    if (page && initOpenShare) {
      onOpenShareModal(page)
      setInitOpenShare(false)
    }
  }, [initOpenShare, onOpenShareModal, page])


  if (!pageID) {
    return null
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Button
          size="sm"
          variant="light"
          isIconOnly
          onClick={() => {
            if (!page) return
            onOpenShareModal(page)
          }}
        >
          <RiShareFill size={20} />
        </Button>
        <Button size="sm" variant="light" isIconOnly>
          <RiStarLine size={20} />
        </Button>
        {isPending && <Skeleton className=" h-6 w-6 rounded-md" />}
        {!isPending && page && (
          <PageMenu page={page} parentPage={page.parent_page}>
            <Button isIconOnly size="sm" variant="flat">
              <RiMore2Fill size={20} />
            </Button>
          </PageMenu>
        )}
      </div>
    </>
  )
}
