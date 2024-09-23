import { Space } from '@/schema/space'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { SidebarItem } from '../SidebarItem'
import { SidebarIconButton } from '../SidebarIconbutton'
import { RiAddFill, RiArrowDownSLine, RiFileFill, RiMoreLine } from 'react-icons/ri'
import { useSidebar } from '@/components/providers/sidebar'
import { useEffect, useMemo, useState } from 'react'
import { Page } from '@/schema/page'
import { SidebarItemLeftSpacer } from '../SidebarItemLeftSpacer'
import { ICreatingPage, useCreatePageContext } from '@/components/providers/newpage'
import { usePageContext } from '@/components/providers/page'
import { usePersistCollapseContext } from '@/components/providers/collapse'
import { PoperContentTrigger } from '@/components/common/PopoverTrigger'
import { PageMoreMenuPopoverContent } from '@/components/page/PageMoreMenuPopover'

interface SpaceItemProps {
  space: Space
}

export const SpaceItem = (props: SpaceItemProps) => {
  const { space } = props

  const { privatePages } = useSidebar()
  const { onOpenCreatePage, creatingPages, selectedParent, selectedSpace } = useCreatePageContext()
  const [isExpanded, setIsExpanded] = useState(true)

  const isRenderCreatingPage = selectedParent === undefined && selectedSpace?.pk_id === space.pk_id

  const creatPagesData = useMemo(() => {
    return creatingPages.filter(
      (page) =>
        page.input.space_pk_id === space.pk_id && page.input.parent_page_pk_id === undefined,
    )
  }, [creatingPages, space.pk_id])

  const outerPages = useMemo(() => {
    if (space.is_private) {
      return privatePages?.list?.filter(
        (page) => page.space_pkid === space.pk_id && !page.parent_page_pkid,
      )
    }
    // FIXME: add handle pages
    return []
  }, [privatePages, space?.is_private, space.pk_id])

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <CollapsibleTrigger asChild>
        <SidebarItem
          endContent={
            <SidebarIconButton
              showOnGroupHoverOnly
              onClick={() => {
                onOpenCreatePage(space, undefined)
                setIsExpanded(true)
              }}
            >
              <RiAddFill />
            </SidebarIconButton>
          }
        >
          {space.is_private ? 'Private' : space.name}
        </SidebarItem>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ActiveCreatingPageItem spacePkID={space.pk_id} />
        {creatPagesData?.map((toCreate) => (
          <CreatingSidebarPageItem key={toCreate.id} data={toCreate} />
        ))}
        {outerPages?.map((page) => (
          <SidebarPageItem space={space} key={page.id} page={page} level={0} />
        ))}
        {!isRenderCreatingPage && !creatPagesData.length && outerPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={0} />}>
            <span className="text-sm text-gray-500">No pages inside</span>
          </SidebarItem>
        )}
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
  const { privatePages } = useSidebar()
  const { getCollapseState, persistCollapseData } = usePersistCollapseContext()
  const [isExpanded, setIsExpanded] = useState(getCollapseState(`page-${page.pk_id}`))

  const { creatingPages, onOpenCreatePage, selectedParent, selectedSpace } = useCreatePageContext()
  const { onSelectPage, currentPage } = usePageContext()

  const isRenderCreatingPage =
    selectedParent?.pk_id === page.pk_id && selectedSpace?.pk_id === space.pk_id

  const toCreatPages = useMemo(() => {
    return creatingPages.filter(
      (p) => p.input.parent_page_pk_id === page.pk_id && p.input.space_pk_id === space.pk_id,
    )
  }, [creatingPages, page.pk_id, space.pk_id])

  const childPages = useMemo(() => {
    return privatePages?.list.filter((p) => p.parent_page_pkid === page.pk_id)
  }, [page.pk_id, privatePages])

  useEffect(() => {
    persistCollapseData(`page-${page.pk_id}`, isExpanded)
  }, [isExpanded, page.pk_id, persistCollapseData])

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={(open) => {
        setIsExpanded(open)
      }}
    >
      <SidebarItem
        onClick={() => {
          onSelectPage(page)
        }}
        isSelected={page.pk_id === currentPage?.pk_id}
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
            <PoperContentTrigger>
              <SidebarIconButton showOnGroupHoverOnly>
                <RiMoreLine />
              </SidebarIconButton>
              <PageMoreMenuPopoverContent />
            </PoperContentTrigger>
            <SidebarIconButton
              showOnGroupHoverOnly
              onClick={() => {
                onOpenCreatePage(space, page)
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
          parentPagePkID={page.pk_id}
          spacePkID={space.pk_id}
        />
        {toCreatPages.map((p) => (
          <CreatingSidebarPageItem key={p.id} data={p} level={level + 1} />
        ))}
        {childPages?.map((childPage) => (
          <SidebarPageItem space={space} key={childPage.id} page={childPage} level={level + 1} />
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
  const { privatePages } = useSidebar()

  const isRenderedOnScreen = useMemo(() => {
    return Boolean(data.result) && privatePages?.map[data.result?.pk_id ?? -1]
  }, [data.result, privatePages?.map])

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
      {data.input.name}
    </SidebarItem>
  )
}

export const ActiveCreatingPageItem = (props: {
  level?: number
  parentPagePkID?: number
  spacePkID: number
}) => {
  const { level = 0, parentPagePkID, spacePkID } = props
  const {
    createPageData,
    creatingPages,
    createID,
    isOpenCreatePage,
    selectedParent,
    selectedSpace,
  } = useCreatePageContext()

  const isModifying = useMemo(
    () => !creatingPages.find((p) => p.id === createID),
    [createID, creatingPages],
  )

  if (selectedParent?.pk_id !== parentPagePkID || selectedSpace?.pk_id !== spacePkID) {
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
