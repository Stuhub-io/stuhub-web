import { RiAddFill } from 'react-icons/ri'
import { SidebarItem } from '../SidebarItem'
import { SidebarIconButton } from '../SidebarIconbutton'
import { useCreateDocument } from '@/mutation/mutator/document/useCreateDocument'
import { useToast } from '@/hooks/useToast'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { AiOutlineLoading } from 'react-icons/ai'

interface PageCreateButtonProps {
  parentPagePkId?: number
  spacePkId: number
}
export const PageCreateButton = (props: PageCreateButtonProps) => {
  const { parentPagePkId, spacePkId } = props
  const { toast } = useToast()
  const { push } = useRouter()
  const { organization } = useOrganization()

  const { mutateAsync, isPending } = useCreateDocument({
    parent_page_pkid: parentPagePkId,
    space_pkid: spacePkId,
    tempId: 'create-with-add-button',
  })

  const onClick = async () => {
    try {
      const {
        data: { page: newPage },
      } = await mutateAsync({
        json_content: '{}',
        page: {
          name: '',
          parent_page_pkid: parentPagePkId,
          space_pkid: spacePkId,
          view_type: 'document',
        },
      })
      push(
        ROUTES.ORGANIZATION_PAGE({
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
        <span className=" truncate">Add new page</span>
      </div>
    </SidebarItem>
  )
}
