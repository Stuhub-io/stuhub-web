import { Listbox, ListboxItem } from '@nextui-org/react'
import { IPageMenuItem, MenuItems, PageItemKey } from './utits'
import { Page } from '@/schema/page'
import { ROUTES } from '@/constants/routes'
import { useOrganization } from '@/components/providers/organization'
import useCopy from 'use-copy'
import { BASE_URL } from '@/constants/envs'

interface PageMoreMenuPopoverContentProps {
  onClose?: () => void
  onRename?: () => void
  onOpenMove?: () => void
  page: Page
  onArchive?: () => void
}

export const PageMoreMenuPopoverContent = (props: PageMoreMenuPopoverContentProps) => {
  const { onClose, page, onRename, onOpenMove, onArchive } = props
  const { organization } = useOrganization()

  const pageHref =
    BASE_URL +
    ROUTES.ORGANIZATION_PAGE({
      orgSlug: organization?.slug ?? '',
      pageID: page.id,
    })

  const [, copy] = useCopy(pageHref)

  return (
    <>
      <Listbox<IPageMenuItem>
        onAction={(key) => {
          onClose?.()
          switch (key as PageItemKey) {
            case 'link':
              copy()
              break
            case 'newtab':
              window.open(pageHref)
              break
            case 'rename':
              onRename?.()
              break
            case 'move':
              onOpenMove?.()
              break
            case 'trash':
              console.log('archive')
              onArchive?.()
              break
            default:
              break
          }
        }}
        classNames={{
          list: 'min-w-[240px]',
        }}
      >
        {MenuItems.map((item) => (
          <ListboxItem key={item.key} startContent={item.icon} showDivider={item.bottomDivider}>
            {item.title}
          </ListboxItem>
        ))}
      </Listbox>
    </>
  )
}
