export type PageViewType = 'document' | 'table' // ...

export interface Page {
    id: string
    pk_id: number
    parent_page_pkid?: number
    space_pkid: number
    name: string
    created_at: string
    updated_at: string
    view_type: PageViewType
}

// Body, Params, ...

export interface CreatePageRequestBody {
    space_pk_id: number
    name: string
    view_type: PageViewType
    parent_page_pk_id?: number
}

export interface UpdatePageRequestBody {
    name: string
    parent_page_pk_id?: number
    view_type: PageViewType
}

export interface PagePkIDParams extends Record<string, any> {
    
}