import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { CreatePageRequestBody, Page } from "@/schema/page";
import { SpacePkIDParams } from "@/schema/space";
import qs from 'querystring'

class PageService extends Client {
    public createPage(body: CreatePageRequestBody){
        return fetcher<BaseResponse<Page>>(`${this.baseUrl}/v1/page-services/create`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
    public getPagesBySpacePkID(params: SpacePkIDParams){
        return fetcher<BaseResponse<Page[]>>(`${this.baseUrl}/v1/page-services/all?${qs.stringify(params)}`,{
            headers: this.privateHeaders
        })
    }
}

export const pageService = new PageService()