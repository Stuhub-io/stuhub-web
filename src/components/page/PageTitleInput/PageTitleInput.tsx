import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { useSidebar } from '@/components/providers/sidebar'
import { useDebouncedCallback } from 'use-debounce'
import { useToast } from '@/hooks/useToast'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { Page } from '@/schema/page'
import { Button, Skeleton } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { RiUserSmileFill, RiImage2Fill } from 'react-icons/ri'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { usePrevious } from '@/hooks/usePrev'

export interface PageTitleProps {
  page?: Page
  loading?: boolean
}

export const PageTitle = (props: PageTitleProps) => {
  const { page, loading } = props

  const [title, setTitle] = useState(page?.name ?? 'Untitled')
  const [isFocus, setFocus] = useState(false)
  const prevFocus = usePrevious(isFocus)

  const { refreshPrivatePages, privateSpace } = useSidebar()
  const { mutateAsync: updatePage } = useUpdatePage({ id: page?.id ?? '' })
  const { isRefetching } = useFetchPage({
    pageID: page?.id ?? '',
  })
  const prevRefetching = usePrevious(isRefetching)

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const thorttleUpdateTitle = useDebouncedCallback(
    async () => {
      if (!page) return
      if (!focus && !prevFocus) return
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

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_PAGE({
            pageID: page.id,
          }),
        })
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to update page',
        })
      }
    },
    500,
    {
      trailing: true,
    },
  )

  useEffect(() => {
    // reset title on page data changed
    if (!prevFocus && !isFocus && prevRefetching) {
      setTitle(page?.name ?? 'Untitled')
    }
  }, [isFocus, page?.name, prevFocus, prevRefetching, title])

  useEffect(() => {
    thorttleUpdateTitle()
  }, [thorttleUpdateTitle, title])

  return (
    <div className="group">
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
          disabled={isRefetching && !isFocus}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
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
