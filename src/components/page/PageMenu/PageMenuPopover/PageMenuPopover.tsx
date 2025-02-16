import { Listbox, ListboxItem } from '@nextui-org/react'
import { memo, useMemo, useState } from 'react'
import {
  MainMenuKeys,
  MainMenuSections,
  MenuSection,
  OrganizeMenuKeys,
  OrganizeSectionItems,
  ShareMenuKeys,
  ShareMenuSectionItems,
} from './const'
import { useToast } from '@/hooks/useToast'

interface PageMoreMenuPopoverContentProps {
  onClose?: () => void
  onRename?: () => void
  onOpenMove?: () => void
  onArchive?: () => void
  onShare?: () => void
  onCopy?: () => void
  onNewTab?: () => void
  filterMenu?: (menu: MenuSection[]) => MenuSection[]
  onStarToggle?: () => void
}

export const PageMoreMenuPopoverContent = memo((props: PageMoreMenuPopoverContentProps) => {
  const { onClose, onRename, onOpenMove, onArchive, onShare, onCopy, onNewTab, filterMenu, onStarToggle } = props
  const { toast } = useToast()

  const [menu, setMenu] = useState<MenuSection[]>(MainMenuSections)

  const handleClose = () => {
    onClose?.()
    setTimeout(() => {
      setMenu(MainMenuSections)
    }, 300)
  }

  const filteredMenu = useMemo(() => {
    return filterMenu ? filterMenu(menu) : menu
  }, [filterMenu, menu])

  return (
    <>
      <Listbox
        onAction={(key) => {
          switch (key as MainMenuKeys) {
            case 'newtab':
              onNewTab?.()
              handleClose?.()
              break
            case 'rename':
              onRename?.()
              handleClose?.()
              break
            case 'trash':
              onArchive?.()
              handleClose?.()
              break
            case 'share-menu':
              setMenu(ShareMenuSectionItems)
              break
            case 'organize-menu':
              setMenu(OrganizeSectionItems)
              break
            case 'download':
              toast({
                variant: 'default',
                title: 'Download is unavailable',
                description: 'Feature coming soon',
              })
              break
            case 'folder-info':
              toast({
                variant: 'default',
                title: 'Folder info is unavailable',
                description: 'Feature coming soon',
              })
              break
            default:
              break
          }

          switch (key as ShareMenuKeys) {
            case 'share-back':
              setMenu(MainMenuSections)
              break
            case 'Copy link':
              onCopy?.()
              handleClose?.()
              break
            case 'share':
              onShare?.()
              handleClose?.()
              break
          }

          switch (key as OrganizeMenuKeys) {
            case 'org-back':
              setMenu(MainMenuSections)
              break
            case 'Move':
              onOpenMove?.()
              handleClose?.()
              break
            case 'starred':
              onStarToggle?.()
              handleClose?.() 
              break
          }
        }}
        classNames={{
          list: 'min-w-[240px]',
        }}
      >
        {filteredMenu.map((item) => (
          <ListboxItem
            key={item.key}
            startContent={item.icon}
            showDivider={item.bottomDivider}
            endContent={item.rightEl}
          >
            {item.title}
          </ListboxItem>
        ))}
      </Listbox>
    </>
  )
})

PageMoreMenuPopoverContent.displayName = 'PageMoreMenuPopoverContent'
