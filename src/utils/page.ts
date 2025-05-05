import { PageViewType, PageViewTypeEnum } from "@/schema/page"

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

// NOTE: Add this className for allow dimiss page selection
export const DIMISS_PAGE_SELECTION_CLS = "dimiss-page-selection"