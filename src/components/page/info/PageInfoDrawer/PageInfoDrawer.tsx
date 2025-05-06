import Typography from '@/components/common/Typography'
import { usePageInfoDrawer } from '@/components/providers/page_info_drawer'
import { Button, Divider, Skeleton, Tab, Tabs } from '@nextui-org/react'
import { RiCloseLine } from 'react-icons/ri'
import { PageIconPreview } from '../../PageListView/PageIconPreview'
import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useMemo } from 'react'
import { usePageSelect } from '@/components/providers/page_select'
import { useFetchPageByPkID } from '@/mutation/querier/page/useFetchPageByPkID'
import { PageDrawerInfoSection } from './PageDrawerInfoSection'
import { LazySkeleton } from '@/components/common/LazySkeleton'

const randomWidth = () => [200, 240, 180][Math.round(Math.random() * 2)]

export const PageInfoDrawer = () => {
  const { isOpenPageInfo, onClosePageInfo } = usePageInfoDrawer()
  const { pageID } = useParams<OrganizationPageParams>()
  const { selectedPagePkIDs } = usePageSelect()
  const skeletonWidths = useMemo(() => Array(5).fill(null).map(() => randomWidth()), [])

  const isSelectingMultiple = selectedPagePkIDs.length > 1

  const { data: { data: currentPage } = {}, isPending } = useFetchPage({
    pageID, 
  })

  const selectedPagePkID = useMemo(() => {
    if (selectedPagePkIDs.length === 1) {
      return selectedPagePkIDs[0]
    }
    if (isSelectingMultiple) {
      return null
    }
    return currentPage?.pkid
  }, [currentPage?.pkid, isSelectingMultiple, selectedPagePkIDs])

  const { data: { data: selectedPage } = {} } = useFetchPageByPkID({
    pagePkID: selectedPagePkID ?? -1,
    allowFetch: !isPending && (selectedPagePkID ?? -1) >= 0,
  })

  if (!isOpenPageInfo) {
    return null
  }

  return (
    <div className="flex h-full max-h-full w-[340px] px-4 pb-4 pt-px">
      <div className="relative flex h-full flex-1 flex-col items-stretch overflow-y-auto rounded-large bg-default-50 p-4 pb-0">
        {/* Drawer Body */}
        {selectedPage && (
          <>
            <div className="-mt-1 flex items-center">
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <PageIconPreview page={selectedPage} size={32} />
                <Typography className="flex-1 truncate" noWrap>
                  {selectedPage.name || 'Untitled'}
                </Typography>
              </div>
              <Button isIconOnly radius="full" variant="light" onClick={onClosePageInfo}>
                <RiCloseLine size={20} />
              </Button>
            </div>
            <div className="-mx-4 flex flex-1 flex-col items-stretch overflow-y-auto px-4 pt-4">
              <Tabs
                variant="light"
                color="primary"
                classNames={{
                  base: 'pb-3 !overflow-visible',
                  tabList: 'flex-1 -mx-4 px-4 border-b border-b-divider pt-0 pb-4 rounded-b-none',
                  // tabContent: 'w-auto -mx-3 px-3 flex flex-col items-stretch'
                }}
              >
                <Tab title="Details" className="flex-1">
                  <PageDrawerInfoSection page={selectedPage} />
                </Tab>
                <Tab title="Activities" className="flex-1"></Tab>
              </Tabs>
            </div>
          </>
        )}
        {!isSelectingMultiple && !selectedPage && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-[32px] w-[32px] animate-appearance-in rounded-lg" />
              <Skeleton className="h-[20px] flex-1  animate-appearance-in  rounded-lg" />
            </div>
            <div className="flex h-[32px] animate-appearance-in items-center justify-center  gap-4">
              <Skeleton
                className="h-[32px] flex-1 animate-appearance-in  rounded-lg"
                classNames={{ base: '!duration-400' }}
              />
              <Skeleton className="h-[32px] flex-1 animate-appearance-in  rounded-lg" />
            </div>
            <Divider className="!mt-4" />
            <Skeleton className="h-[160px] w-full animate-appearance-in  rounded-xl" />
            <div className="space-y-5">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <LazySkeleton
                    key={i}
                    className="h-[20px] rounded-lg"
                    delay={200 * (i + 1)}
                    style={{ width: skeletonWidths[i] }}
                  />
                ))}
            </div>
          </div>
        )}

        {isSelectingMultiple &&
          // Selecting Multiple UI
          null}
      </div>
    </div>
  )
}
