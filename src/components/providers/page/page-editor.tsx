import createContext from '@/libs/context'
import { Page } from '@/schema/page'
import { PropsWithChildren, useMemo } from 'react'

interface PageEditorContextValues {
  pageMap?: Record<string, Page>
  pageMutate?: () => void
  validatingPageMap?: boolean
}

export const [Provider, usePageEditorContext] = createContext<PageEditorContextValues>({
  name: 'PageEditorContext',
})

interface PageEditorProviderProps {
  childPages: Page[]
  pageMutate?: () => void
  validatingPageMap?: boolean
}

export const PageEditorProvider = (props: PropsWithChildren<PageEditorProviderProps>) => {
  const { children, childPages, pageMutate, validatingPageMap } = props
  const pageMap = useMemo(() => {
    return childPages
      .filter((p) => !p.archived_at)
      .reduce(
        (acc, page) => {
          acc[page.node_id ?? ''] = page
          return acc
        },
        {} as Record<string, Page>,
      )
  }, [childPages])

  return (
    <Provider value={{ pageMap, pageMutate, validatingPageMap }}>
      {children}
    </Provider>
  )
}
