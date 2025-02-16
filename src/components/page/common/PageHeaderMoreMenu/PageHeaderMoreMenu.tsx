'use client'

import { Button, Skeleton } from '@nextui-org/react'
import { RiMore2Fill, RiShareFill, RiStarFill, RiStarLine } from 'react-icons/ri'
import { PageMenu } from '../../PageMenu'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useParams, useSearchParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { useSharePageContext } from '@/components/providers/share'
import { useEffect, useState } from 'react'
import { useStarPage } from '@/mutation/mutator/page/useStarPage'
import { useToast } from '@/hooks/useToast'
import { useSidebar } from '@/components/providers/sidebar'
import { useUnstarPage } from '@/mutation/mutator/page/useUnstarPage'

export const PageHeaderMoreMenu = () => {
  const { pageID } = useParams<OrganizationPageParams>()

  const searchParams = useSearchParams()
  const { onOpenShareModal } = useSharePageContext()
  const { refreshOrgPages, refreshStarredOrgPages } = useSidebar()

  const { toast } = useToast()

  const [initOpenShare, setInitOpenShare] = useState(Boolean(searchParams.get('openShare')))

  const { data: { data: page } = {}, isPending, refetch } = useFetchPage({
    allowFetch: Boolean(pageID),
    pageID,
  })

  const [isTogglingStar , setTogglingStar] = useState(false)

  const { mutateAsync: starPage } = useStarPage({
    pagePkID: page?.pkid ?? -1,
  })
  const { mutateAsync: unstarPage } = useUnstarPage({
    pagePkID: page?.pkid ?? -1,
  })

  const onToggleStar = async () => {
    if (!page) return
    setTogglingStar(true)
    const mutate = page.page_star ? unstarPage : starPage
    try {
      await mutate({
        pagePkID: page.pkid ?? -1,
      })
    } catch (e) {
      console.error(e)
      toast({
        variant: 'danger',
        title: 'Failed to star page',
      })
    }

    refreshOrgPages()
    refreshStarredOrgPages()
    await refetch()

    setTogglingStar(false)
  }

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
        <Button size="sm" variant="light" isIconOnly onClick={onToggleStar} isDisabled={isTogglingStar}>
          {page?.page_star ? <RiStarFill size={20} className="text-warning" />: <RiStarLine size={20} />}
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
