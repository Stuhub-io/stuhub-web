import Typography from '@/components/common/Typography'
import { usePageInfoDrawer } from '@/components/providers/page_info_drawer'
import { Button, Divider, Skeleton, Tab, Tabs, Tooltip } from '@nextui-org/react'
import { RiCheckLine, RiCloseLine, RiStarFill } from 'react-icons/ri'
import { PageIconPreview } from '../../PageListView/PageIconPreview'
import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useMemo, useState } from 'react'
import { usePageSelect } from '@/components/providers/page_select'
import { useFetchPageByPkID } from '@/mutation/querier/page/useFetchPageByPkID'
import { PageDrawerInfoSection } from './PageDrawerInfoSection'
import { LazySkeleton } from '@/components/common/LazySkeleton'
import { Image } from '@nextui-org/react'
import { PageDrawerActivity } from './PageDrawerActiviySection'

const randomWidth = () => [200, 240, 180][Math.round(Math.random() * 2)]

export const PageInfoDrawer = () => {
  const { isOpenPageInfo, onClosePageInfo } = usePageInfoDrawer()
  const { pageID } = useParams<OrganizationPageParams>()
  const { selectedPagePkIDs } = usePageSelect()

  const [activeTab, setActiveTab] = useState<string>('info')

  const skeletonWidths = useMemo(
    () =>
      Array(5)
        .fill(null)
        .map(() => randomWidth()),
    [],
  )

  const isSelectingMultiple = selectedPagePkIDs.length > 1
  const hasPageID = Boolean(pageID)

  const { data: { data: currentPage } = {}, isPending } = useFetchPage({
    pageID,
    allowFetch: hasPageID,
  })

  const selectedPagePkID = useMemo(() => {
    if (selectedPagePkIDs.length === 1) {
      return selectedPagePkIDs[0]
    }
    if (isSelectingMultiple || !hasPageID) {
      return null
    }
    return currentPage?.pkid
  }, [currentPage?.pkid, hasPageID, isSelectingMultiple, selectedPagePkIDs])

  const allowFetch = (!hasPageID || (hasPageID && !isPending)) && (selectedPagePkID ?? -1) >= 0

  const { data: { data: selectedPage } = {} } = useFetchPageByPkID({
    pagePkID: selectedPagePkID ?? -1,
    allowFetch,
  })

  const initPageLoading = hasPageID && !allowFetch
  const pageLoadingOnChange = allowFetch && !selectedPage && !isSelectingMultiple
  const isNoSelectedPage =
    !hasPageID && !(initPageLoading || pageLoadingOnChange) && !isSelectingMultiple && !allowFetch

  if (!isOpenPageInfo) {
    return null
  }

  return (
    <div className="flex h-full max-h-full w-[340px] pb-4 pr-4 pt-px">
      <div className="relative flex h-full flex-1 flex-col items-stretch overflow-y-auto rounded-large bg-default-50 p-4 pb-0">
        {/* Drawer Body */}
        {selectedPage && (
          <>
            <div className="-mt-1 flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <PageIconPreview page={selectedPage} size={32} />
                <Tooltip content={selectedPage.name || 'Untitled'} delay={1000}>
                  <div className="inline-flex items-center gap-2 overflow-hidden">
                    <Typography className="flex-1 truncate" noWrap>
                      {selectedPage.name || 'Untitled'}
                    </Typography>
                    {selectedPage.page_star && <RiStarFill className="text-warning" />}
                  </div>
                </Tooltip>
              </div>
              <Button isIconOnly radius="full" variant="light" onClick={onClosePageInfo}>
                <RiCloseLine size={20} />
              </Button>
            </div>
            <div className="-mx-4 flex flex-1 flex-col items-stretch overflow-y-auto px-4 pt-4">
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(k) => {
                  setActiveTab(k as string)
                }}
                variant="light"
                color="primary"
                classNames={{
                  base: '!overflow-visible',
                  tabList: 'flex-1 -mx-4 px-4 border-b border-b-divider pt-0 pb-4 rounded-b-none',
                  panel: 'overflow-y-hidden flex-1 py-0 -mx-4 px-4',
                }}
              >
                <Tab title="Details" key="info">
                  <PageDrawerInfoSection page={selectedPage} />
                </Tab>
                <Tab title="Activities" key="activity">
                  <PageDrawerActivity page={selectedPage} />
                </Tab>
              </Tabs>
            </div>
          </>
        )}
        {isNoSelectedPage && (
          <>
            <div className="-mt-1 flex items-center justify-end">
              <Button isIconOnly radius="full" variant="light" onClick={onClosePageInfo}>
                <RiCloseLine size={20} />
              </Button>
            </div>
            <div className="mt-4 animate-appearance-in p-10 opacity-70">
              <Image src="/empty-search.png" alt="no selected page" className="mx-auto" />
              <Typography className="text-center" level="p4" color="textTertiary">
                Select a page to view its details
              </Typography>
            </div>
          </>
        )}
        {(initPageLoading || pageLoadingOnChange) && (
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
            {activeTab !== 'activity' && <Skeleton className="h-[160px] w-full animate-appearance-in  rounded-xl" />}
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

        {isSelectingMultiple && (
          <>
            <div className="-mt-1 flex items-center">
              <div className="flex flex-1 animate-appearance-in items-center gap-2 overflow-hidden">
                <RiCheckLine size={32} className="" />
                <Typography className="flex-1 truncate" noWrap>
                  {selectedPagePkIDs.length} items selected
                </Typography>
              </div>
              <Button isIconOnly radius="full" variant="light" onClick={onClosePageInfo}>
                <RiCloseLine size={20} />
              </Button>
            </div>
            <div className="mt-4 animate-appearance-in p-10 opacity-70">
              <Image src="/empty-search.png" alt="selected multiple items" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
