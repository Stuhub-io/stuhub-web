import { Listbox, ListboxItem } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { RiEyeOffLine, RiGridFill, RiListView } from 'react-icons/ri'
import { ILayoutSettings } from './constants'

interface RecentVisitPageMoreMenuProps extends PropsWithChildren {
  config?: ILayoutSettings
  onConfigChanged?: (config: ILayoutSettings) => void
  onClose?: () => void
}

export const RecentVisitPageMoreMenu = (props: RecentVisitPageMoreMenuProps) => {
  const {
    onClose,
    config = {
      layout: 'list',
      show: true,
    },
    onConfigChanged,
  } = props
  return (
    <Listbox>
      <ListboxItem
        key="edit"
        startContent={config.layout === 'list' ? <RiGridFill />: <RiListView/>}
        showDivider
        onClick={() => {
          onClose?.()
          onConfigChanged?.({
            ...config,
            layout: config.layout === 'grid' ? 'list' : 'grid',
          })
        }}
      >
        {config.layout === 'list' ? 'Use grid view' : 'Use list view'}
      </ListboxItem>
      <ListboxItem
        key="hide"
        startContent={<RiEyeOffLine />}
        onClick={() => {
          onClose?.()
          onConfigChanged?.({
            ...config,
            show: !config?.show,
          })
        }}
      >
        Hide from Home
      </ListboxItem>
    </Listbox>
  )
}
