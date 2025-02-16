'use client'

import { Page, PageViewTypeEnum } from '@/schema/page'
import Typography from '@/components/common/Typography'
import { PageListView } from '@/components/page/PageListView/PageListView'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { useMemo, useState } from 'react'
import { useSidebar } from '@/components/providers/sidebar'
import { Selection } from '@nextui-org/react'
import { useAssetUploadContext } from '@/components/providers/asset_upload'
import { FolderViewToolbar } from '@/components/page/page_view/page_viewers/PageFolderViewer/Toolbar'
import { EmptyListPlaceholder } from '@/components/page/asset/EmpyListPlaceholder'
import { useViewType } from '@/hooks/useViewType'

export default function StarredPage() {
  const { organization } = useOrganization()
  const router = useRouter()

  const [typeFilter, setTypeFilter] = useState<Selection>('all')
  const { viewType, setViewType } = useViewType()
  const { starredOrgPages, refreshStarredOrgPages } = useSidebar()

  const { onOpenUploadModal } = useAssetUploadContext()

  const [selectedPagePkIDs, setSelectedPagePkIDs] = useState<number[]>([])

  // folders
  const { folders, filesAndDocs } = useMemo(() => {
    if (!starredOrgPages)
      return {
        folders: undefined,
        filesAndDocs: undefined,
        size: 0,
      }
    return starredOrgPages?.reduce(
      (acc, child) => {
        if (viewType === 'list') {
          acc.filesAndDocs.push(child)
        } else {
          if (child.view_type === PageViewTypeEnum.FOLDER) {
            acc.folders.push(child)
          } else {
            acc.filesAndDocs.push(child)
          }
        }
        acc.size += child.asset?.size ?? 0
        return acc
      },
      {
        folders: [] as Page[],
        filesAndDocs: [] as Page[],
        size: 0,
      },
    )
  }, [starredOrgPages, viewType])

  const handlePageClick = (folder: Page) => {
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: folder.id,
      }),
    )
  }

  return (
    <>
      <div className="pb-[80px] md:px-4">
        <div className="mt-8 flex items-center gap-4 py-2">
          <Typography className="!text-2xl font-semibold">Starred</Typography>
        </div>
        <FolderViewToolbar
          viewType={viewType}
          onViewTypeChange={setViewType}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          onUploadClick={() => {
            // onOpenUploadModal()
          }}
          onCreateFolderClick={function (): void {
            // throw new Error('Function not implemented.')
          }}
        />

        <div className="mt-8 space-y-8">
          {!!folders?.length && (
            <div className="space-y-4">
              <Typography level="p5" color="textTertiary">
                Folders
              </Typography>
              <PageListView
                viewType={viewType}
                items={folders}
                onItemMutateSuccess={refreshStarredOrgPages}
                onItemDoubleClick={handlePageClick}
                selectedItemPkIDs={selectedPagePkIDs}
                onSelectedPkIDsChanged={setSelectedPagePkIDs}
              />
            </div>
          )}
          <div>
            <Typography level="p5" color="textTertiary">
              Files and Documents
            </Typography>
            <PageListView
              viewType={viewType}
              items={filesAndDocs}
              onItemMutateSuccess={refreshStarredOrgPages}
              onItemDoubleClick={handlePageClick}
              selectedItemPkIDs={selectedPagePkIDs}
              onSelectedPkIDsChanged={setSelectedPagePkIDs}
              emptyState={<EmptyListPlaceholder onClick={() => onOpenUploadModal()} />}
            />
          </div>
        </div>
      </div>
    </>
  )
}
