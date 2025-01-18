export type Pagination = {
  size: number
  page: number
}

export type BaseResponse<T = undefined, K = Pagination> = {
  status: string
  code: number
  message?: string
  data: T
  pagination?: K
}

export type PromiseBaseResponse<T = undefined> = Promise<BaseResponse<T>>

export type CursorPagination<T = string> = {
  cursor: T
  next_cursor: T
  limit: number
}
