import { TextAreaNoBackground } from '@/components/common/TextAreaNoBackground'
import { useSidebar } from '@/components/providers/sidebar'
import { useDebouncedCallback } from 'use-debounce'
import { useToast } from '@/hooks/useToast'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { Button, Skeleton, TextAreaProps } from '@nextui-org/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RiUserSmileFill, RiImage2Fill, RiMoreLine } from 'react-icons/ri'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/mutation/keys'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { dump } from '@/constants/common'
import { cn } from '@/libs/utils'
import { PageActionMenu } from '../../PageMenu'

export interface PageTitleProps {
  pageID: string
  onAddCover?: () => void
  onAddIcon?: () => boolean
  hasCoverImg?: boolean
  hasIcon?: boolean
  className?: string
  textAreaProps?: TextAreaProps
}

export const PageTitle = (props: PageTitleProps) => {
  const {
    pageID,
    onAddCover = dump,
    onAddIcon = dump,
    hasCoverImg = false,
    hasIcon = false,
    className,
    textAreaProps: { classNames: textAreaClassNames, ...textAreaProps } = {},
  } = props
  const { toast } = useToast()
  const { refreshOrgPages } = useSidebar()

  const {
    isRefetching,
    data: { data: page } = {},
    isPending,
  } = useFetchPage({
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
          pkid: page.pkid,
          body: {
            ...page,
            name,
          },
        })

        refreshOrgPages()

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
    [page, queryClient, refreshOrgPages, toast, updatePage],
  )

  const throttleUpdateTitle = useDebouncedCallback(updatePageTitle, 500, {
    trailing: true,
  })

  const onTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!focus) {
      return
    }
    willUpdatePage.current = true
    throttleUpdateTitle(newTitle)
  }

  useEffect(() => {
    if (!isFocus && page && !isRefetching && !willUpdatePage.current) {
      setTitle(page.name)
    }
  }, [isFocus, isRefetching, page])

  return (
    <div className={cn('group', className)}>
      <div className="h-8 opacity-0 transition duration-200 group-hover:opacity-100">
        {!isPending && (
          <div className="hidden gap-1 opacity-70 group-hover:flex">
            {!hasIcon && (
              <Button
                startContent={<RiUserSmileFill size={16} />}
                size="sm"
                variant="light"
                onClick={onAddIcon}
              >
                Add icons
              </Button>
            )}
            {!hasCoverImg && (
              <Button
                startContent={<RiImage2Fill size={16} />}
                size="sm"
                variant="light"
                onClick={onAddCover}
              >
                Add cover
              </Button>
            )}
            {page && (
              <PageActionMenu
                page={page}
                onSuccess={() => {
                  queryClient.invalidateQueries({
                    queryKey: QUERY_KEYS.GET_PAGE({
                      pageID: page.id,
                    }),
                  })
                }}
              >
                <Button size="sm" variant="light" isIconOnly>
                  <RiMoreLine size={16} />
                </Button>
              </PageActionMenu>
            )}
          </div>
        )}
      </div>
      {isPending ? (
        <div>
          <Skeleton className="mx-3 h-[54px] w-[300px] rounded-medium" />
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
            ...textAreaClassNames,
          }}
          {...textAreaProps}
        />
      )}
    </div>
  )
}
