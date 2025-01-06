import { ReactNode } from "react"
import { RiArrowLeftLine, RiArrowRightSLine, RiArrowRightUpFill, RiDeleteBinLine, RiDownloadLine, RiEditLine, RiFolderOpenFill, RiInfoI, RiLink, RiShare2Fill, RiStarFill, RiUserShared2Fill } from "react-icons/ri"

export type MainMenuKeys =  'download' | 'rename' | 'share-menu' | 'organize-menu' | 'folder-info' | 'newtab' | 'trash'

export type OrganizeMenuKeys = 'org-back' | 'Move' | 'starred'

export type ShareMenuKeys = 'share-back' | 'share' | 'Copy link'

export type MenuSection = {
    key: MainMenuKeys| OrganizeMenuKeys | ShareMenuKeys
    title: string
    icon: ReactNode
    bottomDivider?: boolean
    rightEl?: ReactNode
}

export const MainMenuSections: MenuSection[] = [
    {
        key: 'download',
        title: 'Download',
        icon: <RiDownloadLine size={16} />,
    },
    {
        key: 'rename',
        title: 'Rename',
        icon: <RiEditLine size={16} />,
        bottomDivider: true,
    },
    {
        key: 'share-menu',
        title: 'Share',
        icon: <RiShare2Fill size={16} />,
        rightEl: <RiArrowRightSLine size={16} />,
    },
    {
        key: 'organize-menu',
        title: 'Organize Folder',
        icon: <RiFolderOpenFill size={16} />,
        rightEl: <RiArrowRightSLine size={16} />,
        bottomDivider: true,
    },
    {
        key: 'folder-info',
        title: 'Folder info',
        icon: <RiInfoI size={16} />,
    },
    {
        key: 'trash',
        title: 'Move to Trash',
        icon: <RiDeleteBinLine size={16} />,
    }
]

export const ShareMenuSectionItems: MenuSection[] = [
    {
        key: 'share-back',
        title: 'Share Menu',
        icon: <RiArrowLeftLine size={16} />,
        bottomDivider: true,
    },
    {
        key: 'share',
        title: 'Share',
        icon: <RiUserShared2Fill size={16} />,
    },
    {
        key: "Copy link",
        title: "Copy link",
        icon: <RiLink size={16} />,
    },
] as const

export const OrganizeSectionItems: MenuSection[] = [
    {
        key: 'org-back',
        title: 'Organize Menu',
        icon: <RiArrowLeftLine size={16} />,
        bottomDivider: true,
    },
    {
        key: 'Move',
        title: 'Move to',       
        icon: <RiArrowRightUpFill size={16} />,
    },
    {
        key: 'starred',
        title: 'Add to starred',
        icon: <RiStarFill size={16} />,
    }
]
