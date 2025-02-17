'use client'

import { SidebarItem, SidebarIconButton } from '@/components/common/Sidebar'
import { ROUTES } from '@/constants/routes'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { RiArrowRightSLine, RiStarFill } from 'react-icons/ri'
import { useState } from 'react'
import { useOrganization } from '@/components/providers/organization'
import { useSidebar } from '@/components/providers/sidebar'
import { SidebarPageItemView } from '../SidebarPageIterm'
import { CreatingSidebarPageItem } from '../PageCreatingItemView'
import { ActiveCreatingPageItem } from '../ActiveCreatingPageItemView'
import { usePathname, useRouter } from 'next/navigation'

export const SidebarFavoriteSection = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const { organization, isGuest } = useOrganization()
  const { starredOrgPages } = useSidebar()
  const router = useRouter()

  const pathName = usePathname()
  const isSelected = pathName === ROUTES.STARRED_PAGE({ orgSlug: organization?.slug ?? '' })

  if (!starredOrgPages?.length) {
    return null
  }

  if (isGuest) {
    return null
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <SidebarItem
        isSelected={isSelected}
        onClick={() => {
          router.push(
            ROUTES.STARRED_PAGE({
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
      >
        Starred
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
