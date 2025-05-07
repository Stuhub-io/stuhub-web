'use client'

import { OrganizationPageParams } from '@/constants/routes'
import { useInvalidatePageDetail } from '@/hooks/page/useInvalidatePageDetail'
import { useToast } from '@/hooks/useToast'
import createContext from '@/libs/context'
import { useUpdatePage } from '@/mutation/mutator/page/useUpdatePage'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
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

  const { data: { data: page } = {} } = useFetchPage({
    pageID,
  })

  const invalidatePage = useInvalidatePageDetail({
    pageID,
    pagePkID: page?.pkid ?? -1
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
        invalidatePage()
      } catch (e) {
        toast({
          variant: 'danger',
          title: 'Failed to update cover image',
        })
      }
    },
    [invalidatePage, mutateAsync, page, toast],
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
