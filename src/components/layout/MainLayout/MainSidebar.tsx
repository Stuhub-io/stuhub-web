import { SideBar } from '@/components/common/Sidebar'
import { SidebarToolItems } from './SidebarToolItems'
import { SidebarFooter } from './SidebarFooterTool'
import { SidebarPageSectionView } from '@/components/page/sidebar_view/SidebarSectionView'
import { SidebarUploadingSection } from '@/components/page/sidebar_view/SidebarUploadingSection'
import { SidebarOrgSelect } from './SidebarOrgSelect'

export const MainSideBar = () => {
  return (
    <SideBar
      headerSection={<SidebarFooter />}
      bodySection={
        <>
          <SidebarOrgSelect />
          <SidebarUploadingSection />
          <SidebarPageSectionView />
        </>
      }
      toolSection={<SidebarToolItems />}
    />
  )
}
