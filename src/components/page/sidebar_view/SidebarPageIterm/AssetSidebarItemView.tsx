import { useParams, useRouter } from 'next/navigation'
import { BaseSidebarViewerProps } from './type'
import { SidebarItem, SidebarItemLeftSpacer, SidebarIconButton } from '@/components/common/Sidebar'
import { useOrganization } from '@/components/providers/organization'
import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import { MUTATION_KEYS } from '@/mutation/keys'
import { useMutationState } from '@tanstack/react-query'
import { RiMoreLine } from 'react-icons/ri'
import { PageMenu } from '../../PageMenu'
import { getIconByExtension } from '@/utils/file'

export const AssetSidebarItemView = (props: BaseSidebarViewerProps) => {
  const { page, level = 0, parentPage } = props
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
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: selectedPageID,
      }),
    )
  }

  const Icon = getIconByExtension(page?.asset?.extension ?? "")
  

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
            <Icon size={16} width={16} height={16} />
          </SidebarIconButton>
        </>
      }
      endContent={
        <div onClick={(e) => e.stopPropagation()}>
          {/* Prevents the click event from bubbling up to the parent */}
          <PageMenu page={page} parentPage={parentPage}>
            <SidebarIconButton showOnGroupHoverOnly>
              <RiMoreLine />
            </SidebarIconButton>
          </PageMenu>
        </div>
      }
    >
      {page.name || 'Untitled'}
    </SidebarItem>
  )
}
