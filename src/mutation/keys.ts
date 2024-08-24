import { GetOrgBySlugParams } from "@/schema/organization"
import { CreatePageRequestBody } from "@/schema/page"
import { OrganizationPkIDParams, SpacePkIDParams } from "@/schema/space"

export const QUERY_KEYS = {
    GET_JOIN_ORGS: ['GET_JOIN_ORGS'],
    GET_ORG_BY_SLUG: ({slug}: GetOrgBySlugParams) => ['GET_ORG_BY_SLUG', slug],
    GET_ORG_SPACES: ({organization_pkid}: OrganizationPkIDParams) => ['GET_ORG_SPACES', organization_pkid],
    GET_SPACE_PAGES: ({space_pk_id}: SpacePkIDParams) => ['GET_SPACE_PAGES', space_pk_id],
}

export const MUTATION_KEYS = {
    CREATE_ORG: ['CREATE_ORG'],
    UPDATE_USER_INFO: ['UPDATE_USER_INFO'],
    FIND_USER_BY_EMAIL: ['FIND_USER_BY_EMAIL'] ,
    INVITE_ORG_MEMBERS: ['INVITE_ORG_MEMBERS'] ,
    CREATE_PAGE: ({
        parent_page_pk_id,
        space_pk_id
    }: Pick<CreatePageRequestBody, 'parent_page_pk_id'|'space_pk_id'>) => ['CREATE_PAGE', parent_page_pk_id, space_pk_id],
}
