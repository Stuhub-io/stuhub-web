import { RiArrowRightUpLine, RiDeleteBinFill, RiEditBoxFill, RiFileCopyFill, RiLink, RiNewsFill, RiStarFill } from 'react-icons/ri'

export type PageItemKey =
  | 'star'
  | 'link'
  | 'duplicate'
  | 'rename'
  | 'move'
  | 'trash'
  | 'newtab'

export interface IPageMenuItem {
  key: PageItemKey
  title: string
  bottomDivider?: boolean
  icon?: React.ReactNode
}

export const MenuItems: IPageMenuItem[] = [
  {
    key: 'star',
    title: 'Add to Favorites',
    icon: <RiStarFill size={16} />,
  },
  {
    key: 'link',
    title: 'Copy link',
    bottomDivider: true,
    icon: <RiLink size={16} />,
  },
  {
    key: 'duplicate',
    title: 'Duplicate',
    icon: <RiFileCopyFill size={16} />,
  },
  {
    key: 'rename',
    title: 'Rename',
    icon: <RiEditBoxFill size={16} />
  },
  {
    key: 'move',
    title: 'Move to',
    bottomDivider: true,
    icon: <RiArrowRightUpLine size={16} />
  },
  {
    key: 'trash',
    title: 'Move to Trash',
    icon: <RiDeleteBinFill size={16} />
  },
  {
    key: 'newtab',
    title: 'Open in new tab',
    icon: <RiNewsFill size={16} />
  },
]
