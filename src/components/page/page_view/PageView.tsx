import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { PageViewType, PageViewTypeEnum } from '@/schema/page'
import { useEffect } from 'react'
import { getRandomImageUrl } from '@/libs/image'
import { usePageLayoutContext } from '@/components/layout/PageLayout/context'
import { PageDocumentViewer } from './page_viewers/PageDocumentViewer'
import { PageViewer } from './type'
import { PageFolderViewer } from './page_viewers/PageFolderViewer'

export const pageViewer: {
  viewer: PageViewer
  viewType: PageViewType
}[] = [
    {
        viewType: PageViewTypeEnum.DOCUMENT,
        viewer: PageDocumentViewer,
    },
    {
      viewType: PageViewTypeEnum.FOLDER,
      viewer: PageFolderViewer
    }
]

interface PageViewProps {
  pageID: string
}

export const PageView = (props: PageViewProps) => {
  const { pageID } = props
  const {
    data: { data: pageDetail } = {},
    refetch,
    isLoading,
    isRefetching,
  } = useFetchPage({
    allowFetch: true,
    pageID,
  })

  const { setCoverImageUrl, currentCoverImageUrl } = usePageLayoutContext()
  const onAddCoverBtn = () => {
    setCoverImageUrl(getRandomImageUrl(1400, 400))
  }

  const Component = pageViewer.find((viewer) => viewer.viewType === pageDetail?.view_type)?.viewer

  useEffect(() => {
    if (pageDetail) setCoverImageUrl(pageDetail?.cover_image ?? '')
  }, [pageDetail, setCoverImageUrl])
  if (!Component) return null

  return (
    <Component
      page={pageDetail}
      mutatePage={refetch}
      onAddCoverImage={onAddCoverBtn}
      hasCoverImage={Boolean(currentCoverImageUrl)}
      isLoading={isLoading}
      isRefetching={isRefetching}
    />
  )
}
