import { Listbox, ListboxItem } from '@nextui-org/react'
import { Page, PageViewTypeEnum } from '@/schema/page'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import useCopy from 'use-copy'
import { BASE_URL } from '@/constants/envs'
import { useMemo, useState } from 'react'
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
  page: Page
  onArchive?: () => void
  onShare?: () => void
}

export const PageMoreMenuPopoverContent = (props: PageMoreMenuPopoverContentProps) => {
  const { onClose, page, onRename, onOpenMove, onArchive, onShare } = props
  const { organization } = useOrganization()
  const { toast } = useToast()

  const pageHref =
    BASE_URL +
    ROUTES.VAULT_PAGE({
      orgSlug: organization?.slug ?? '',
      pageID: page.id,
    })

  const [, copy] = useCopy(pageHref)

  const [menu, setMenu] = useState<MenuSection[]>(MainMenuSections)

  const handleClose = () => {
    onClose?.()
    setTimeout(() => {
      setMenu(MainMenuSections)
    }, 300)
  }

  const filteredMenu = useMemo(() => {
    return menu.map((item) => {
      if (item.key === 'organize-menu') {
        return {
          ...item,
          title: getOrgMenuSectionLabel(page),
        } as MenuSection
      }
      return item
    })
  }, [menu, page])

  return (
    <>
      <Listbox
        onAction={(key) => {
          switch (key as MainMenuKeys) {
            case 'newtab':
              window.open(pageHref)
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
              copy()
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
              toast({
                variant: 'default',
                title: 'Starred is unavailable',
                description: 'Feature coming soon',
              })
              break
          }
        }}
        classNames={{
          list: 'min-w-[240px]',
        }}
      >
        {filteredMenu.map((item) => (
          <ListboxItem key={item.key} startContent={item.icon} showDivider={item.bottomDivider} endContent={item.rightEl}>
            {item.title}
          </ListboxItem>
        ))}
      </Listbox>
    </>
  )
}

const getOrgMenuSectionLabel = (page: Page) => {
  switch (page.view_type) {
    case PageViewTypeEnum.FOLDER:
      return 'Organize Folder'
    case PageViewTypeEnum.DOCUMENT:
      return 'Organize Document'
    case PageViewTypeEnum.ASSET: 
      return 'Organize File'
    default:
      return 'Organize'
  }
}