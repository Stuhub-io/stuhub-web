import { GetOrgBySlugParams } from "@/schema/organization"

export const QUERY_KEYS = {
    GET_JOIN_ORGS: ['GET_JOIN_ORGS'],
    GET_ORG_BY_SLUG: ({slug}: GetOrgBySlugParams) => ['GET_ORG_BY_SLUG', slug]
}

export const MUTATION_KEYS = {
    CREATE_ORG: ['CREATE_ORG'],
    UPDATE_USER_INFO: ['UPDATE_USER_INFO'],
}
