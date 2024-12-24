import Typography from '@/components/common/Typography'
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useDropzone } from '@uploadthing/react'
import { RiFileFill, RiFolder3Fill } from 'react-icons/ri'
import { AssetUploadingItem } from './AssetUploadingItem'
import { cn } from '@/libs/utils'
import { useMemo } from 'react'
import { Page } from '@/schema/page'
import { useSidebar } from '@/components/providers/sidebar'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'

export interface UploadingFileState {
  state: 'uploading' | 'done' | 'error'
  progress?: number
  name: string
  size: number
  resultPage?: Page
  extension: string
  uploadID: string
}

interface AssetUploaderModalProps {
  isOpen?: boolean
  onClose?: () => void
  folderPkID?: number
  onUploadFile: (files: File, folderPkID?: number) => void
  uploadingFiles?: Record<string, UploadingFileState>
  onRemoveFile?: (uploadID: string) => void
  onCancelFile?: (uploadID: string) => void
  onClearAll?: () => void
}

export const AssetUploaderModal = (props: AssetUploaderModalProps) => {
  const { isOpen, onClose, folderPkID, onUploadFile, uploadingFiles, onCancelFile, onRemoveFile, onClearAll } =
    props

  const { organization } = useOrganization()

  const { push } = useRouter()

  const { isDragActive, getInputProps, getRootProps } = useDropzone({
    onDrop: (files) => {
      for (const file of files) {
        onUploadFile(file, folderPkID)
      }
    },
  })

  const { orgPages } = useSidebar()

  const selectedPage = useMemo(() => {
    return orgPages?.map[folderPkID ?? 0]?.page
  }, [folderPkID, orgPages])

  return (
    <Modal size="lg" isOpen={isOpen} hideCloseButton onClose={onClose} scrollBehavior="outside">
      <ModalContent>
        <ModalHeader className="flex items-center gap-3 pb-3">
          <Typography className="flex-1" level="h7" noWrap>
            Upload files
          </Typography>
          <Chip
            size="sm"
            startContent={
              <div className="px-1">
                <RiFolder3Fill size={14} className="text-success" />
              </div>
            }
          >
            {!selectedPage ? 'Root' : selectedPage.name || 'Untitled'}
          </Chip>
        </ModalHeader>
        <Divider />
        <ModalBody className="mb-3 mt-3">
          <input {...getInputProps()} className="invisible" />
          <div
            className={cn(
              'flex h-[240px] w-full flex-col items-center justify-center gap-4 rounded-medium border border-dashed border-divider p-4',
              {
                'border-primary bg-default-200': isDragActive,
                'hover:cursor-pointer': !isDragActive,
              },
            )}
            {...getRootProps()}
          >
            <RiFileFill size={40} className="text-text-tertiary" />
            <Typography level="p4" color="textTertiary" className="line-clamp-2 text-center">
              Drag and drop files here or <u>Choose file here</u>
            </Typography>
          </div>
          {(Object.keys(uploadingFiles ?? {}).length > 0) && (
            <div className="flex justify-end">
              <Button onClick={() => {
                onClearAll?.()
                onClose?.()
              }} variant="flat" size="sm" color="warning">Clear</Button>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {Object.values(uploadingFiles ?? {}).map((file, index) => (
              <AssetUploadingItem
                onRemove={() => onRemoveFile?.(file.uploadID)}
                onCancel={() => onCancelFile?.(file.uploadID)}
                key={index}
                name={file.name}
                size={file.size}
                progress={file.progress ?? 0}
                state={file.state}
                extension={file.extension}
                onDoneClick={() => {
                  push(
                    ROUTES.VAULT_PAGE({
                      orgSlug: organization?.slug ?? '',
                      pageID: file.resultPage?.id ?? '',
                    }),
                  )
                  onClose?.()
                }}
              />
            ))}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
