export type PageViewType = 'document' | 'table' // ...

export interface Page {
    id: string
    pkid: number
    parent_page_pkid?: number
    space_pkid: number
    name: string
    created_at: string
    updated_at: string
    view_type: PageViewType
}

// Body, Params, ...

export interface CreatePageRequestBody {
    space_pkid: number
    name: string
    view_type: PageViewType
    parent_page_pkid?: number
}

export interface UpdatePageRequestBody {
    name: string
    parent_page_pkid?: number
    view_type: PageViewType
}

export interface PagePkIDParams extends Record<string, any> {
    
}