import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { SidebarItem } from '../SidebarItem'
import { SidebarIconButton } from '../SidebarIconbutton'
import { RiAddFill, RiArrowDownSLine, RiFileFill, RiMoreLine } from 'react-icons/ri'
import { useSidebar } from '@/components/providers/sidebar'
import { useEffect, useMemo, useState } from 'react'
import { Page } from '@/schema/page'
import { SidebarItemLeftSpacer } from '../SidebarItemLeftSpacer'
import { ICreatingPage, useCreatePageContext } from '@/components/providers/newpage'
import { usePersistCollapseContext } from '@/components/providers/collapse'
import { PageCreateButton } from './PageCreateButton'
import { PageActionMenu } from '@/components/page/PageActionMenu/PageActionMenu'
import { useParams, useRouter } from 'next/navigation'
import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { useMutationState } from '@tanstack/react-query'
import { MUTATION_KEYS } from '@/mutation/keys'

export const SidebarOrgPages = () => {
  const { orgPages } = useSidebar()
  const { onOpenCreatePage, creatingPages, selectedParent } = useCreatePageContext()
  const [isExpanded, setIsExpanded] = useState(true)

  const isRenderCreatingPage = selectedParent === undefined

  const creatPagesData = useMemo(() => {
    return creatingPages.filter((page) => page.input.parent_page_pkid === undefined)
  }, [creatingPages])

  const outerPages = useMemo(() => {
    return orgPages?.list?.filter(
      (page) => !page.parent_page_pkid && !page.archived_at,
    )
    // FIXME: add handle pages
    return []
  }, [orgPages])

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger asChild>
        <SidebarItem
          endContent={
            <SidebarIconButton
              showOnGroupHoverOnly
              onClick={() => {
                onOpenCreatePage()
                setIsExpanded(true)
              }}
            >
              <RiAddFill />
            </SidebarIconButton>
          }
        >
          Documents
        </SidebarItem>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ActiveCreatingPageItem />
        {creatPagesData?.map((toCreate) => (
          <CreatingSidebarPageItem key={toCreate.id} data={toCreate} />
        ))}
        {outerPages?.map((page) => (
          <SidebarPageItem key={page.id} page={page} level={0} />
        ))}
        {!isRenderCreatingPage && !creatPagesData.length && (outerPages?.length ?? 0) === 0 && (
          <PageCreateButton />
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

interface SidebarPageItemProps {
  page: Page
  level?: number
}

export const SidebarPageItem = ({ page, level = 0 }: SidebarPageItemProps) => {
  const router = useRouter()
  const { orgPages } = useSidebar()
  const { organization } = useOrganization()
  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()
  const [isExpanded, setIsExpanded] = useState(getCollapseState(`page-${page.pkid}`))
  const { pageID } = useParams<Partial<OrganizationPageParams>>()
  const archiveStatus = useMutationState({
    filters: {
      mutationKey: MUTATION_KEYS.ARCHIVE_PAGE({ id: page.id }),
    },
    select: (state) => state.state.status,
  })

  const disabled = archiveStatus.includes('pending')

  const { creatingPages, onOpenCreatePage, selectedParent } = useCreatePageContext()

  const onSelectPage = (selectedPageID: string) => {
    router.push(
      ROUTES.ORGANIZATION_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: selectedPageID,
      }),
    )
  }

  const isRenderCreatingPage =
    selectedParent?.pkid === page.pkid

  const toCreatPages = useMemo(() => {
    return creatingPages.filter(
      (p) => p.input.parent_page_pkid === page.pkid
    )
  }, [creatingPages, page.pkid])

  const childPages = useMemo(() => {
    return orgPages?.list.filter((p) => p.parent_page_pkid === page.pkid && !p.archived_at)
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
      <SidebarItem
        onClick={(e) => {
          if (disabled) return
          e.stopPropagation()
          e.preventDefault()
          onSelectPage(page.id)
        }}
        isDisabled={disabled}
        isSelected={pageID === page.id}
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
          <>
            <div onClick={(e) => e.stopPropagation()}>
              {/* Prevents the click event from bubbling up to the parent */}
              <PageActionMenu page={page}>
                <SidebarIconButton showOnGroupHoverOnly>
                  <RiMoreLine />
                </SidebarIconButton>
              </PageActionMenu>
            </div>
            <SidebarIconButton
              showOnGroupHoverOnly
              onClick={() => {
                onOpenCreatePage(page)
                setIsExpanded(true)
              }}
            >
              <RiAddFill />
            </SidebarIconButton>
          </>
        }
      >
        {page.name || 'Untitled'}
      </SidebarItem>

      <CollapsibleContent>
        <ActiveCreatingPageItem
          level={level + 1}
          parentPagePkID={page.pkid}
        />
        {toCreatPages.map((p) => (
          <CreatingSidebarPageItem key={p.id} data={p} level={level + 1} />
        ))}
        {childPages?.map((childPage) => (
          <SidebarPageItem key={childPage.id} page={childPage} level={level + 1} />
        ))}
        {!isRenderCreatingPage && !toCreatPages.length && childPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={level + 1} />}>
            <span className="text-sm text-gray-500">No pages inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

interface CreatingSidebarPageItemProps {
  data: ICreatingPage
  level?: number
}

export const CreatingSidebarPageItem = (props: CreatingSidebarPageItemProps) => {
  const { data, level = 0 } = props

  const { doneCreatingPage } = useCreatePageContext()
  const { orgPages } = useSidebar()

  const isRenderedOnScreen = useMemo(() => {
    return Boolean(data.result) && orgPages?.map[data.result?.pkid ?? -1]
  }, [data.result, orgPages?.map])

  useEffect(() => {
    if (isRenderedOnScreen) {
      doneCreatingPage(data.id)
    }
  })

  if (isRenderedOnScreen) {
    return null
  }

  return (
    <SidebarItem
      disabled
      startContent={
        <>
          <SidebarItemLeftSpacer level={level} />
          <SidebarIconButton>
            <RiFileFill />
          </SidebarIconButton>
        </>
      }
    >
      {data.input.name || 'Untitled'}
    </SidebarItem>
  )
}

export const ActiveCreatingPageItem = (props: {
  level?: number
  parentPagePkID?: number
}) => {
  const { level = 0, parentPagePkID } = props
  const {
    createPageData,
    creatingPages,
    createID,
    isOpenCreatePage,
    selectedParent,
  } = useCreatePageContext()

  const isModifying = useMemo(
    () => !creatingPages.find((p) => p.id === createID),
    [createID, creatingPages],
  )

  if (selectedParent?.pkid !== parentPagePkID) {
    return null
  }

  if (!isOpenCreatePage || !isModifying) {
    return null
  }

  return (
    <SidebarItem
      className="!opacity-70"
      disabled
      startContent={
        <>
          <SidebarItemLeftSpacer level={level} />
          <SidebarIconButton>
            <RiFileFill />
          </SidebarIconButton>
        </>
      }
    >
      {createPageData?.name || 'Untitled'}
    </SidebarItem>
  )
}
