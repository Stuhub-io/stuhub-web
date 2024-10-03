import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { useSidebar } from '@/components/providers/sidebar'
import { useDebouncedCallback } from 'use-debounce'
import { useToast } from '@/hooks/useToast'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { Button, Skeleton } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RiUserSmileFill, RiImage2Fill } from 'react-icons/ri'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'

export interface PageTitleProps {
  pageID: string
}

export const PageTitle = (props: PageTitleProps) => {
  const { pageID } = props
  const { toast } = useToast()
  const { refreshPrivatePages, privateSpace } = useSidebar()

  const { isRefetching, data: { data: page } = {}, isPending } = useFetchPage({
    pageID,
  })

  const [title, setTitle] = useState(page?.name ?? 'Untitled')
  const [isFocus, setFocus] = useState(false)

  const willUpdatePage = useRef(false)

  const { mutateAsync: updatePage } = useUpdatePage({ id: page?.id ?? '' })
  const queryClient = useQueryClient()

  const updatePageTitle = useCallback(
    async (name: string) => {
      if (!page) return
      try {
        await updatePage({
          ...page,
          name,
        })

        if (page.space_pkid === privateSpace?.pkid) {
          refreshPrivatePages()
        }

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_PAGE({
            pageID: page.id,
          }),
        })
        // reset title after revalidate
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to update page',
        })
      }
      willUpdatePage.current = false
    },
    [page, privateSpace?.pkid, queryClient, refreshPrivatePages, toast, updatePage],
  )

  const thorttleUpdateTitle = useDebouncedCallback(updatePageTitle, 500, {
    trailing: true,
  })

  const onTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!focus) {
      return
    }
    willUpdatePage.current = true
    thorttleUpdateTitle(newTitle)
  }

  useEffect(() => {
    if (!isFocus && page && !isRefetching && !willUpdatePage.current) {
      setTitle(page.name)
    }
  }, [isFocus, isRefetching, page])

  return (
    <div className="group">
      <div className="h-8 opacity-0 transition duration-200 group-hover:opacity-100">
        {!isPending && (
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
      {isPending ? (
        <div>
          <Skeleton className="h-[54px] w-[300px] rounded-medium mx-3" />
        </div>
      ) : (
        <TextAreaNoBackground
          disabled={isRefetching && !isFocus}
          onFocus={() => setFocus(true)}
          onBlur={() => {
            setFocus(false)
          }}
          minRows={1}
          placeholder="Untitled"
          value={title}
          onValueChange={onTitleChange}
          autoFocus
          classNames={{
            input: 'text-5xl font-semibold',
          }}
        />
      )}
    </div>
  )
}
