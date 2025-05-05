import Typography from '@/components/common/Typography'
import { usePageInfoDrawer } from '@/components/providers/page_info_drawer'
import { Button, Tab, Tabs } from '@nextui-org/react'
import { RiCloseLine } from 'react-icons/ri'
import { PageIconPreview } from '../../PageListView/PageIconPreview'
import { useParams } from 'next/navigation'
import { OrganizationPageParams } from '@/constants/routes'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useMemo } from 'react'
import { usePageSelect } from '@/components/providers/page_select'
import { useFetchPageByPkID } from '@/mutation/querier/page/useFetchPageByPkID'
import { PageDrawerInfoSection } from './PageDrawerInfoSection'

export const PageInfoDrawer = () => {
  const { isOpenPageInfo, onClosePageInfo } = usePageInfoDrawer()
  const { pageID } = useParams<OrganizationPageParams>()
  const { selectedPagePkIDs } = usePageSelect()

  // const queryClient = useQueryClient()

  const { data: { data: currentPage } = {}, isLoading } = useFetchPage({
    pageID,
  })

  const selectedPagePkID = useMemo(() => {
    if (selectedPagePkIDs.length === 1) {
      return selectedPagePkIDs[0]
    }
    if (selectedPagePkIDs.length > 1) {
      return null
    }
    return currentPage?.pkid
  }, [currentPage?.pkid, selectedPagePkIDs])

  const { data: { data: selectedPage } = {}, isLoading: isLoadingSelectedPage } = useFetchPageByPkID({
    pagePkID: selectedPagePkID ?? -1,
    allowFetch: (selectedPagePkID ?? -1) >= 0,
  })

  const loading = isLoading || isLoadingSelectedPage
  const isSelectingMultiple = selectedPagePkIDs.length > 1

  if (!isOpenPageInfo) {
    return null
  }

  return (
    <div className="flex h-full max-h-full w-[340px] px-4 pb-4 pt-px">
      <div className="relative flex h-full flex-1 flex-col overflow-y-auto rounded-large bg-default-50">
        {/* Drawer Body */}
        <div className="flex h-full flex-col overflow-x-hidden p-4 pb-0">
          {selectedPage && (
            <>
              <div className="-ml-4 -mr-6 -mt-1 flex items-center pl-4 pr-4">
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
              <div className="flex-1 overflow-y-auto pt-4 flex flex-col items-stretch">
                <Tabs
                  variant="light"
                  color="primary"
                  classNames={{
                    base: 'pb-3',
                    tabList: 'flex-1',
                  }}
                >
                  <Tab title="Details" className='flex-1'>
                    <PageDrawerInfoSection page={selectedPage}/>
                  </Tab>
                  <Tab title="Activities" className='flex-1'>

                  </Tab>
                </Tabs>
              </div>
            </>
          )}
          {isSelectingMultiple &&
            loading &&
            // Skeleton
            null}

          {isSelectingMultiple &&
            // Selecting Multiple UI
            null}
        </div>
      </div>
    </div>
  )
}
