

import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { CreateOrgnizationRequestBody, GetOrgBySlugParams, Organization } from "@/schema/organization";
import qs from 'querystring'

class OrganizationService extends Client {
    public createOrg(body: CreateOrgnizationRequestBody){
        return fetcher<BaseResponse<Organization>>(`${this.baseUrl}/v1/organization-services/create`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }

    public getJoinedOrgs(){
        return fetcher<BaseResponse<Organization[]>>(`${this.baseUrl}/v1/organization-services/joined`, {
            headers: this.privateHeaders
        })
    }

    public getOrgBySlug({slug}: GetOrgBySlugParams){
        const params = {slug}
        return fetcher<BaseResponse<Organization>>(`${this.baseUrl}/v1/organization-services/get-by-slug?${qs.stringify(params)}`, {
            headers: this.privateHeaders
        })
    }
}

export const organizationService = new OrganizationService()