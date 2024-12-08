
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