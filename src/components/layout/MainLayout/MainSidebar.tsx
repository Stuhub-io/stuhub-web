import { SideBar } from '@/components/common/Sidebar'
import { SidebarToolItems } from './SidebarToolItems'
import { SidebarFooter } from './SidebarFooterTool'
import { SidebarPageSectionView } from '@/components/page/sidebar_view/SidebarSectionView'
import { SidebarUploadingSection } from '@/components/page/sidebar_view/SidebarUploadingSection'
import { SidebarOrgSelect } from './SidebarOrgSelect'
import { SidebarFavoriteSection } from '@/components/page/sidebar_view/SidebarFavoriteSection'

export const MainSideBar = () => {
  return (
    <SideBar
      headerSection={
          <SidebarOrgSelect />

      }
      bodySection={
        <>
          <SidebarUploadingSection />
          <SidebarFavoriteSection/>
          <SidebarPageSectionView />
        </>
      }
      footerSection={<SidebarFooter />}
      toolSection={<SidebarToolItems />}
    />
  )
}
