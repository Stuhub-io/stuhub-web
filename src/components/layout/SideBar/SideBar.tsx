'use client'
import { cn } from '@/libs/utils'
import {
  RiAddLine,
  RiArrowDownSLine,
  RiChat1Line,
  RiFile2Fill,
  RiFile2Line,
  RiHomeLine,
  RiMoreFill,
  RiSearchLine,
} from 'react-icons/ri'
import { SidebarIconButton } from './SidebarIconbutton'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/common/Collapsible'
import { SidebarItemLeftSpacer } from './SidebarItemLeftSpacer'
import { SidebarItem } from './SidebarItem'
import { SidebarOrgSwitcher } from './SidebarOrgSwitcher'

export const SideBar = () => {
  return (
    <div className={cn('h-full w-full', 'border-r border-r-divider', 'p-2')}>
      <div className="mb-2 w-full">
        <SidebarOrgSwitcher />
      </div>
      <div className="mb-4 w-full space-y-1">
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <RiSearchLine />
            </SidebarIconButton>
          }
        >
          Search
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <RiHomeLine />
            </SidebarIconButton>
          }
        >
          Home
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <RiChat1Line />
            </SidebarIconButton>
          }
        >
          Chats
        </SidebarItem>
        <SidebarItem
          startContent={
            <SidebarIconButton>
              <RiChat1Line />
            </SidebarIconButton>
          }
        >
          Settings & Members
        </SidebarItem>
      </div>
      <div className="space-y-1">
        <Collapsible>
          <SidebarItem
            key="item1"
            startContent={
              <>
                <SidebarIconButton hideOnGroupHover>
                  <RiFile2Line />
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
          </SidebarItem>
          <CollapsibleContent asChild>
            <Collapsible>
              <SidebarItem
                key="item1"
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
              </SidebarItem>
              <CollapsibleContent>
                <SidebarItem
                  key="item1"
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
                </SidebarItem>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
