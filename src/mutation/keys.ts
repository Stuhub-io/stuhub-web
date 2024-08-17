import { GetOrgBySlugParams } from "@/schema/organization"
import { OrganizationPkIDParams } from "@/schema/space"

export const QUERY_KEYS = {
    GET_JOIN_ORGS: ['GET_JOIN_ORGS'],
    GET_ORG_BY_SLUG: ({slug}: GetOrgBySlugParams) => ['GET_ORG_BY_SLUG', slug],
    GET_ORG_SPACES: ({organization_pkid}: OrganizationPkIDParams) => ['GET_ORG_SPACES', organization_pkid],
}

export const MUTATION_KEYS = {
    CREATE_ORG: ['CREATE_ORG'],
    UPDATE_USER_INFO: ['UPDATE_USER_INFO'],
    FIND_USER_BY_EMAIL: ['FIND_USER_BY_EMAIL'] ,
    INVITE_ORG_MEMBERS: ['INVITE_ORG_MEMBERS'] ,
}
