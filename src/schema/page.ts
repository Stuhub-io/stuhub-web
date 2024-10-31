export type PageViewType = 'document' | 'table' // ...

export interface Page {
    id: string
    pkid: number
    parent_page_pkid?: number
    space_pkid: number
    name: string
    created_at: string
    archived_at?: string
    updated_at: string
    view_type: PageViewType
    cover_image: string
    child_pages?: Page[]
    node_id?: string
}

// Body, Params, ...

export interface CreatePageRequestBody {
    space_pkid: number
    name: string
    view_type: PageViewType
    parent_page_pkid?: number
    node_id?: string
}

export interface BulkGetOrCreateRequestBody {
    page_inputs: CreatePageRequestBody[]
}
export interface BulkDeletePageRequestBody {
    page_pkids: number[]
}

export interface UpdatePageRequestBody {
    name: string
    parent_page_pkid?: number
    view_type: PageViewType
    cover_image?: string
}

export interface PagePkIDParams extends Record<string, any> {}