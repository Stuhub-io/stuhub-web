import { PageActionMenu } from '@/components/page/PageActionMenu'
import { usePersistCollapseContext } from '@/components/providers/collapse'
import { useCreatePageContext } from '@/components/providers/newpage'
import { useSidebar } from '@/components/providers/sidebar'
import { OrganizationPageParams } from '@/constants/routes'
import { MUTATION_KEYS } from '@/mutation/keys'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { useMutationState } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import { RiMoreLine, RiAddFill, RiFolder3Fill, RiFolderOpenFill } from 'react-icons/ri'
import { SidebarIconButton } from '../../SidebarIconbutton'
import { SidebarItem } from '../../SidebarItem'
import { SidebarItemLeftSpacer } from '../../SidebarItemLeftSpacer'
import { ActiveCreatingPageItem, CreatingSidebarPageItem } from './SidebarOrgPages'
import { SidebarPageItem } from './SidebarPageItem'
import { PoperContentTrigger } from '@/components/common/PopoverTrigger'
import { PageCreateMenu } from '@/components/page/PageCreateMenu'

export interface SidebarFolderItemProps {
  page: Page
  level?: number
}

export const SidebarFolderItem = ({ page, level = 0 }: SidebarFolderItemProps) => {
  const { orgPages } = useSidebar()
  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()

  const [isExpanded, setIsExpanded] = useState(getCollapseState(`page-${page.pkid}`))

  const { pageID } = useParams<Partial<OrganizationPageParams>>()

  // is archiving this page
  const archiveStatus = useMutationState({
    filters: {
      mutationKey: MUTATION_KEYS.ARCHIVE_PAGE({ id: page.id }),
    },
    select: (state) => state.state.status,
  })

  const disabled = archiveStatus.includes('pending')

  const { creatingPages, selectedParent } = useCreatePageContext()

  const isRenderCreatingPage = selectedParent?.pkid === page.pkid

  const toCreatPages = useMemo(() => {
    return creatingPages.filter((p) => p.input.parent_page_pkid === page.pkid)
  }, [creatingPages, page.pkid])

  const childPages = useMemo(() => {
    if (!orgPages) return []
    const childPagePkIDs = orgPages.map[page.pkid]?.childrenPkids ?? []
    const children = childPagePkIDs?.map((pkid) => orgPages.map[pkid].page)
    return children.filter((p) => !p?.archived_at)
  }, [page.pkid, orgPages])

  useEffect(() => {
    persistCollapseData(`page-${page.pkid}`, isExpanded)
  }, [isExpanded, page.pkid, persistCollapseData])

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={(open) => {
        setIsExpanded(open)
      }}
    >
      <CollapsibleTrigger asChild>
        <SidebarItem
          onClick={() => {
            if (disabled) return
          }}
          isDisabled={disabled}
          isSelected={pageID === page.id}
          startContent={
            <>
              <SidebarItemLeftSpacer level={level} />
              <SidebarIconButton color="primary" variant="faded">
                {isExpanded ? <RiFolderOpenFill /> : <RiFolder3Fill />}
              </SidebarIconButton>
            </>
          }
          endContent={
            <>
              <div onClick={(e) => e.stopPropagation()}>
                {/* Prevents the click event from bubbling up to the parent */}
                <PageActionMenu page={page}>
                  <SidebarIconButton showOnGroupHoverOnly>
                    <RiMoreLine />
                  </SidebarIconButton>
                </PageActionMenu>
              </div>
              <PoperContentTrigger>
                <SidebarIconButton showOnGroupHoverOnly>
                  <RiAddFill />
                </SidebarIconButton>
                <PageCreateMenu
                  parentPage={page}
                  onClose={() => {
                    setIsExpanded(true)
                  }}
                />
              </PoperContentTrigger>
            </>
          }
        >
          {page.name || 'Untitled'}
        </SidebarItem>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <ActiveCreatingPageItem level={level + 1} parentPagePkID={page.pkid} />
        {toCreatPages.map((p) => (
          <CreatingSidebarPageItem key={p.id} data={p} level={level + 1} />
        ))}
        {childPages?.map((childPage) => {
          if (childPage.view_type === PageViewTypeEnum.DOCUMENT) {
            return <SidebarPageItem key={childPage.id} page={childPage} level={level + 1} />
          }
          return <SidebarFolderItem key={childPage.id} page={childPage} level={level + 1} />
        })}
        {!isRenderCreatingPage && !toCreatPages.length && childPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={level + 1} />}>
            <span className="text-sm text-gray-500">No pages inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
