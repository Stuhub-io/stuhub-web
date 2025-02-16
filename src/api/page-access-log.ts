import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse, CursorPagination } from '@/schema/base'
import { GetPageAccessLogsQuery, PageAccessLog } from '@/schema/page-access-log'
import qs from 'querystring'

class PageAccessLogService extends Client {
  public getLogs(query: GetPageAccessLogsQuery) {
    return fetcher<BaseResponse<PageAccessLog[], CursorPagination>>(
      `${this.baseUrl}/v1/page-access-log-services/logs?${qs.stringify(query)}`,
      {
        headers: this.privateHeaders,
      },
    )
  }
}

export const pageAccessLogService = new PageAccessLogService()
