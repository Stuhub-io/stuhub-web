import { VscodeDocumentIcon } from '@/components/icons/VsCodeDocumentIcon'
import { useAssetUploadContext } from '@/components/providers/asset_upload'
import { useCreatePageContext, useNewPage } from '@/components/providers/newpage'
import { useInvalidatePageDetail } from '@/hooks/page/useInvalidatePageDetail'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Key } from 'react'
import { RiFolderFill, RiUpload2Fill } from 'react-icons/ri'

interface PageCreateMenuProps {
  onClose?: () => void
  parentPage?: Page
}

export const PageCreateMenu = (props: PageCreateMenuProps) => {
  const { onClose, parentPage } = props

  const { onOpenCreateDoc } = useCreatePageContext()

  const { onCreate } = useNewPage({
    type: PageViewTypeEnum.FOLDER,
    parentPagePkID: parentPage?.pkid,
  })
  const invalidatePage = useInvalidatePageDetail({
    pageID: parentPage?.id ?? "",
    pagePkID: parentPage?.pkid ?? -1
  })

  const { onOpenUploadModal } = useAssetUploadContext()

  const handleAction = (e: Key) => {
    switch (e) {
      case 'doc':
        onOpenCreateDoc(parentPage)
        onClose?.()
        return
      case 'folder':
        onCreate(invalidatePage)
        onClose?.()
        return
      case 'asset':
        onOpenUploadModal()
        onClose?.()
        return
      default:
        return
    }
  }
  return (
    <Listbox
      onAction={handleAction}
      classNames={{
        base: 'w-[160px]',
      }}
    >
      <ListboxItem key="doc" startContent={<VscodeDocumentIcon width={16} height={16} />}>
        New Document
      </ListboxItem>
      <ListboxItem key="folder" startContent={<RiFolderFill className="fill-success" size={16} />}>
        New Folder
      </ListboxItem>
      <ListboxItem key="asset" startContent={<RiUpload2Fill className="fill-warning" size={16} />}>
        New Assets
      </ListboxItem>
    </Listbox>
  )
}
