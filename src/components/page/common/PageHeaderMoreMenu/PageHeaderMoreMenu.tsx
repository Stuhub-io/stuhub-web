'use client'

import { Button, Skeleton, Tooltip } from '@nextui-org/react'
import { RiInfoI, RiMore2Fill, RiShareFill, RiStarFill, RiStarLine } from 'react-icons/ri'
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
import { getMenuLabelPageViewType } from '@/utils/page'
import { usePageInfoDrawer } from '@/components/providers/page_info_drawer'

export const PageHeaderMoreMenu = () => {
  const { pageID } = useParams<OrganizationPageParams>()

  const searchParams = useSearchParams()
  const { onOpenShareModal } = useSharePageContext()
  const { refreshOrgPages, refreshStarredOrgPages } = useSidebar()
  const { onOpenPageInfo } = usePageInfoDrawer()

  const { toast } = useToast()

  const [initOpenShare, setInitOpenShare] = useState(Boolean(searchParams.get('openShare')))

  const {
    data: { data: page } = {},
    isPending,
    refetch,
    isPermissionDenied,
  } = useFetchPage({
    allowFetch: Boolean(pageID),
    pageID,
  })

  const [isTogglingStar, setTogglingStar] = useState(false)

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

  if (isPermissionDenied) {
    return null
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className=" h-6 w-6 rounded-md" />
        <Skeleton className=" h-6 w-6 rounded-md" />
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Tooltip content="Share">
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
        </Tooltip>
        <Tooltip content={page?.page_star ? 'Remove from favorite' : 'Add to favorite'}>
          <Button size="sm" variant="light" isIconOnly onClick={onToggleStar} isDisabled={isTogglingStar}>
            {page?.page_star ? <RiStarFill size={20} className="text-warning" /> : <RiStarLine size={20} />}
          </Button>
        </Tooltip>

        {page && (
          <Tooltip content={`${getMenuLabelPageViewType(page.view_type)} info`}>
            <Button
              size="sm"
              variant="light"
              isIconOnly
              onClick={() => {
                onOpenPageInfo(page)
              }}
              isDisabled={false}
            >
              <RiInfoI size={20} />
            </Button>
          </Tooltip>
        )}

        {page && (
          <Tooltip content="Menu">
            <PageMenu page={page} parentPage={page.parent_page}>
              <Button isIconOnly size="sm" variant="flat">
                <RiMore2Fill size={20} />
              </Button>
            </PageMenu>
          </Tooltip>
        )}
      </div>
    </>
  )
}
