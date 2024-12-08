import { SideBar } from '@/components/common/Sidebar'
import { SidebarToolItems } from './SidebarToolItems'
import { SidebarOrgSwitcher } from './SidebarOrgSwitcher'
import { SidebarFooter } from './SidebarFooterTool'
import { SidebarPageSectionView } from '@/components/page/sidebar_view/SidebarSectionView'
import { SidebarUploadingSection } from '@/components/page/sidebar_view/SidebarUploadingSection'

const dump = () => {}

export const MainSideBar = () => {
  return (
    <SideBar
      headerSection={<SidebarOrgSwitcher openAccountSettings={dump} openInviteMembers={dump} />}
      bodySection={
        <>
        <SidebarUploadingSection/>
        <SidebarPageSectionView/>
        </>
      }
      toolSection={<SidebarToolItems />}
      footerSection={
        <SidebarFooter/>
      }
    />
  )
}
