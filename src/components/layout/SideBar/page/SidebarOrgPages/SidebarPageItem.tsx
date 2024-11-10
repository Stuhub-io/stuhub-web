import { PageActionMenu } from '@/components/page/PageActionMenu'
import { useOrganization } from '@/components/providers/organization'
import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import { MUTATION_KEYS } from '@/mutation/keys'
import { Page } from '@/schema/page'
import { useMutationState } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { RiFileLine, RiMoreLine } from 'react-icons/ri'
import { SidebarIconButton } from '../../SidebarIconbutton'
import { SidebarItem } from '../../SidebarItem'
import { SidebarItemLeftSpacer } from '../../SidebarItemLeftSpacer'

export interface SidebarPageItemProps {
  page: Page
  level?: number
}

export const SidebarPageItem = ({ page, level = 0 }: SidebarPageItemProps) => {
  const router = useRouter()
  const { organization } = useOrganization()

  const { pageID } = useParams<Partial<OrganizationPageParams>>()
  const archiveStatus = useMutationState({
    filters: {
      mutationKey: MUTATION_KEYS.ARCHIVE_PAGE({ id: page.id }),
    },
    select: (state) => state.state.status,
  })

  const disabled = archiveStatus.includes('pending')

  const onSelectPage = (selectedPageID: string) => {
    router.push(
      ROUTES.ORGANIZATION_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: selectedPageID,
      }),
    )
  }

  return (
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
          <SidebarIconButton>
            <RiFileLine />
          </SidebarIconButton>
        </>
      }
      endContent={
        <div onClick={(e) => e.stopPropagation()}>
          {/* Prevents the click event from bubbling up to the parent */}
          <PageActionMenu page={page}>
            <SidebarIconButton showOnGroupHoverOnly>
              <RiMoreLine />
            </SidebarIconButton>
          </PageActionMenu>
        </div>
      }
    >
      {page.name || 'Untitled'}
    </SidebarItem>
  )
}
