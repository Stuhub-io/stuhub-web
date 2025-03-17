import { useOrganization } from '@/components/providers/organization'
import { ROUTES } from '@/constants/routes'
import { useFetchPageAccessLogs } from '@/mutation/querier/page-access-log/useFetchPageAccessLogs'
import { Listbox, ListboxItem, ListboxSection, Skeleton } from '@nextui-org/react'
import AiIcon from '@/components/icons/AiIcon'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getPageIconByViewTypeOrExtension } from '@/utils/page'
import { Page } from '@/schema/page'

type PageWithParents = Page & {
  ancestors: Page[]
  is_shared: boolean
  updated_at: string
}

type GlobalSearchContentProps = {
  onClose?: () => void
}

export const GlobalSearchContent = (props: GlobalSearchContentProps) => {
  const { onClose } = props
  const router = useRouter()

  const { organization } = useOrganization()

  const { logs, refetch, isPending } = useFetchPageAccessLogs({
    allowFetch: true,
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  const filesAndDocs = logs?.map((log) => ({
    ...log.page,
    ancestors: log.parent_pages,
    is_shared: log.is_shared,
    updated_at: log.last_accessed,
    key: log.pkid,
  }))

  const navigateToPage = (pageId: string, organizationSlug: string) => {
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organizationSlug,
        pageID: pageId,
      }),
    )
    onClose?.()
  }

  const renderItemProps = (page: PageWithParents) => {
    const parentDirs = page.ancestors?.map((ancestor) => ancestor.name).join(' / ')
    return {
      startContent: getPageIconByViewTypeOrExtension(page.view_type, page.asset?.extension, 20),
      onClick: () => navigateToPage(page.id, page.organization?.slug || ''),
      description: parentDirs || 'Root',
    }
  }

  return (
    <div className="flex-1 overflow-y-auto px-1">
      <Listbox>
        <ListboxSection title="Actions" showDivider>
          <ListboxItem
            key="ask-ai"
            startContent={<AiIcon width={20} height={20} />}
            onClick={() => {
              router.push(
                ROUTES.ORGANIZATION({
                  orgSlug: organization?.slug ?? '',
                }),
              )
            }}
          >
            Ask AI in {organization?.name || 'Untitled'}
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Recent">
          {[
            ...(isPending
              ? Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <ListboxItem
                      key={`skeleton-${index}`}
                      startContent={<Skeleton className="h-5 w-5 rounded-md" />}
                      description={
                        <Skeleton
                          className="my-0.5 h-3 w-full max-w-[140px] rounded-md"
                          style={{
                            width: Math.random() * 100 + 150,
                          }}
                        />
                      }
                    >
                      <Skeleton
                        className="my-0.5 h-4 w-[300px] rounded-md"
                        style={{
                          width: Math.random() * 100 + 250,
                        }}
                      />
                    </ListboxItem>
                  ))
              : []),
            ...(filesAndDocs?.map((page) => (
              <ListboxItem key={page.key} {...renderItemProps(page)}>
                {page.name || 'Untitled'}
              </ListboxItem>
            )) ?? []),
          ]}
        </ListboxSection>
      </Listbox>
    </div>
  )
}
