import { useCreatePageContext, useNewPage } from '@/components/providers/newpage'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Key } from 'react'
import { RiFileFill, RiFolderFill } from 'react-icons/ri'

interface PageCreateMenuProps {
  onClose?: () => void
  parentPage?: Page
}

export const PageCreateMenu = (props: PageCreateMenuProps) => {
  const { onClose, parentPage } = props

  const { onOpenCreatePage } = useCreatePageContext()

  const { onCreate } = useNewPage({
    type: PageViewTypeEnum.FOLDER,
    parentPagePkID: parentPage?.pkid,
  })

  const handleAction = (e: Key) => {
    switch (e) {
      case 'page':
        onOpenCreatePage(parentPage)
        onClose?.()
        return
      case 'folder':
        onCreate()
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
      <ListboxItem key="page" startContent={<RiFileFill size={16} />}>
        New Page
      </ListboxItem>
      <ListboxItem key="folder" startContent={<RiFolderFill size={16} />}>
        New Folder
      </ListboxItem>
    </Listbox>
  )
}
