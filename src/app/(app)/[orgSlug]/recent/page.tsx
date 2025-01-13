'use client'

import Typography from '@/components/common/Typography'
import { PageListView } from '@/components/page/PageListView/PageListView'
import { EmptyListPlaceholder } from '@/components/page/asset/EmpyListPlaceholder'
import { FolderViewToolbar } from '@/components/page/page_view/page_viewers/PageFolderViewer/Toolbar'
import { ROUTES } from '@/constants/routes'
import { useViewType } from '@/hooks/useViewType'
import { useFetchPageAccessLogs } from '@/mutation/querier/page-access-log/useFetchPageAccessLogs'
import { Page } from '@/schema/page'
import { Button, ButtonProps, Selection, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { AiFillMail } from 'react-icons/ai'
import { RiFolder3Fill, RiHardDrive2Fill } from 'react-icons/ri'
import { IoChevronForwardSharp } from 'react-icons/io5'

export default function Page() {
  const { data: { data: logs } = {}, refetch } = useFetchPageAccessLogs({
    allowFetch: true,
  })

  const [selectedPagePkIDs, setSelectedPagePkIDs] = useState<number[]>([])
  const [typeFilter, setTypeFilter] = useState<Selection>('all')
  const { viewType, setViewType } = useViewType()
  const router = useRouter()

  const filesAndDocs = logs?.map((log) => ({
    ...log.page,
    ancestors: log.parent_pages,
    is_shared: log.is_shared,
    updated_at: log.last_accessed,
  }))

  const navigateToPage = (folderId: string, organizationSlug: string) => {
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organizationSlug,
        pageID: folderId,
      }),
    )
  }

  const renderPageDirectory = ({ is_shared, ancestors = [], organization, updated_at }: Page) => {
    //FIX: refactor this
    const commonBtnProps = {
      size: 'sm',
      variant: 'light',
      className: 'z-50',
    } as Partial<ButtonProps>

    const orgSlug = organization?.slug ?? ''

    if (is_shared && ancestors?.length == 1) {
      const page = ancestors[0]!
      return (
        <Button {...commonBtnProps} onClick={() => navigateToPage(page.id, page.organization?.slug ?? '')}>
          <AiFillMail />
          {page.name}
        </Button>
      )
    }

    if (ancestors?.length) {
      const lowestAncestor = ancestors.at(-1)!
      return (
        <Tooltip
          placement="bottom-end"
          delay={0}
          offset={-42}
          content={
            <div className="flex items-center py-1.5">
              {!is_shared && (
                <Fragment key={'my_vault'}>
                  <Button {...commonBtnProps} onClick={() => router.push(ROUTES.ROOT_VAULTS({ orgSlug }))}>
                    <RiHardDrive2Fill />
                    My Vault
                  </Button>
                  <IoChevronForwardSharp className="mx-1.5" />
                </Fragment>
              )}
              {ancestors.map(({ id, name, organization }, idx) => (
                <Fragment key={updated_at + name}>
                  <Button {...commonBtnProps} onClick={() => navigateToPage(id, organization?.slug ?? '')}>
                    {is_shared ? <AiFillMail /> : <RiFolder3Fill />}
                    {name}
                  </Button>
                  {idx != ancestors.length - 1 && <IoChevronForwardSharp className="mx-1.5" />}
                </Fragment>
              ))}
            </div>
          }
        >
          <Button {...commonBtnProps} onClick={() => navigateToPage(lowestAncestor.id, orgSlug)}>
            {is_shared ? <AiFillMail /> : <RiFolder3Fill />}
            {lowestAncestor.name}
          </Button>
        </Tooltip>
      )
    }

    //TODO: change to Shared With Me route
    if (is_shared) {
      return (
        <Button {...commonBtnProps} onClick={() => router.push(ROUTES.ROOT_VAULTS({ orgSlug }))}>
          <AiFillMail />
          Shared With Me
        </Button>
      )
    }

    return (
      <Button {...commonBtnProps} onClick={() => router.push(ROUTES.ROOT_VAULTS({ orgSlug }))}>
        <RiHardDrive2Fill />
        My Vault
      </Button>
    )
  }

  return (
    <>
      <div className="md:px-4">
        <div className="my-8 grid grid-cols-1 gap-2">
          <Typography level="h4">Recent</Typography>

          <FolderViewToolbar
            isViewOnly
            viewType={viewType}
            typeFilter={typeFilter}
            onViewTypeChange={setViewType}
            onCreateFolderClick={() => {}}
            onTypeFilterChange={setTypeFilter}
            onUploadClick={() => {}}
          />
        </div>

        <PageListView
          viewType={viewType}
          items={filesAndDocs}
          onItemMutateSuccess={refetch}
          onItemDoubleClick={(page) => navigateToPage(page.id, 'nice')}
          selectedItemPkIDs={selectedPagePkIDs}
          onSelectedPkIDsChanged={setSelectedPagePkIDs}
          emptyState={<EmptyListPlaceholder onClick={() => {}} />}
          customColumns={[
            {
              key: 'directory',
              headerTitle: 'Directory',
              width: '30%',
              renderCell: ({ page }) => renderPageDirectory(page),
            },
          ]}
        />
      </div>
    </>
  )
}
