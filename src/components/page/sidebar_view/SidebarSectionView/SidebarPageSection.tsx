import { PopperContentTrigger } from '@/components/common/PopoverTrigger'
import { SidebarItem, SidebarIconButton } from '@/components/common/Sidebar'
import { useCreatePageContext } from '@/components/providers/newpage'
import { useSidebar } from '@/components/providers/sidebar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { useState, useMemo } from 'react'
import { RiAddFill, RiArrowRightSLine, RiHardDrive2Fill } from 'react-icons/ri'
import { PageCreateMenu } from '../../common/PageCreateMenu'
import { PageCreateButton } from '../PageCreateButton'
import { CreatingSidebarPageItem } from '../PageCreatingItemView'
import { SidebarPageItemView } from '../SidebarPageItemView'
import { ActiveCreatingPageItem } from '../ActiveCreatingPageItemView'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'

export const SidebarPageSectionView = () => {
  const { orgPages } = useSidebar()
  const { creatingPages, isOpenCreateDoc } = useCreatePageContext()
  const [isExpanded, setIsExpanded] = useState(true)
  const { organization } = useOrganization()

  const router = useRouter()

  const createPagesData = useMemo(() => {
    return creatingPages.filter((page) => page.input.parent_page_pkid === undefined)
  }, [creatingPages])

  const outerPages = useMemo(() => {
    return orgPages?.list?.filter((page) => !page.parent_page_pkid && !page.archived_at)
  }, [orgPages])

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <SidebarItem
        onClick={() => {
          router.push(ROUTES.ROOT_VAULTS({
            orgSlug: organization?.slug ?? '',
          }))
        }}
        startContent={
          <>
            <SidebarIconButton hideOnGroupHover>
              <RiHardDrive2Fill size={16} />
            </SidebarIconButton>
            <CollapsibleTrigger asChild>
              <SidebarIconButton showOnGroupHoverOnly className=" data-[state=open]:rotate-90 ">
                <RiArrowRightSLine size={16} />
              </SidebarIconButton>
            </CollapsibleTrigger>
          </>
        }
        endContent={
          <PopperContentTrigger>
            <SidebarIconButton showOnGroupHoverOnly>
              <RiAddFill />
            </SidebarIconButton>
            <PageCreateMenu
              onClose={() => {
                setIsExpanded(true)
              }}
            />
          </PopperContentTrigger>
        }
      >
        My Vault
      </SidebarItem>
      <CollapsibleContent>
        <ActiveCreatingPageItem />
        {createPagesData?.map((toCreate) => (
          <CreatingSidebarPageItem key={toCreate.id} data={toCreate} level={0} />
        ))}
        {outerPages?.map((page) => {
          return (
            <SidebarPageItemView
              key={page.id}
              page={page}
              level={1}
              ActiveCreatingPageItem={ActiveCreatingPageItem}
              CreatingPageItemView={CreatingSidebarPageItem}
              SidebarPageItemViewer={SidebarPageItemView}
            />
          )
        })}
        {!isOpenCreateDoc && !createPagesData.length && (outerPages?.length ?? 0) === 0 && (
          <PageCreateButton />
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
