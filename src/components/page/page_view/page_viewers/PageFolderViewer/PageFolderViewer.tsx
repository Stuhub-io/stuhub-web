import { Page, PageViewTypeEnum } from '@/schema/page'
import { PageTitle } from '@/components/page/document/PageTitleInput'
import Typography from '@/components/common/Typography'
import { PageListView } from '@/components/page/PageListView/PageListView'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from '@uploadthing/react'
import { cn } from '@/libs/utils'
import { useSidebar } from '@/components/providers/sidebar'
import { Selection } from '@nextui-org/react'
import { useAssetUploadContext } from '@/components/providers/asset_upload'
import { useNewPage } from '@/components/providers/newpage'
import { PageViewer } from '../../type'
import { FolderViewToolbar } from './Toolbar'
import { useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { formatReadableFileSize } from '@/utils/file'
import { EmptyListPlaceholder } from '@/components/page/asset/EmpyListPlaceholder'
import { useViewType } from '@/hooks/useViewType'

export const PageFolderViewer: PageViewer = (props) => {
  const { page, onAddCoverImage, hasCoverImage } = props
  const { organization } = useOrganization()
  const { refreshOrgPages } = useSidebar()
  const router = useRouter()

  const [typeFilter, setTypeFilter] = useState<Selection>('all')

  const { viewType, setViewType } = useViewType()

  const { onOpenUploadModal, handleUpload } = useAssetUploadContext()

  const [selectedPagePkIDs, setSelectedPagePkIDs] = useState<number[]>([])

  const { data: { data: childPages } = {}, refetch } = useFetchPages({
    allowFetch: Boolean(page),
    is_archived: false,
    org_pkid: page?.organization_pkid ?? -1,
    parent_page_pkid: page?.pkid,
  })

  const { onCreate: onCreateFolder } = useNewPage({
    parentPagePkID: page?.pkid,
    type: PageViewTypeEnum.FOLDER,
  })

  const { onCreate: onCreateDocument } = useNewPage({
    parentPagePkID: page?.pkid,
    type: PageViewTypeEnum.DOCUMENT,
  })

  // folders
  const { folders, filesAndDocs, size } = useMemo(() => {
    if (!childPages)
      return {
        folders: undefined,
        filesAndDocs: undefined,
        size: 0,
      }
    return childPages?.reduce(
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
  }, [childPages, viewType])

  const handlePageClick = (folder: Page) => {
    console.log('folder', organization?.slug, folder)
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: folder.id,
      }),
    )
  }

  // Handle upload

  const handleUploadFile = useCallback(
    async (file: File, folderPkID?: number) => {
      await handleUpload?.(file, folderPkID)
      refetch?.()
      refreshOrgPages?.()
    },
    [handleUpload, refetch, refreshOrgPages],
  )

  const handleDropFile = useCallback(
    async (files: File[]) => {
      files.forEach((file) => {
        handleUploadFile(file, page?.pkid)
      })
    },
    [handleUploadFile, page?.pkid],
  )

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: handleDropFile,
  })

  console.log({page})

  return (
    <>
      <div className="pb-[80px] md:px-4">
        <div>
          <PageTitle
            pageID={page?.id ?? ''}
            onAddCover={onAddCoverImage}
            hasCoverImg={hasCoverImage}
            textAreaProps={{
              multiple: false,
              className: '-mx-3',
              classNames: {
                input: 'text-2xl font-semibold',
              },
            }}
          />
        </div>
        <FolderViewToolbar
          viewType={viewType}
          onViewTypeChange={setViewType}
          typeFilter={typeFilter}
          onCreateDocumentClick={() => {
            onCreateDocument(() => {
              refetch()
            })
          }}
          onCreateFolderClick={() => {
            onCreateFolder(() => {
              refetch()
            })
          }}
          onTypeFilterChange={setTypeFilter}
          onUploadClick={() => {
            onOpenUploadModal(page)
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
                parentPage={page}
                onItemMutateSuccess={refetch}
                selectedItemPkIDs={selectedPagePkIDs}
                onSelectedPkIDsChanged={setSelectedPagePkIDs}
                onItemDoubleClick={handlePageClick}
              />
            </div>
          )}
          <div
            className={cn('mt-4 space-y-4', {
              'rounded-md outline-dashed outline-2 outline-offset-[8px] outline-primary':
                isDragActive,
            })}
            {...getRootProps()}
            onClick={() => {}} // prevent click
          >
            <input {...getInputProps()} className="invisible" />
            <Typography level="p5" color="textTertiary">
              Files and Documents {size ? `(${formatReadableFileSize(size)})` : ''}
            </Typography>
            <PageListView
              parentPage={page}
              viewType={viewType}
              emptyState={<EmptyListPlaceholder onClick={() => onOpenUploadModal(page)} />}
              selectedItemPkIDs={selectedPagePkIDs}
              items={filesAndDocs}
              onItemMutateSuccess={refetch}
              onSelectedPkIDsChanged={setSelectedPagePkIDs}
              onItemDoubleClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}
