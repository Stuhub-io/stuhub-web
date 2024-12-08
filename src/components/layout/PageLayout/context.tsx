'use client'

import { OrganizationPageParams } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import createContext from '@/libs/context'
import { QUERY_KEYS } from '@/mutation/keys'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { PropsWithChildren, useCallback, useState } from 'react'

export interface PageLayoutContextValues {
  setCoverImageUrl(url: string): void
  currentCoverImageUrl: string
}

const [Provider, usePageLayoutContext] = createContext<PageLayoutContextValues>({
  name: 'PageLayout',
})

export { usePageLayoutContext }

export const PageLayoutContextProvider = ({ children }: PropsWithChildren) => {
  const { toast } = useToast()
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const { pageID } = useParams<OrganizationPageParams>()

  const queryClient = useQueryClient()

  const { data: { data: page } = {} } = useFetchPage({
    pageID,
  })

  const { mutateAsync } = useUpdatePage({ id: pageID })

  const updateCoverImage = useCallback(
    async (coverImage: string) => {
      if (!page) return
      try {
        await mutateAsync({
          pkid: page.pkid,
          body: {
            ...page,
            cover_image: coverImage,
          }
        })
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.GET_PAGE({ pageID }),
        })
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to update cover image',
        })
      }
    },
    [mutateAsync, page, pageID, queryClient, toast],
  )

  const handleUpdateCoverImageUrl = useCallback(
    async (imgUrl: string = '') => {
      setCoverImageUrl(imgUrl)
      if (imgUrl === page?.cover_image) return
      updateCoverImage(imgUrl)
    },
    [page?.cover_image, updateCoverImage],
  )

  return (
    <Provider value={{ setCoverImageUrl: handleUpdateCoverImageUrl, currentCoverImageUrl: coverImageUrl }}>
      {children}
    </Provider>
  )
}
