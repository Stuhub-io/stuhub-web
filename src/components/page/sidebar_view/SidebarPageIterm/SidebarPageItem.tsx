import { PageViewType, PageViewTypeEnum } from '@/schema/page'
import { FolderSidebarItemView } from './FolderSidebarItemView'
import { DocSidebarItemView } from './DocSidebarItemView'
import { AssetSidebarItemView } from './AssetSidebarItemView'
import { BaseSidebarViewer, BaseSidebarViewerProps } from './type'

const sidebarPageItemViewers: {
  viewer: BaseSidebarViewer
  viewType: PageViewType
}[] = [
  {
    viewer: FolderSidebarItemView,
    viewType: PageViewTypeEnum.FOLDER,
  },
  {
    viewer: DocSidebarItemView,
    viewType: PageViewTypeEnum.DOCUMENT
  },
  {
    viewer: AssetSidebarItemView,
    viewType: PageViewTypeEnum.ASSET
  }
]

export const SidebarPageItemView = (props: BaseSidebarViewerProps) => {
  const Component = sidebarPageItemViewers.find((v) => v.viewType === props.page.view_type)?.viewer
  if (!Component) return null

  return <Component {...props} />
}
