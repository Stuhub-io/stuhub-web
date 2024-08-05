import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { CreateSpaceRequestBody, OrganizationPkIDParams, Space } from "@/schema/space";
import qs from 'querystring'

class SpaceService extends Client {
    public createSpace(body: CreateSpaceRequestBody){
        return fetcher<BaseResponse<Space>>(`${this.baseUrl}/v1/space-services/create`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
    public getSpacesByOrgPkID(params: OrganizationPkIDParams){
        return fetcher<BaseResponse<Space[]>>(`${this.baseUrl}/v1/space-services/joined?${qs.stringify(params)}`,{
            headers: this.privateHeaders
        })
    }
}

export const spaceService = new SpaceService()