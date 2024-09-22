import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { useSidebar } from '@/components/providers/sidebar'
import { useThrottledCallback } from 'use-debounce'
import { useToast } from '@/hooks/useToast'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { Page } from '@/schema/page'
import { Button, Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { RiUserSmileFill, RiImage2Fill } from 'react-icons/ri'

export interface PageTitleProps {
  page?: Page
  loading?: boolean
}

export const PageTitle = (props: PageTitleProps) => {
  const { page, loading } = props
  const [title, setTitle] = useState(page?.name ?? 'Untitled')
  const { refreshPrivatePages, privateSpace } = useSidebar()
  const { mutateAsync: updatePage } = useUpdatePage({ id: page?.id ?? '' })
  const { toast } = useToast()

  const thorttleUpdateTitle = useThrottledCallback(
    async () => {
      if (!page) return
      try {
        await updatePage({
          uuid: page.id,
          name: title,
          view_type: page.view_type,
          parent_page_pk_id: page.parent_page_pkid,
        })

        if (page.space_pkid === privateSpace?.pk_id) {
          refreshPrivatePages()
        }
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to update page',
        })
      }
    },
    1000,
    {
      trailing: true,
    },
  )

  useEffect(() => {
    thorttleUpdateTitle()
  }, [thorttleUpdateTitle, title])

  return (
    <div className='group'>
      <div className="h-8 opacity-0 transition duration-200 group-hover:opacity-100">
        {!loading && (
          <div className="hidden gap-1 opacity-60 group-hover:flex">
            <Button startContent={<RiUserSmileFill size={16} />} size="sm" variant="light">
              Add icons
            </Button>
            <Button startContent={<RiImage2Fill size={16} />} size="sm" variant="light">
              Add cover
            </Button>
          </div>
        )}
      </div>
      {loading ? (
        <div>
          <Skeleton className="h-[54px] w-[300px] rounded-medium" />
        </div>
      ) : (
        <TextAreaNoBackground
          minRows={1}
          placeholder="Untitled"
          value={title}
          onValueChange={setTitle}
          autoFocus
          classNames={{
            input: 'text-5xl font-semibold',
          }}
        />
      )}
    </div>
  )
}
