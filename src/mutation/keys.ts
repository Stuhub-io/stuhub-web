import { GetOrgBySlugParams, GetOrgInviteByIdParams } from '@/schema/organization'
import { CreatePageRequest, GetPagesQuery } from '@/schema/page'

const PAGE_KEYS = {
  GET: 'GET_PAGE',
  LIST: 'GET_PAGES',
}

export const QUERY_KEYS = {
  GET_JOIN_ORGS: ['GET_JOIN_ORGS'],
  GET_ORG_BY_SLUG: ({ slug }: GetOrgBySlugParams) => ['GET_ORG_BY_SLUG', slug],
  GET_ORG_INVITE_BY_ID: ({ id }: GetOrgInviteByIdParams) => ['GET_ORG_INVITE_BY_ID', id],

  GET_ORG_PAGES: (query: GetPagesQuery) => [
    PAGE_KEYS.GET ,
    query.page,
    query.size,
    query.is_archived,
    query.org_pkid,
    query.parent_page_pkid || -1,
    query.all,
    JSON.stringify(query.view_types),
    ],
  GET_PAGE: ({ pageID }: { pageID: string }) => [PAGE_KEYS.GET, pageID],
}

export const MUTATION_KEYS = {
  CREATE_ORG: ['CREATE_ORG'],
  UPDATE_USER_INFO: ['UPDATE_USER_INFO'],
  FIND_USER_BY_EMAIL: ['FIND_USER_BY_EMAIL'],
  INVITE_ORG_MEMBERS: ['INVITE_ORG_MEMBERS'],
  ACCEPT_ORG_INVITE: ['ACCEPT_ORG_INVITE'],

  CREATE_PAGE: ({
    parent_page_pkid,
    org_pkid,
    tempId,
  }: { tempId?: string } & Pick<CreatePageRequest, 'parent_page_pkid' | 'org_pkid'>) => [
    'CREATE_PAGE',
    parent_page_pkid,
    org_pkid,
    tempId,
  ],
  UPDATE_PAGE: ({ id }: { id: string }) => ['UPDATE_PAGE', id],
  MOVE_PAGE: ({ id }: { id: string }) => ['MOVE_PAGE', id],
  UPDATE_PAGE_CONTENT : ({ id }: { id: string }) => ['UPDATE_PAGE_CONTENT', id],
  ARCHIVE_PAGE: ({ id }: { id: string }) => ['ARCHIVE_PAGE', id],
  CREATE_ASSET: 
  ({
    parent_page_pkid,
    org_pkid,
    tempId,
  }: { tempId?: string } & Pick<CreatePageRequest, 'parent_page_pkid' | 'org_pkid'>) => [
    'CREATE_PAGE_ASSET',
    parent_page_pkid,
    org_pkid,
    tempId,
  ],
}
