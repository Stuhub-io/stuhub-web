import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { RiMoreFill } from 'react-icons/ri'
import { SidebarIconButton } from '../SidebarIconbutton'
import { SidebarItem } from '../SidebarItem'
import { useSidebar } from '@/components/providers/sidebar'
import { SpaceItem } from './SidebarSpaceItem'
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
          {!publicSpaces && (
            <>
              <SidebarItemSkeleton className="w-14" />
              <SidebarItemSkeleton hasIcon />
              {[1, 2, 3, 4].map((i) => (
                <SidebarItemSkeleton hasIcon delay={300 + 100 * i} key={i} />
              ))}
            </>
          )}
        </CollapsibleContent>
      </Collapsible>
      {privateSpace && <SpaceItem space={privateSpace} />}
      {!privateSpace && (
        <>
          <SidebarItemSkeleton className="w-14" />
          <SidebarItemSkeleton hasIcon />
          {[1, 2, 3, 4].map((i) => (
            <SidebarItemSkeleton hasIcon delay={300 + 200 * i} key={i} />
          ))}
        </>
      )}
    </div>
  )
}
