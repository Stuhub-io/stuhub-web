import { RiAddFill } from 'react-icons/ri'
import { SidebarItem, SidebarIconButton } from '@/components/common/Sidebar'
import { useToast } from '@/hooks/useToast'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { AiOutlineLoading } from 'react-icons/ai'
import { useCreatePage } from '@/mutation/mutator/page/useCreatePage'
import { PageViewTypeEnum } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'

interface PageCreateButtonProps {
  parentPagePkId?: number
}

export const PageCreateButton = (props: PageCreateButtonProps) => {
  const { parentPagePkId } = props
  const { toast } = useToast()
  const { push } = useRouter()
  const { organization } = useOrganization()
  const { refreshOrgPages } = useSidebar()

  const { mutateAsync, isPending } = useCreatePage({
    parent_page_pkid: parentPagePkId,
    org_pkid: organization?.pkid ?? -1,
    tempId: 'create-with-add-button',
  })

  const onClick = async () => {
    try {
      const {
        data: newPage
      } = await mutateAsync({
        name: '',
        parent_page_pkid: parentPagePkId,
        org_pkid: organization?.pkid ?? -1,
        view_type: PageViewTypeEnum.DOCUMENT,
        cover_image: '',
        document: {
          json_content: '{}',
        }
      })
      refreshOrgPages()
      push(
        ROUTES.VAULT_PAGE({
          orgSlug: organization?.slug ?? '',
          pageID: newPage.id,
        }),
      )
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Failed to create page',
      })
    }
  }

  return (
    <SidebarItem onClick={onClick} disabled={isPending}>
      <div className="flex items-center gap-1">
        <SidebarIconButton>
          {isPending ? <AiOutlineLoading className="animate-spin" /> : <RiAddFill />}
        </SidebarIconButton>
        <span className=" truncate">Add new document</span>
      </div>
    </SidebarItem>
  )
}
