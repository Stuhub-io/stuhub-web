import { BaseResponse } from "@/schema/base"
import { Page } from "@/schema/page"
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query"
import { FC } from "react"

export interface BasePageViewerProps {
  page?: Page
  mutatePage?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<BaseResponse<Page>, Error>>
  onAddCoverImage?: () => void
  hasCoverImage?: boolean
  isLoading?: boolean
  isRefetching?: boolean
}

export type PageViewer<T extends BasePageViewerProps = BasePageViewerProps> = FC<T>