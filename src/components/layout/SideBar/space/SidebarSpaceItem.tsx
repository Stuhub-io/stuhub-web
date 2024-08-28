import { Space } from '@/schema/space'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { SidebarItem } from '../SidebarItem'
import { SidebarItemSkeleton } from '../SidebarItemSkeleton'
import { SidebarIconButton } from '../SidebarIconbutton'
import { RiAddFill, RiArrowDownSLine, RiFileFill } from 'react-icons/ri'
import { useSidebar } from '@/components/providers/sidebar'
import { useEffect, useMemo, useState } from 'react'
import { Page } from '@/schema/page'
import { SidebarItemLeftSpacer } from '../SidebarItemLeftSpacer'
import { IToCreatePage, useCreatePageContext } from '@/components/providers/newpage'
import { useCreatePage } from '@/mutation/mutator/page/useCreatePage'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'

interface SpaceItemProps {
  space: Space
}

export const SpaceItem = (props: SpaceItemProps) => {
  const { space } = props
  const isLoading = !space

  const { privatePages } = useSidebar()
  const { onOpenCreatePage, toCreatePages } = useCreatePageContext()
  const [isExpanded, setIsExpanded] = useState(false)

  const pageToCreate = useMemo(() => {
    return toCreatePages.filter(
      (page) => page.space_pk_id === space.pk_id && page.parent_page_pk_id === undefined,
    )
  }, [space.pk_id, toCreatePages])

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
        {outerPages?.map((page) => (
          <SidebarPageItem space={space} key={page.id} page={page} level={0} />
        ))}
        {pageToCreate?.map((page) => <CreatingSidebarPageItem key={page.uniqID} data={page} />)}
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
  const { toCreatePages, onOpenCreatePage } = useCreatePageContext()

  const pagesToCreate = useMemo(() => {
    return toCreatePages.filter(
      (p) => p.parent_page_pk_id === page.pk_id && p.space_pk_id === space.pk_id,
    )
  }, [page.pk_id, space.pk_id, toCreatePages])

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
          <SidebarIconButton
            showOnGroupHoverOnly
            onClick={() => {
              onOpenCreatePage(space, page)
              setIsExpanded(true)
            }}
          >
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
        {pagesToCreate.map((p) => (
          <CreatingSidebarPageItem key={p.uniqID} data={p} level={level + 1} />
        ))}
        {!pagesToCreate.length && childPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={level + 1} />}>
            <span className="text-sm text-gray-500">No pages inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

interface CreatingSidebarPageItemProps {
  data: IToCreatePage
  level?: number
}

export const CreatingSidebarPageItem = (props: CreatingSidebarPageItemProps) => {
  const { data, level = 0 } = props
  const { mutateAsync: createPageAsync } = useCreatePage({
    parent_page_pk_id: data.parent_page_pk_id,
    space_pk_id: data.space_pk_id,
  })

  const { doneCreatePage } = useCreatePageContext()
  const { privatePages } = useSidebar()
  const [page, setPage] = useState<Page>()
  const queryClient = useQueryClient()

  const isRenderedOnScreen = useMemo(() => {
    return Boolean(page) && privatePages?.map[page?.pk_id ?? -1]
  }, [page, privatePages])

  useEffect(() => {
    if (!page) {
      (async () => {
        const resp = await createPageAsync({
          name: data.name,
          parent_page_pk_id: data.parent_page_pk_id,
          space_pk_id: data.space_pk_id,
          view_type: 'document',
        })
        setPage(resp.data)
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_SPACE_PAGES({ space_pk_id: data.space_pk_id }),
        })
      })()
    }
  }, [
    createPageAsync,
    data.name,
    data.parent_page_pk_id,
    data.space_pk_id,
    data.status,
    page,
    queryClient,
  ])

  useEffect(() => {
    if (isRenderedOnScreen) {
      doneCreatePage(data.uniqID)
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
      {data.name}
    </SidebarItem>
  )
}
