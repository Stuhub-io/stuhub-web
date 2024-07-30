'use client'
import { cn } from '@/libs/utils'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { RiAddLine, RiArrowDownSLine, RiFile2Fill, RiMoreFill } from 'react-icons/ri'
import { SidebarIconButton } from './SidebarIconbutton'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/Collapsible'
import { SidebarItemLeftSpacer } from './SidebarItemLeftSpacer'

export const SideBar = () => {
  return (
    <div className={cn('h-full w-full', 'border-r border-r-divider', 'bg-content1', 'px-2')}>
      <div className={cn('h-[200px]')} />
      <Collapsible>
        <Listbox>
          <ListboxItem
            key="item1"
            variant="flat"
            startContent={
              <>
                <SidebarIconButton hideOnGroupHover>
                  <RiFile2Fill />
                </SidebarIconButton>
                <CollapsibleTrigger asChild>
                  <SidebarIconButton
                    showOnGroupHoverOnly
                    className="data-[state=closed]:-rotate-90"
                  >
                    <RiArrowDownSLine />
                  </SidebarIconButton>
                </CollapsibleTrigger>
              </>
            }
            endContent={
              <>
                <SidebarIconButton showOnGroupHoverOnly>
                  <RiMoreFill />
                </SidebarIconButton>
                <SidebarIconButton showOnGroupHoverOnly>
                  <RiAddLine />
                </SidebarIconButton>
              </>
            }
          >
            Item 1
          </ListboxItem>
        </Listbox>
        <CollapsibleContent asChild>
          <Collapsible>
            <Listbox>
              <ListboxItem
                key="item1"
                variant="flat"
                startContent={
                  <>
                    <SidebarItemLeftSpacer level={1} />
                    <SidebarIconButton hideOnGroupHover>
                      <RiFile2Fill />
                    </SidebarIconButton>
                    <CollapsibleTrigger asChild>
                      <SidebarIconButton
                        showOnGroupHoverOnly
                        className="data-[state=closed]:-rotate-90"
                      >
                        <RiArrowDownSLine />
                      </SidebarIconButton>
                    </CollapsibleTrigger>
                  </>
                }
                endContent={
                  <>
                    <SidebarIconButton showOnGroupHoverOnly>
                      <RiMoreFill />
                    </SidebarIconButton>
                    <SidebarIconButton showOnGroupHoverOnly>
                      <RiAddLine />
                    </SidebarIconButton>
                  </>
                }
              >
                Item 1
              </ListboxItem>
            </Listbox>
            <CollapsibleContent>
              <Listbox>
                <ListboxItem
                  key="item1"
                  variant="flat"
                  startContent={
                    <>
                      <SidebarItemLeftSpacer level={2} />
                      <SidebarIconButton hideOnGroupHover>
                        <RiFile2Fill />
                      </SidebarIconButton>
                      <SidebarIconButton
                        showOnGroupHoverOnly
                        className="data-[state=closed]:-rotate-90"
                      >
                        <RiArrowDownSLine />
                      </SidebarIconButton>
                    </>
                  }
                  endContent={
                    <>
                      <SidebarIconButton showOnGroupHoverOnly>
                        <RiMoreFill />
                      </SidebarIconButton>
                      <SidebarIconButton showOnGroupHoverOnly>
                        <RiAddLine />
                      </SidebarIconButton>
                    </>
                  }
                >
                  Item 1
                </ListboxItem>
              </Listbox>
            </CollapsibleContent>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
