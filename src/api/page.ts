import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse } from '@/schema/base'
import { CreatePageRequest, GetPagesQuery, Page, UpdatePageRequest } from '@/schema/page'
import qs from 'querystring'

class PageService extends Client {
  public createPage(body: CreatePageRequest) {
    return fetcher<BaseResponse<Page>>(
      `${this.baseUrl}/v1/page-services/pages`,
      {
        method: 'POST',
        headers: this.privateHeaders,
        body: JSON.stringify(body),
      },
    )
  }

  public getPages(query: GetPagesQuery) {
    return fetcher<BaseResponse<Page[]>>(
      `${this.baseUrl}/v1/page-services/pages?${qs.stringify(query)}`,
      {
        headers: this.privateHeaders
      }
    )
  }

  public getPage(id: string) {
    return fetcher<BaseResponse<Page>>(
      `${this.baseUrl}/v1/page-services/pages/id/${id}`,
      {
        headers: this.privateHeaders,
      },
    )
  }

  public updatePage(request: {
    pkid: number,
    body: UpdatePageRequest
  } ) {
    return fetcher<BaseResponse<Page>>(
      `${this.baseUrl}/v1/page-services/pages/${request.pkid}`,
      {
        method: 'PUT',
        headers: this.privateHeaders,
        body: JSON.stringify(request.body),
      }
    )
  }
  public archivePage(pkid: number) {
    return fetcher<BaseResponse<Page>>(
      `${this.baseUrl}/v1/page-services/pages/${pkid}`,
      {
        method: 'DELETE',
        headers: this.privateHeaders,
      }
    )
  }

}

export const pageService = new PageService()
