import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { PropsWithChildren, useState } from 'react'
import { AssetUploaderModal, UploadingFileState } from '../page/asset/AssetUploaderModal'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { uploadService } from '@/api/uploader'
import { useCreateAsset } from '@/mutation/mutator/page/useCreateAsset'
import { useOrganization } from './organization'
import { newIdGenerator } from '@/libs/utils'
import { excludeExtension, getFileExtension } from '@/utils/file'

interface AssetUploadContextValue {
  onOpenUploadModal: (folder?: Page) => void
  isOpenUploadModal: boolean
  onCloseUploadModal?: () => void
  uploadingFiles?: Record<string, UploadingFileState>
  handleUpload?: (file: File, folderPkID?: number) => void
}

const [Provider, useAssetUploadContext] = createContext<AssetUploadContextValue>({
  name: 'AssetUploadContext',
})

export { useAssetUploadContext }


const genID = newIdGenerator()

export const AssetUploaderContextProvider = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedFolder, setSelectedFolder] = useState<Page>()
  const { organization } = useOrganization()

  const { mutateAsync } = useCreateAsset({
    parent_page_pkid: selectedFolder?.pkid,
    tempId: 'tempId',
    org_pkid: organization?.pkid ?? -1,
  })

  const [uploadingFileState, setUploadingFileState] = useState<Record<string, UploadingFileState>>({})

  const handeUploadFile = async (file: File, folderPkID?: number) => {
    const tempId = genID()

    const fileInfo = {
      size: file.size,
      name: file.name,
      extension: getFileExtension(file.name),
      uploadID: tempId,
    }
    setUploadingFileState((prev) => ({
      ...prev,
      [tempId]: {
        state: 'uploading',
        progress: 0,
        ...fileInfo,
      },
    }))

    try {
      const fileData = await uploadService.uploadFile({
        file,
        publicID: excludeExtension(file.name),
        onProgress: (progress) => {
          setUploadingFileState((prev) => ({
            ...prev,
            [tempId]: {
              state: 'uploading',
              progress: Math.min(progress, 99),
              ...fileInfo,
            },
          }))
        }
      })

      const { data } = await mutateAsync({
        cover_image: '',
        name: file.name,
        parent_page_pkid: folderPkID,
        org_pkid: organization?.pkid ?? -1,
        view_type: PageViewTypeEnum.ASSET,
        asset: {
          extension: fileData.format ?? getFileExtension(file.name),
          size: fileData.bytes ?? file.size,
          thumbnails: {
            small: '',
            medium: '',
            large: '',
          },
          url: fileData.secure_url,
        },
      })
      setUploadingFileState((prev) => ({
        ...prev,
        [tempId]: {
          state: 'done',
          resultPage: data,
          progress: 100,
          ...fileInfo
        },
      }))
    }
    catch (error) {
      setUploadingFileState((prev) => ({
        ...prev,
        [tempId]: {
          state: 'error',
          ...fileInfo,
        },
      }))
      return
    }

  }

  const onOpenUploadModal = (folder?: Page) => {
    onOpen()
    setSelectedFolder(folder)
  }

  console.log('selectedFolder', selectedFolder)

  const onRemove = (tempId: string) => {
    setUploadingFileState((prev) => {
      const newState = { ...prev }
      delete newState[tempId]
      return newState
    })
  }

  const onCancel = (tempId: string) => {
    setUploadingFileState((prev) => ({
      ...prev,
      [tempId]: {
        ...prev[tempId],
        state: 'error',
      },
    }))
  }

  return (
    <Provider
      value={{
        onOpenUploadModal,
        isOpenUploadModal: isOpen,
        onCloseUploadModal: onClose,
        uploadingFiles: uploadingFileState,
        handleUpload: handeUploadFile,
      }}
    >
      {children}
      <AssetUploaderModal
        folderPkID={selectedFolder?.pkid}
        isOpen={isOpen}
        onClose={onClose}
        onRemoveFile={onRemove}
        onCancelFile={onCancel}
        onUploadFile={handeUploadFile}
        uploadingFiles={uploadingFileState}
      />
    </Provider>
  )
}
