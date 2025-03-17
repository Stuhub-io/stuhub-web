import { VscodeDocumentIcon } from "@/components/icons/VsCodeDocumentIcon"
import { PageViewType, PageViewTypeEnum } from "@/schema/page"
import { RiFileLine, RiFolder3Line } from "react-icons/ri"
import { getIconByExtension } from "./file"

export const IPageFileTypeLabels = {
    FOLDER: 'Folders',
    DOCUMENT: 'Documents',
    PDF: 'PDFs',
    IMAGE: 'Photos & Images',
    VIDEO: 'Videos',
    AUDIO: 'Audios',
    OTHER: 'Other',
    FORM: 'Forms',
    SPREADSHEET: 'Spreadsheets',
} as const

export type PageFileTypeLabels = typeof IPageFileTypeLabels[keyof typeof IPageFileTypeLabels]

export const getPageIconByViewTypeOrExtension = (type: PageViewType, extension?: string, size: number= 20) => {
    switch (type) {
        case PageViewTypeEnum.FOLDER:
            return <RiFolder3Line size={size} />
        case PageViewTypeEnum.DOCUMENT:
            return <VscodeDocumentIcon width={size} height={size} />
        case PageViewTypeEnum.ASSET:
            if (extension) {
                const Icon = getIconByExtension(extension)
                return <Icon width={size} height={size} size={size}/>
            }
            return <RiFileLine size={size} />
    } 
}