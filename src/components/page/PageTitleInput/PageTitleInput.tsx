import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { useDebounce } from '@/hooks/useDebounce'
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
  const { mutateAsync: updatePage } = useUpdatePage({ id: page?.id ?? '' })

  const debouncedTitle = useDebounce(title)

  useEffect(() => {
    if (!debouncedTitle || !page) return
    updatePage(
      {
        uuid: page.id,
        name: title,
        view_type: page.view_type,
        parent_page_pk_id: page.parent_page_pkid,
      },
      {
        onError: (e) => console.log(e),
      },
    )
  }, [debouncedTitle])

  return (
    <div>
      <div className="h-8 opacity-0 transition duration-200 group-hover:opacity-100">
        {!loading && (
          <div className="hidden gap-1 opacity-60 group-hover:flex">
            <Button startContent={<RiUserSmileFill size={16} />} size="sm" variant="light">
              Icons
            </Button>
            <Button startContent={<RiImage2Fill size={16} />} size="sm" variant="light">
              Icons
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
