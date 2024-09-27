import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { CreatePageRequestBody, Page, UpdatePageRequestBody } from "@/schema/page";
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
}

export const pageService = new PageService()