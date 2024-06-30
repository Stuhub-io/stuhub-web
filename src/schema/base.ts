
export type Pagination = {
    size: number
    offset: number
}

export type  BaseResponse<T=undefined> = {
    status: string
    code: number
    message?: string
    data: T
    pagination?: Pagination
}

export type PromiseBaseResponse<T=undefined> = Promise<BaseResponse<T>>