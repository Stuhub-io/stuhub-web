import { SidebarIconButton, SidebarItem } from '@/components/common/Sidebar'
import { useAssetUploadContext } from '@/components/providers/asset_upload'
import { useSidebar } from '@/components/providers/sidebar'
import { OrganizationPageParams } from '@/constants/routes'
import { CircularProgress } from '@nextui-org/react'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { RiUpload2Line } from 'react-icons/ri'

export const SidebarUploadingSection = () => {
  const {pageID} = useParams<OrganizationPageParams>()

  const { onOpenUploadModal, uploadingFiles } = useAssetUploadContext()
  const { orgPages } = useSidebar()

  const selectedPage = useMemo(() => {
    return orgPages?.list.find((page) => page.id === pageID)
  }, [pageID, orgPages])
  
  const uploadingFilesCount = useMemo(
    () => Object.keys(uploadingFiles ?? {}).length,
    [uploadingFiles],
  )
  const progress = useMemo(() => {
    const total = Object.keys(uploadingFiles ?? {}).length
    if (total === 0) return 100
    const progress = Object.values(uploadingFiles ?? {}).reduce(
      (acc, { progress: fileProgress }) => acc + (fileProgress ?? 0),
      0,
    )
    return Math.floor(progress / total)
  }, [uploadingFiles])

  const handleOpenUploadModal = () => {
    onOpenUploadModal(selectedPage)
  }
  return (
    <SidebarItem
      color="primary"
      onClick={handleOpenUploadModal}
      startContent={
        <SidebarIconButton className="pointer-events-none">
          <RiUpload2Line size={16} />
        </SidebarIconButton>
      }
      endContent={
        <>
          {progress !== 100 ? (
            <CircularProgress
              classNames={{
                base: 'scale-50 -mx-[8px]',
              }}
              value={progress}
            >
              {uploadingFilesCount}
            </CircularProgress>
          ) : undefined}
        </>
      }
    >
      Uploads
    </SidebarItem>
  )
}
