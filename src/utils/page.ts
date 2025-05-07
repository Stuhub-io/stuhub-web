import { Page, PageViewType, PageViewTypeEnum } from "@/schema/page"
import { isAudioExtension, isImageExtension, isVideoExtension } from "./file"

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

export const getMenuLabelPageViewType = (viewType: PageViewType) => {
    switch (viewType) {
        case PageViewTypeEnum.ASSET:
            return "Asset"
        case PageViewTypeEnum.DOCUMENT:
            return "Document"
        case PageViewTypeEnum.FOLDER:
            return "Folder"
    }
}

export const getFileTypeLabel = (page?: Page) => {
    switch (page?.view_type) {
        case PageViewTypeEnum.DOCUMENT:
            return "Document"
        case PageViewTypeEnum.FOLDER:
            return "Folder"
        case PageViewTypeEnum.ASSET:
            if (page.asset?.extension === "pdf") return "PDF"
            if (isAudioExtension(page.asset?.extension)) return "Audio"
            if (isImageExtension(page.asset?.extension)) return "Image"
            if (isVideoExtension(page.asset?.extension)) return "Video"
            return "Unknown"
        default:
            return "Unknown"
    }
}

// NOTE: Add this className for allow dimiss page selection
export const DIMISS_PAGE_SELECTION_CLS = "dimiss-page-selection"