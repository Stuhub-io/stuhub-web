import { PageViewType, PageViewTypeEnum } from '@/schema/page'
import { BaseSidebarViewer, BaseSidebarViewerProps } from './type'
import { FolderSidebarItemView } from './sidebar_viewers/FolderSidebarItemView'
import { DocSidebarItemView } from './sidebar_viewers/DocSidebarItemView'
import { AssetSidebarItemView } from './sidebar_viewers/AssetSidebarItemView'

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
