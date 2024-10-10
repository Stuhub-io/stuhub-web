import { GetOrgBySlugParams, GetOrgInviteByIdParams } from '@/schema/organization'
import { CreatePageRequestBody } from '@/schema/page'
import { OrganizationPkIDParams, SpacePkIDParams } from '@/schema/space'

export const QUERY_KEYS = {
  GET_JOIN_ORGS: ['GET_JOIN_ORGS'],
  GET_ORG_BY_SLUG: ({ slug }: GetOrgBySlugParams) => ['GET_ORG_BY_SLUG', slug],
  GET_ORG_INVITE_BY_ID: ({ id }: GetOrgInviteByIdParams) => ['GET_ORG_INVITE_BY_ID', id],
  GET_ORG_SPACES: ({ organization_pkid }: OrganizationPkIDParams) => [
    'GET_ORG_SPACES',
    organization_pkid,
  ],
  GET_SPACE_PAGES: ({ space_pkid }: SpacePkIDParams) => ['GET_SPACE_PAGES', space_pkid],
  GET_PAGE: ({ pageID }: { pageID: string }) => ['GET_PAGE', pageID],
  GET_PAGE_DOC: ({ page_pkid }: { page_pkid: number }) => ['GET_PAGE_DOCS', page_pkid],
}

export const MUTATION_KEYS = {
  CREATE_ORG: ['CREATE_ORG'],
  UPDATE_USER_INFO: ['UPDATE_USER_INFO'],
  FIND_USER_BY_EMAIL: ['FIND_USER_BY_EMAIL'],
  INVITE_ORG_MEMBERS: ['INVITE_ORG_MEMBERS'],
  ACCEPT_ORG_INVITE: ['ACCEPT_ORG_INVITE'],
  CREATE_PAGE: ({
    parent_page_pkid,
    space_pkid,
    id,
  }: { id?: string } & Pick<CreatePageRequestBody, 'parent_page_pkid' | 'space_pkid'>) => [
    'CREATE_PAGE',
    parent_page_pkid,
    space_pkid,
    id,
  ],
  UPDATE_PAGE: ({ id }: { id: string }) => ['UPDATE_PAGE', id],
  ARCHIVE_PAGE: ({ id }: { id: string }) => ['ARCHIVE_PAGE', id],
  CREATE_DOC: ({
    parent_page_pkid,
    space_pkid,
    tempId,
  }: { tempId?: string } & Pick<CreatePageRequestBody, 'parent_page_pkid' | 'space_pkid'>) => [
    'CREATE_DOC',
    parent_page_pkid,
    space_pkid,
    tempId,
  ],
  UPDATE_DOC_CONTENT: ['UPDATE_DOC_CONTENT'],
}
