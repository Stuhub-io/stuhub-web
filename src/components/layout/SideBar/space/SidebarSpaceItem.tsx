import { Space } from '@/schema/space'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { SidebarItem } from '../SidebarItem'
import { SidebarItemSkeleton } from '../SidebarItemSkeleton'
import { SidebarIconButton } from '../SidebarIconbutton'
import { RiAddFill, RiArrowDownSLine, RiFileLine } from 'react-icons/ri'
import { useCreatePage } from '@/mutation/mutator/page/useCreatePage'
import { useToast } from '@/hooks/useToast'
import { useSidebar } from '@/components/providers/sidebar'
import { useMemo, useState } from 'react'
import { Page } from '@/schema/page'
import { SidebarItemLeftSpacer } from '../SidebarItemLeftSpacer'

interface SpaceItemProps {
  space?: Space
}

export const SpaceItem = (props: SpaceItemProps) => {
  const { space } = props
  const isLoading = !space
  const { mutateAsync: createPage, isPending: isCreatingPage } = useCreatePage()
  const { refreshPrivatePages, privatePages } = useSidebar()
  const { toast } = useToast()

  const outerPages = useMemo(() => {
    return privatePages?.filter(
      (page) => page.space_pkid === space?.pk_id && !page.parent_page_pkid,
    )
  }, [privatePages, space?.pk_id])
  console.log('outerPages', outerPages)

  const onAddNewPage = async () => {
    try {
      await createPage({
        name: 'Untitled',
        space_pk_id: space?.pk_id ?? -1,
        view_type: 'document',
      })
      refreshPrivatePages()
    } catch (error) {
      toast({
        variant: 'danger',
        title: 'Failed to create page',
        description: "We couldn't create a new page. Please try again later.",
      })
    }
  }

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
        <SidebarItem
          endContent={
            <SidebarIconButton
              showOnGroupHoverOnly
              onClick={onAddNewPage}
              isLoading={isCreatingPage}
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
  const { mutateAsync: createPage, isPending: isCreatingPage } = useCreatePage()
  const { refreshPrivatePages, privatePages } = useSidebar()
  const [isExpanded, setIsExpanded] = useState(false)
  const { toast } = useToast()

  const childPages = useMemo(() => {
    return privatePages?.filter((p) => p.parent_page_pkid === page.pk_id)
  }, [page.pk_id, privatePages])

  const onAddNewPage = async () => {
    setIsExpanded(true)
    try {
      await createPage({
        name: 'Untitled',
        space_pk_id: space?.pk_id ?? -1,
        parent_page_pk_id: page.pk_id,
        view_type: 'document',
      })
      refreshPrivatePages()
    } catch (error) {
      toast({
        variant: 'danger',
        title: 'Failed to create page',
        description: "We couldn't create a new page. Please try again later.",
      })
    }
  }
  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={(open) => {
        setIsExpanded(open)
      }}
    >
      <SidebarItem
        startContent={
          <>
            <SidebarItemLeftSpacer level={level} />
            <SidebarIconButton hideOnGroupHover>
              <RiFileLine />
            </SidebarIconButton>
            <CollapsibleTrigger asChild>
              <SidebarIconButton showOnGroupHoverOnly className="data-[state=closed]:-rotate-90">
                <RiArrowDownSLine />
              </SidebarIconButton>
            </CollapsibleTrigger>
          </>
        }
        endContent={
          <SidebarIconButton showOnGroupHoverOnly onClick={onAddNewPage} isLoading={isCreatingPage}>
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
        {childPages?.length === 0 && (
          <SidebarItem startContent={<SidebarItemLeftSpacer level={level + 1} />}>
            <span className="text-sm text-gray-500">No pages inside</span>
          </SidebarItem>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
