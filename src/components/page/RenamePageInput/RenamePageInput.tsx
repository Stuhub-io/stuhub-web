import { FormInput } from '@/components/common/Form/FormInput'
import { useSidebar } from '@/components/providers/sidebar'
import { useToast } from '@/hooks/useToast'
import { QUERY_KEYS } from '@/mutation/keys'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { Page } from '@/schema/page'
import { Button } from '@nextui-org/react'
import { useQueryClient } from '@tanstack/react-query'
import { ComponentRef, forwardRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RiFile2Fill } from 'react-icons/ri'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
})

type RenamePageInputForm = z.infer<typeof schema>

interface RenamePageInputProps {
  page: Page
  onClose: () => void
}

export const RenamePageInput = forwardRef<ComponentRef<'form'>, RenamePageInputProps>(
  (props, ref) => {
    const { page, onClose } = props
    const { toast } = useToast()
    const { refreshPrivatePages, privateSpace } = useSidebar()
    const queryClient = useQueryClient()

    const { mutateAsync: updatePage, isPending } = useUpdatePage({
      id: page.id,
    })

    const formInstance = useForm<RenamePageInputForm>({
      defaultValues: {
        name: page.name ?? '',
      },
    })

    const handleSubmit = formInstance.handleSubmit(async (data) => {
      try {
        onClose()
        await updatePage({
          name: data.name,
          parent_page_pk_id: page.parent_page_pkid,
          uuid: page.id,
          view_type: page.view_type,
        })

        if (page.space_pkid === privateSpace?.pk_id) {
          refreshPrivatePages()
        }
        
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_PAGE({
            pageID: page.id,
          }),
        })
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to rename page',
        })
      }
    })
    return (
      <form
        className="flex items-center gap-2 rounded-medium bg-content1 p-2"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <FormProvider {...formInstance}>
          <Button isIconOnly size="sm">
            <RiFile2Fill size={16} />
          </Button>
          <FormInput autoFocus name="name" disabled={isPending} size="sm" className="w-[200px]" />
        </FormProvider>
      </form>
    )
  },
)

RenamePageInput.displayName = 'RenamePageInput'
