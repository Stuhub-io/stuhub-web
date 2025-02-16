import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse } from '@/schema/base'
import {
  CreatePageAssetRequest,
  CreatePageRequest,
  GetPagesQuery,
  MovePageRequest,
  Page,
  PagePermissionRole,
  PageRole,
  PageRoleRequest,
  PageViewTypeEnum,
  UpdatePageGeneralAccessRequest,
  UpdatePageRequest,
} from '@/schema/page'
import qs from 'querystring'

class PageService extends Client {
  public createPage(body: CreatePageRequest) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(body),
    })
  }

  public getPages(query: GetPagesQuery) {
    return fetcher<BaseResponse<Page[]>>(`${this.baseUrl}/v1/page-services/pages?${qs.stringify(query)}`, {
      headers: this.privateHeaders,
    })
  }

  public getPage(id: string) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/id/${id}`, {
      headers: this.privateHeaders,
    })
  }

  public updatePage(request: { pkid: number; body: UpdatePageRequest }) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${request.pkid}`, {
      method: 'PUT',
      headers: this.privateHeaders,
      body: JSON.stringify(request.body),
    })
  }
  public archivePage(pkid: number) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${pkid}`, {
      method: 'DELETE',
      headers: this.privateHeaders,
    })
  }
  public updatePageContent(request: {
    pkid: number
    body: {
      json_content: string
    }
  }) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${request.pkid}/content`, {
      method: 'PUT',
      headers: this.privateHeaders,
      body: JSON.stringify(request.body),
    })
  }
  public movePage(request: { pkid: number; body: MovePageRequest }) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${request.pkid}/move`, {
      method: 'PUT',
      headers: this.privateHeaders,
      body: JSON.stringify(request.body),
    })
  }

  // assets
  public createAsset(request: CreatePageAssetRequest) {
    request.view_type = PageViewTypeEnum.ASSET
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/assets`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(request),
    })
  }

  // permissions

  public updateGeneralAccess(request: { pagePkID: number; body: UpdatePageGeneralAccessRequest }) {
    return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${request.pagePkID}/general-access`, {
      method: 'PUT',
      headers: this.privateHeaders,
      body: JSON.stringify(request.body),
    })
  }

  public getPagePermissionRoles(pagePkID: number) {
    return fetcher<BaseResponse<PagePermissionRole[]>>(`${this.baseUrl}/v1/page-services/pages/${pagePkID}/roles`, {
      headers: this.privateHeaders,
    })
  }

  public addUserPermissionRole({ pagePkID, ...body }: { pagePkID: number; email: string; role: PageRole }) {
    return fetcher<BaseResponse<PagePermissionRole>>(`${this.baseUrl}/v1/page-services/pages/${pagePkID}/roles`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(body),
    })
  }

  public updateUserPermissionRole({ pagePkID, ...body }: { pagePkID: number; role: PageRole; email: string }) {
    return fetcher<BaseResponse<PagePermissionRole>>(`${this.baseUrl}/v1/page-services/pages/${pagePkID}/roles`, {
      method: 'PATCH',
      headers: this.privateHeaders,
      body: JSON.stringify(body),
    })
  }
  public removeUserPermissionRole({ pagePkID, email }: { pagePkID: number; email: string }) {
    return fetcher<BaseResponse<PagePermissionRole>>(`${this.baseUrl}/v1/page-services/pages/${pagePkID}/roles`, {
      method: 'DELETE',
      headers: this.privateHeaders,
      body: JSON.stringify({ email }),
    })
  }

  // role requests
  public getUserPermissionRoleRequests(pagePkID: number) {
    return fetcher<BaseResponse<PageRoleRequest[]>>(
      `${this.baseUrl}/v1/page-services/pages/${pagePkID}/role-requests`,
      {
        headers: this.privateHeaders,
      },
    )
  }
  public requestPermissionRole({ pageID }: { pageID: string }) {
    return fetcher<BaseResponse<PagePermissionRole>>(
      `${this.baseUrl}/v1/page-services/pages/id/${pageID}/role-requests`,
      {
        method: 'POST',
        headers: this.privateHeaders,
      },
    )
  }

  public acceptPermissionRoleRequest({ pagePkID, email, role }: { pagePkID: number; email: string; role: PageRole }) {
    return fetcher<BaseResponse<PagePermissionRole>>(
      `${this.baseUrl}/v1/page-services/pages/${pagePkID}/role-requests/accept`,
      {
        method: 'POST',
        body: JSON.stringify({ email, role }),
        headers: this.privateHeaders,
      },
    )
  }

  public rejectPermissionRoleRequest({ pagePkID, emails }: { pagePkID: number; emails: string[] }) {
    return fetcher<BaseResponse<PagePermissionRole>>(
      `${this.baseUrl}/v1/page-services/pages/${pagePkID}/role-requests/reject`,
      {
        method: 'POST',
        body: JSON.stringify({ emails }),
        headers: this.privateHeaders,
      },
    )
  }

  public unstarPage({pagePkID}: {pagePkID: number}) {
    return fetcher<BaseResponse>(`${this.baseUrl}/v1/page-services/pages/${pagePkID}/unstar`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify({
        page_pkid: pagePkID,
      }),
    })
  }

  public starPage({pagePkID}: {pagePkID: number}) {
    return fetcher<BaseResponse>(`${this.baseUrl}/v1/page-services/pages/${pagePkID}/star`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify({
        page_pkid: pagePkID,
      }),
    })
  }
}

export const pageService = new PageService()
