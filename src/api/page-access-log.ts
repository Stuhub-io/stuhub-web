import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse } from '@/schema/base'
import { PageAccessLog } from '@/schema/page-access-log'
// import qs from 'querystring'

class PageAccessLogService extends Client {
  public getLogs() {
    return fetcher<BaseResponse<PageAccessLog[]>>(`${this.baseUrl}/v1/page-access-log-services`, {
      headers: this.privateHeaders,
    })
  }
}

export const pageAccessLogService = new PageAccessLogService()
