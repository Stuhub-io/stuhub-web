import { Pagination } from "./base"


export type PageViewType = 1 | 2 | 3

export const PageViewTypeEnum = {
  DOCUMENT: 1 as PageViewType,
  FOLDER: 2 as PageViewType,
  ASSET: 3 as PageViewType
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
    child_pages?: Page[]
    document?: Document
    asset?: Asset
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