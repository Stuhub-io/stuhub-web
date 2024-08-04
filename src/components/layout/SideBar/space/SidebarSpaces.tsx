import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { RiMoreFill } from 'react-icons/ri'
import { SidebarIconButton } from '../SidebarIconbutton'
import { SidebarItem } from '../SidebarItem'
import { useSidebar } from '@/components/providers/sidebar'
import { Space } from '@/schema/space'
import { SidebarItemSkeleton } from '../SidebarItemSkeleton'

export const SidebarSpaces = () => {
  const { publicSpaces, privateSpace } = useSidebar()
  return (
    <div className="space-y-1">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <SidebarItem
            endContent={
              <SidebarIconButton showOnGroupHoverOnly>
                <RiMoreFill />
              </SidebarIconButton>
            }
            className="text-text-tertiary"
          >
            Spaces
          </SidebarItem>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {publicSpaces?.map((space) => {
            return <SpaceItem space={space} key={space.id} />
          })}
        </CollapsibleContent>
      </Collapsible>
      <SpaceItem space={privateSpace} />
    </div>
  )
}

interface SpaceItemProps {
  space?: Space
}

export const SpaceItem = (props: SpaceItemProps) => {
  const { space } = props
  const isLoading = !space

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
        <SidebarItem>{space.is_private ? 'Private' : space.name}</SidebarItem>
      </CollapsibleTrigger>
      <CollapsibleContent></CollapsibleContent>
    </Collapsible>
  )
}
