import { OrganizationPageParams, ROUTES } from '@/constants/routes'
import createContext from '@/libs/context'
import { useFetchPage } from '@/mutation/querier/page/useFetchPage'
import { Page } from '@/schema/page'
import { useParams, useRouter } from 'next/navigation'
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
import { useOrganization } from './organization'

interface PageProviderValues {
  currentPage?: Page
  onSelectPage: (page: Page) => void
  isLoading: boolean
  isRedirecting?: boolean
}

const [Provider, usePageContext] = createContext<PageProviderValues>({
  name: 'OrganizationContext',
})

export { usePageContext }

export const PageProvider = ({ children }: PropsWithChildren) => {
  const { push, replace } = useRouter()
  const { pageID } = useParams<OrganizationPageParams>()
  const { organization } = useOrganization()

  const [selectedPage, setSelectedPage] = useState<Page>()
  const [ isRedirecting, setIsRedirecting ] = useState(false)

  const { data: {data} = {}, isError } = useFetchPage({
    allowFetch: !!pageID && !selectedPage,
    pageID,
  })

  const activePage = useMemo(() => {
    return selectedPage || data
  }, [selectedPage, data])

  const onSelectPage = useCallback(
    (page: Page) => {
      if (page.id === selectedPage?.id) return
      setSelectedPage(page)
      push(
        ROUTES.ORGANIZATION_PAGE({
          orgSlug: organization?.slug ?? '',
          pageID: page.id,
        }),
      )
    },
    [organization?.slug, push, selectedPage?.id],
  )

  useEffect(() => {
    if (isError) {
      setIsRedirecting(true)
      replace(ROUTES.ORGANIZATION({ orgSlug: organization?.slug ?? '' }))
    }
  }, [isError, organization?.slug, replace])

  useEffect(() => {
    if (!pageID && isRedirecting) {
      setIsRedirecting(false)
    }
  }, [isRedirecting, pageID])

  return (
    <Provider value={{ onSelectPage, isLoading: !activePage, currentPage: activePage, isRedirecting }}>
      {children}
    </Provider>
  )
}
