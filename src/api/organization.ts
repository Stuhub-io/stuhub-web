import { Client } from '@/libs/client'
import fetcher from '@/libs/fetcher'
import { BaseResponse } from '@/schema/base'
import {
  CreateOrgnizationRequestBody,
  GetOrgBySlugParams,
  InviteOrgMembersRequestBody,
  InviteOrgMembersResponse,
  Organization,
  ValidateOrgInviteRequestBody,
  ValidateOrgInviteResponse,
} from '@/schema/organization'
import qs from 'querystring'

class OrganizationService extends Client {
  public createOrg(body: CreateOrgnizationRequestBody) {
    return fetcher<BaseResponse<Organization>>(`${this.baseUrl}/v1/organization-services/create`, {
      method: 'POST',
      headers: this.privateHeaders,
      body: JSON.stringify(body),
    })
  }

  public getJoinedOrgs() {
    return fetcher<BaseResponse<Organization[]>>(
      `${this.baseUrl}/v1/organization-services/joined`,
      {
        headers: this.privateHeaders,
      },
    )
  }

  public getOrgBySlug({ slug }: GetOrgBySlugParams) {
    const params = { slug }
    return fetcher<BaseResponse<Organization>>(
      `${this.baseUrl}/v1/organization-services/get-by-slug?${qs.stringify(params)}`,
      {
        headers: this.privateHeaders,
      },
    )
  }

  public inviteOrgMembers(body: InviteOrgMembersRequestBody) {
    return fetcher<BaseResponse<InviteOrgMembersResponse>>(
      `${this.baseUrl}/v1/organization-services/invite-by-emails`,
      {
        method: 'POST',
        headers: this.privateHeaders,
        body: JSON.stringify(body),
      },
    )
  }

  public validateOrgInvite(body: ValidateOrgInviteRequestBody) {
    return fetcher<BaseResponse<ValidateOrgInviteResponse>>(
      `${this.baseUrl}/v1/organization-services/invite-validate`,
      {
        method: 'POST',
        headers: this.privateHeaders,
        body: JSON.stringify(body),
      },
    )
  }
}

export const organizationService = new OrganizationService()
