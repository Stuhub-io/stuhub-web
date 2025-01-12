import { PopperContentTrigger } from '@/components/common/PopoverTrigger'
import { SidebarItem, SidebarIconButton } from '@/components/common/Sidebar'
import { useSidebar } from '@/components/providers/sidebar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { useState, useMemo } from 'react'
import { RiAddFill, RiArrowRightSLine, RiHardDrive2Fill } from 'react-icons/ri'
import { PageCreateMenu } from '../../common/PageCreateMenu'
import { CreatingSidebarPageItem } from '../PageCreatingItemView'
import { SidebarPageItemView } from '../SidebarPageIterm'
import { ActiveCreatingPageItem } from '../ActiveCreatingPageItemView'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'

export const SidebarPageSectionView = () => {
  const { orgPages } = useSidebar()
  const [isExpanded, setIsExpanded] = useState(true)
  const { organization, isGuest } = useOrganization()

  const router = useRouter()

  const outerPages = useMemo(() => {
    // filter out pages that have no parent or parent is in the list
    return orgPages?.list?.filter(
      (page) => (!page.parent_page_pkid || !orgPages.map[page.parent_page_pkid ?? -1]) && !page.archived_at,
    )
  }, [orgPages])

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <SidebarItem
        onClick={() => {
          router.push(
            ROUTES.ROOT_VAULTS({
              orgSlug: organization?.slug ?? '',
            }),
          )
        }}
        startContent={
          <>
            <SidebarIconButton hideOnGroupHover>
              <RiHardDrive2Fill size={16} />
            </SidebarIconButton>
            <CollapsibleTrigger asChild>
              <SidebarIconButton showOnGroupHoverOnly className=" data-[state=open]:rotate-90 ">
                <RiArrowRightSLine size={16} />
              </SidebarIconButton>
            </CollapsibleTrigger>
          </>
        }
        endContent={
          <PopperContentTrigger>
            <SidebarIconButton showOnGroupHoverOnly>
              <RiAddFill />
            </SidebarIconButton>
            <PageCreateMenu
              onClose={() => {
                setIsExpanded(true)
              }}
            />
          </PopperContentTrigger>
        }
      >
        {isGuest ? 'Shared with me' : 'My Vault'}
      </SidebarItem>
      <CollapsibleContent>
        {outerPages?.map((page) => {
          return (
            <SidebarPageItemView
              key={page.id}
              page={page}
              level={1}
              ActiveCreatingPageItem={ActiveCreatingPageItem}
              CreatingPageItemView={CreatingSidebarPageItem}
              SidebarPageItemViewer={SidebarPageItemView}
            />
          )
        })}
        {(outerPages?.length ?? 0) === 0 && (
          <SidebarItem startContent={<div className="w-6" />}>
            <span className="text-sm text-gray-500">No folder inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
