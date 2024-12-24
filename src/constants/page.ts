import { PageRoleEnum } from "@/schema/page"

export const AssetType = {
  IMAGE: 'Photos & Images',
  VIDEO: 'Videos',
  PDF: 'PDFs',
  AUDIO: 'AUDIO',
  FOLDER: 'Folders',
  DOCUMENT: 'Documents',
  OTHER: 'Others',
  SPREADSHEET: 'Spreadsheets',
  FORM: 'Forms',
} as const

export const PAGE_PERMISSIONS_LABEL = {
  [PageRoleEnum.EDITOR]: 'Editor',
  [PageRoleEnum.VIEWER]: 'Viewer',
} as const