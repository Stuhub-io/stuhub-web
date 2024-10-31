import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { BulkDeletePageRequestBody, BulkGetOrCreateRequestBody, CreatePageRequestBody, Page, UpdatePageRequestBody } from "@/schema/page";
import { SpacePkIDParams } from "@/schema/space";
import qs from 'querystring'

class PageService extends Client {
    public createPage(body: CreatePageRequestBody){
        return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
    public getPagesBySpacePkID(params: SpacePkIDParams){
        return fetcher<BaseResponse<Page[]>>(`${this.baseUrl}/v1/page-services/pages?${qs.stringify(params)}`,{
            headers: this.privateHeaders
        })
    }
    public getPageByID(uuid: string){
        return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${uuid}`,{
            headers: this.privateHeaders
        })
    }
    public updatePageByID({id, ...body}: UpdatePageRequestBody & {id: string}){
        return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${id}`,{
            method: 'PUT',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
    public archivePageByID(id: string){
        return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/pages/${id}/archive`,{
            method: "POST",
            headers: this.privateHeaders
        })
    }
    public bulkGetOrCreatePages(body: BulkGetOrCreateRequestBody){
        return fetcher<BaseResponse<Page[]>>(`${this.baseUrl}/v1/page-services/pages/bulk`,{
            method: "POST",
            body: JSON.stringify(body),
            headers: this.privateHeaders
        })
    }
    public bulkArchivePages(body: BulkDeletePageRequestBody){
        return fetcher<BaseResponse<Page[]>>(`${this.baseUrl}/v1/page-services/pages/bulk`,{
            method: "DELETE",
            body: JSON.stringify(body),
            headers: this.privateHeaders
        })
    }
}

export const pageService = new PageService()