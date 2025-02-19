import { SidebarIconButton } from '@/components/common/Sidebar'
import { PageCard } from '@/components/page/document/PageCard'
import { RiEditBoxLine, RiMoreLine } from 'react-icons/ri'
import { WidgetSection } from '../WidgetSection'
import { useSidebar } from '@/components/providers/sidebar'
import { RecentVisitPageMoreMenu } from './RecentVisitPageMoreMenu'
import { ReactNode, useState } from 'react'
import { ILayoutSettings } from './constants'
import { PopperContentTrigger } from '@/components/common/PopoverTrigger'

export const RecentVisitPageWidget = () => {
  // FIXME: fetch recent visit pages
  const { orgPages } = useSidebar()

  const [layoutConfig, setLayoutConfig] = useState<ILayoutSettings>({
    layout: 'list',
    show: true,
  })

  const renderLayout =
    layoutConfig.layout === 'list'
      ? (items: ReactNode) => <div className="no-scrollbar flex gap-4 overflow-x-auto py-2">{items}</div>
      : (items: ReactNode) => <div className="grid grid-cols-4 gap-4">{items}</div>

  return (
    <WidgetSection
      icon={<RiEditBoxLine size={16} />}
      title="Continue your writing"
      rightEls={
        <PopperContentTrigger>
          <SidebarIconButton isIconOnly size="sm" variant="light">
            <RiMoreLine size={16} />
          </SidebarIconButton>
          <RecentVisitPageMoreMenu config={layoutConfig} onConfigChanged={setLayoutConfig} />
        </PopperContentTrigger>
      }
    >
      {renderLayout(orgPages?.list.map((page) => <PageCard pageDetail={page} key={page.id} />))}
    </WidgetSection>
  )
}
