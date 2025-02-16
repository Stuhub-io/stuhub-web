import { PopperContentTrigger } from '@/components/common/PopoverTrigger'
import { SidebarItem, SidebarIconButton } from '@/components/common/Sidebar'
import { ROUTES } from '@/constants/routes'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import router from 'next/router'
import { RiArrowRightSLine, RiAddFill, RiStarFill } from 'react-icons/ri'
import { PageCreateMenu } from '../../common/PageCreateMenu'
import { useState } from 'react'
import { useOrganization } from '@/components/providers/organization'
import { useSidebar } from '@/components/providers/sidebar'
import { SidebarPageItemView } from '../SidebarPageIterm'
import { CreatingSidebarPageItem } from '../PageCreatingItemView'
import { ActiveCreatingPageItem } from '../ActiveCreatingPageItemView'


export const SidebarFavoriteSection = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const { organization, isGuest } = useOrganization()
  const { starredOrgPages } = useSidebar()

  if (isGuest) {
    return null
  }

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
              <RiStarFill size={16} />
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
        Favorite
      </SidebarItem>
      <CollapsibleContent>
        {starredOrgPages?.map((page) => {
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
      </CollapsibleContent>
    </Collapsible>
  )
}
