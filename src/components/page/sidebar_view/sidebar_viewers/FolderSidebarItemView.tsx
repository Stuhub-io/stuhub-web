import { useEffect, useMemo, useState } from 'react'
import { BaseSidebarViewerProps } from '../type'
import { usePersistCollapseContext } from '@/components/providers/collapse'
import { useParams, useRouter } from 'next/navigation'
import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import { MUTATION_KEYS, QUERY_KEYS } from '@/mutation/keys'
import { useMutationState, useQueryClient } from '@tanstack/react-query'
import { useCreatePageContext } from '@/components/providers/newpage'
import { useSidebar } from '@/components/providers/sidebar'
import { PopperContentTrigger } from '@/components/common/PopoverTrigger'
import { SidebarItem, SidebarItemLeftSpacer, SidebarIconButton } from '@/components/common/Sidebar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { RiFolderOpenFill, RiFolder3Fill, RiMoreLine, RiAddFill } from 'react-icons/ri'
import { PageCreateMenu } from '../../common/PageCreateMenu'
import { PageActionMenuView } from '../../menu_view/MenuView'
import { useOrganization } from '@/components/providers/organization'

export const FolderSidebarItemView = (props: BaseSidebarViewerProps) => {
  const {
    page,
    level = 0,
    CreatingPageItemView,
    ActiveCreatingPageItem,
    SidebarPageItemViewer,
  } = props
  const { getChildrenPageByPkID } = useSidebar()
  const { organization } = useOrganization()

  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()
  const [isExpanded, setIsExpanded] = useState(getCollapseState(`page-${page.pkid}`))
  const router = useRouter()

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
    return getChildrenPageByPkID(page.pkid)
  }, [getChildrenPageByPkID, page.pkid])

  useEffect(() => {
    persistCollapseData(`page-${page.pkid}`, isExpanded)
  }, [isExpanded, page.pkid, persistCollapseData])

  const onSelectPage = (selectedPageID: string) => {
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: selectedPageID,
      }),
    )
  }
  const queryClient = useQueryClient()

  const onSuccessUpdated = () => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.GET_PAGE({
        pageID: page.id,
      }),
    })
  }

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={(open) => {
        setIsExpanded(open)
      }}
    >
      <SidebarItem
        onClick={() => {
          if (disabled) return
          onSelectPage(page.id)
        }}
        isDisabled={disabled}
        isSelected={pageID === page.id}
        startContent={
          <>
            <SidebarItemLeftSpacer level={level} />
            <CollapsibleTrigger asChild>
              <SidebarIconButton>
                {isExpanded ? (
                  <RiFolderOpenFill className="text-success" />
                ) : (
                  <RiFolder3Fill className="text-success" />
                )}
              </SidebarIconButton>
            </CollapsibleTrigger>
          </>
        }
        endContent={
          <>
            <div onClick={(e) => e.stopPropagation()}>
              {/* Prevents the click event from bubbling up to the parent */}
              <PageActionMenuView page={page} onSuccess={onSuccessUpdated}>
                <SidebarIconButton showOnGroupHoverOnly>
                  <RiMoreLine />
                </SidebarIconButton>
              </PageActionMenuView>
            </div>
            <PopperContentTrigger>
              <SidebarIconButton showOnGroupHoverOnly>
                <RiAddFill />
              </SidebarIconButton>
              <PageCreateMenu
                parentPage={page}
                onClose={() => {
                  setIsExpanded(true)
                }}
              />
            </PopperContentTrigger>
          </>
        }
      >
        {page.name || 'Untitled'}
      </SidebarItem>

      <CollapsibleContent>
        {ActiveCreatingPageItem && (
          <ActiveCreatingPageItem parentPagePkID={page.pkid} level={level + 1} />
        )}
        {CreatingPageItemView &&
          Boolean(toCreatPages.length) &&
          toCreatPages.map((p) => <CreatingPageItemView key={p.id} data={p} level={level + 1} />)}

        {childPages?.map((childPage) => {
          return (
            <SidebarPageItemViewer
              key={childPage.id}
              page={childPage}
              level={level + 1}
              SidebarPageItemViewer={SidebarPageItemViewer}
            />
          )
        })}
        {!isRenderCreatingPage && !toCreatPages.length && childPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={level + 1} />}>
            <span className="text-sm text-gray-500">No folder inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
