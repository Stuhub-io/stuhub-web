import { Pagination } from './base'
import { Organization } from './organization'
import { User } from './user'

export type PageViewType = 1 | 2 | 3

export const PageViewTypeEnum = {
  DOCUMENT: 1 as PageViewType,
  FOLDER: 2 as PageViewType,
  ASSET: 3 as PageViewType,
} as const

export interface Page {
  id: string
  pkid: number
  parent_page_pkid?: number
  organization_pkid: number
  created_at: string
  updated_at: string
  archived_at?: string
  view_type: PageViewType
  cover_image: string
  node_id: string
  name: string
  is_shared?: boolean
  child_pages?: Page[]
  document?: Document
  asset?: Asset
  general_role?: PageRole
  author?: User
  organization?: Organization
  permissions?: PagePermissions
  parent_page?: Page
  ancestors?: Page[]
  page_star?: PageStar
}

export interface PageStar {
  pkid: number
  page_pkid: number
  user_pkid: number
  order: number
  created_at: string
}

export interface PagePermissions {
  can_edit: boolean
  can_view: boolean
  can_download: boolean
  can_share: boolean
  can_delete: boolean
  can_move: boolean
}

export interface Asset {
  pkid: number
  page_pkid: number
  updated_at: string
  created_at: string
  url: string
  size: number
  extension: string
  thumbnails: {
    small: string
    medium: string
    large: string
  }
}

export interface Document {
  pkid: number
  page_pkid: number
  content: string
  json_content: string
  updated_at: string
  created_at: string
}

export interface CreatePageRequest {
  org_pkid: number
  view_type: PageViewType
  name: string
  parent_page_pkid?: number
  cover_image: string
  document?: {
    json_content: string
  }
}

export type GetPagesQuery = Partial<Pagination> & {
  org_pkid: number
  view_types?: PageViewType[]
  parent_page_pkid?: number
  is_archived?: boolean
  all?: boolean
  is_starred?: boolean
}

export interface UpdatePageRequest {
  org_pkid?: number
  view_type?: PageViewType
  name?: string
  cover_image?: string
  document?: {
    json_content: string
  }
}

export interface MovePageRequest {
  parent_page_pkid?: number
}

export interface CreatePageAssetRequest extends Omit<CreatePageRequest, 'document'> {
  asset: {
    url: string
    size: number
    extension: string
    thumbnails: {
      small: string
      medium: string
      large: string
    }
  }
}

export type PageRole = 1 | 2 | 4

export const PageRoleEnum = {
  VIEWER: 1 as PageRole,
  EDITOR: 2 as PageRole,
  RESTRICTED: 4 as PageRole,
} as const

export interface UpdatePageGeneralAccessRequest {
  general_role?: PageRole
}

export interface PagePermissionRole {
  pkid: number
  page_pkid: number
  user?: User
  email: string
  role: PageRole
  created_at: string
  updated_at: string
  inherit_from_page?: Page
}

type PageRoleRequestStatus = 1 | 2 | 3

export const PageRoleRequestStatusEnum = {
  PENDING: 1 as PageRoleRequestStatus,
  ACCEPTED: 2 as PageRoleRequestStatus,
  REJECTED: 3 as PageRoleRequestStatus,
} as const

export interface PageRoleRequest {
  pkid: number
  page_pkid: number
  user_pkid: number
  email: string
  status: PageRoleRequestStatus
  user ?: User
}