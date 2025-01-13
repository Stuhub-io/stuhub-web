'use client'

import { Page, PageViewTypeEnum } from '@/schema/page'
import Typography from '@/components/common/Typography'
import { PageListView } from '@/components/page/PageListView/PageListView'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import { useCallback, useId, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/libs/utils'
import { uploadService } from '@/api/uploader'
import { useCreateAsset } from '@/mutation/mutator/page/useCreateAsset'
import { useSidebar } from '@/components/providers/sidebar'
import { Avatar, Selection } from '@nextui-org/react'
import { useAssetUploadContext } from '@/components/providers/asset_upload'
import { useNewPage } from '@/components/providers/newpage'
import { useFetchPages } from '@/mutation/querier/page/useFetchPages'
import { FolderViewToolbar } from '@/components/page/page_view/page_viewers/PageFolderViewer/Toolbar'
import { EmptyListPlaceholder } from '@/components/page/asset/EmpyListPlaceholder'
import { useViewType } from '@/hooks/useViewType'

export default function RootFolderPage() {
  const { organization } = useOrganization()
  const { refreshOrgPages } = useSidebar()
  const router = useRouter()

  const [typeFilter, setTypeFilter] = useState<Selection>('all')
  const { viewType, setViewType } = useViewType()

  const { onOpenUploadModal } = useAssetUploadContext()

  const [selectedPagePkIDs, setSelectedPagePkIDs] = useState<number[]>([])

  const { data: { data: childPages } = {}, refetch } = useFetchPages({
    allowFetch: true,
    is_archived: false,
    org_pkid: organization?.pkid ?? -1,
  })

  const { onCreate: onCreateFolder } = useNewPage({
    type: PageViewTypeEnum.FOLDER,
  })

  const id = useId()
  const { mutateAsync: createAsset } = useCreateAsset({
    org_pkid: organization?.pkid ?? -1,
    tempId: id,
  })

  // folders
  const { folders, filesAndDocs } = useMemo(() => {
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
    router.push(
      ROUTES.VAULT_PAGE({
        orgSlug: organization?.slug ?? '',
        pageID: folder.id,
      }),
    )
  }

  // drop files
  const handleDropFile = useCallback(
    async (files: File[]) => {
      const data = await uploadService.uploadFile({
        file: files[0],
        resourceType: 'auto',
        publicID: files[0].name,
      })
      await createAsset({
        cover_image: '',
        name: files[0].name,
        org_pkid: organization?.pkid ?? -1,
        view_type: PageViewTypeEnum.ASSET,
        asset: {
          extension: data.format,
          size: data.bytes,
          thumbnails: {
            small: '',
            medium: '',
            large: '',
          },
          url: data.secure_url,
        },
      })
      refetch?.()
      refreshOrgPages?.()
    },
    [createAsset, organization?.pkid, refetch, refreshOrgPages],
  )

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    onDrop: handleDropFile,
  })

  return (
    <>
      <div className="pb-[80px] md:px-4">
        <div className="mt-8 flex items-center gap-4 py-2">
          <Avatar src={organization?.avatar} size="lg" radius="md" />
          <div className="flex flex-col">
            <Typography className="!text-2xl font-semibold">{organization?.name}</Typography>
            <Typography level="p4" color="textTertiary">
              {organization?.members.length} members
            </Typography>
          </div>
        </div>
        <FolderViewToolbar
          viewType={viewType}
          onViewTypeChange={setViewType}
          typeFilter={typeFilter}
          onCreateFolderClick={() => {
            onCreateFolder(() => {
              refetch()
            })
          }}
          onTypeFilterChange={setTypeFilter}
          onUploadClick={() => {
            onOpenUploadModal()
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
                onItemMutateSuccess={refetch}
                onItemDoubleClick={handlePageClick}
                selectedItemPkIDs={selectedPagePkIDs}
                onSelectedPkIDsChanged={setSelectedPagePkIDs}
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
              Files and Documents
            </Typography>
            <PageListView
              viewType={viewType}
              items={filesAndDocs}
              onItemMutateSuccess={refetch}
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
