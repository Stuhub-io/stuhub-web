
export type Pagination = {
    size: number
    page: number
}

export type  BaseResponse<T=undefined> = {
    status: string
    code: number
    message?: string
    data: T
    pagination?: Pagination
}

export type PromiseBaseResponse<T=undefined> = Promise<BaseResponse<T>>