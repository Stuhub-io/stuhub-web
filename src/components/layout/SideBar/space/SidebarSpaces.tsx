import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { RiMoreFill } from 'react-icons/ri'
import { SidebarIconButton } from '../SidebarIconbutton'
import { SidebarItem } from '../SidebarItem'
import { useSidebar } from '@/components/providers/sidebar'
import { SpaceItem } from './SidebarSpaceItem'

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
      {privateSpace && <SpaceItem space={privateSpace} />}
    </div>
  )
}
