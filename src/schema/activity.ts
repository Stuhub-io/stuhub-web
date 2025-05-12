import { Page, PagePermissionRole } from './page'
import { User } from './user'

export const PageActivityActionCodeEnum = {
  USER_CREATE_FOLDER: 'user.create.folder',
  USER_UPLOADED_ASSETS: 'user.upload.assets',
  USER_CREATE_DOCUMENT: 'user.create.document',
} as const

type PageActivityActionCode = (typeof PageActivityActionCodeEnum)[keyof typeof PageActivityActionCodeEnum]

export type PageActivity = {
  pkid: number
  action_code: PageActivityActionCode
  user_pkid: number
  user?: User
  snapshot: string
  created_at: string
}

export type ActivityUserCreateAssetsSnapshot = {
  parent_page?: Page
  assets?: Page[]
}
export type ActivityUserCreateFolder = {
  parent_page?: Page
  child_page: Page
  page_roles?: PagePermissionRole[]
}

// type UserUploadedAssetsMeta struct {
// 	ParentPage *domain.Page  `json:"parent_page"`
// 	Assets     []domain.Page `json:"assets"`
// }