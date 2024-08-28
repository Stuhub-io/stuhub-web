import { Space } from '@/schema/space'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { SidebarItem } from '../SidebarItem'
import { SidebarItemSkeleton } from '../SidebarItemSkeleton'
import { SidebarIconButton } from '../SidebarIconbutton'
import { RiAddFill, RiArrowDownSLine, RiFileFill } from 'react-icons/ri'
import { useSidebar } from '@/components/providers/sidebar'
import { useMemo, useState } from 'react'
import { Page } from '@/schema/page'
import { SidebarItemLeftSpacer } from '../SidebarItemLeftSpacer'
import { useCreatePageContext } from '@/components/providers/newpage'

interface SpaceItemProps {
  space: Space
}

export const SpaceItem = (props: SpaceItemProps) => {
  const { space } = props
  const isLoading = !space

  const { privatePages } = useSidebar()
  const { onOpenCreatePage } = useCreatePageContext()

  const outerPages = useMemo(() => {
    if (space.is_private) {
      return privatePages?.list?.filter(
        (page) => page.space_pkid === space.pk_id && !page.parent_page_pkid,
      )
    }
    // FIXME: add handle pages
    return []
  }, [privatePages, space?.is_private, space.pk_id])

  if (isLoading) {
    return (
      <>
        <SidebarItemSkeleton className="w-14" />
        <SidebarItemSkeleton hasIcon />
        <SidebarItemSkeleton hasIcon delay={1000} />
      </>
    )
  }

  return (
    <Collapsible open={isLoading || undefined}>
      <CollapsibleTrigger asChild>
        <SidebarItem
          endContent={
            <SidebarIconButton
              showOnGroupHoverOnly
              onClick={() => onOpenCreatePage()}
            >
              <RiAddFill />
            </SidebarIconButton>
          }
        >
          {space.is_private ? 'Private' : space.name}
        </SidebarItem>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {outerPages?.map((page) => (
          <SidebarPageItem space={space} key={page.id} page={page} level={0} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

interface SidebarPageItemProps {
  page: Page
  space: Space
  level?: number
}

export const SidebarPageItem = ({ page, space, level = 0 }: SidebarPageItemProps) => {
  const { privatePages, setSelectPage, selectPage } = useSidebar()
  const [isExpanded, setIsExpanded] = useState(false)

  const childPages = useMemo(() => {
    return privatePages?.list.filter((p) => p.parent_page_pkid === page.pk_id)
  }, [page.pk_id, privatePages])

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={(open) => {
        setIsExpanded(open)
      }}
    >
      <SidebarItem
        isSelected={page.pk_id === selectPage?.pk_id}
        onClick={() => {
          setSelectPage(page)
        }}
        startContent={
          <>
            <SidebarItemLeftSpacer level={level} />
            <SidebarIconButton hideOnGroupHover>
              <RiFileFill />
            </SidebarIconButton>
            <CollapsibleTrigger asChild>
              <SidebarIconButton showOnGroupHoverOnly className="data-[state=closed]:-rotate-90">
                <RiArrowDownSLine />
              </SidebarIconButton>
            </CollapsibleTrigger>
          </>
        }
        endContent={
          <SidebarIconButton showOnGroupHoverOnly>
            <RiAddFill />
          </SidebarIconButton>
        }
      >
        {page.name}
      </SidebarItem>
      <CollapsibleContent>
        {childPages?.map((childPage) => (
          <SidebarPageItem space={space} key={childPage.id} page={childPage} level={level + 1} />
        ))}
        {childPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={level + 1} />}>
            <span className="text-sm text-gray-500">No pages inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
