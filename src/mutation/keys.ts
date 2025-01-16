import { GetOrgBySlugParams, GetOrgInviteByIdParams } from '@/schema/organization'
import { CreatePageRequest, GetPagesQuery } from '@/schema/page'
import { SearchUserBody } from '@/schema/user'

const PAGE_KEYS = {
  GET: 'GET_PAGE',
  LIST: 'GET_PAGES',
}

export const QUERY_KEYS = {
  GET_JOIN_ORGS: ['GET_JOIN_ORGS'],
  GET_ORG_BY_SLUG: ({ slug }: GetOrgBySlugParams) => ['GET_ORG_BY_SLUG', slug],
  GET_ORG_INVITE_BY_ID: ({ id }: GetOrgInviteByIdParams) => ['GET_ORG_INVITE_BY_ID', id],

  GET_ORG_PAGES: (query: GetPagesQuery) => [
    PAGE_KEYS.GET,
    query.page,
    query.size,
    query.is_archived,
    query.org_pkid,
    query.parent_page_pkid || -1,
    query.all,
    JSON.stringify(query.view_types),
  ],
  GET_PAGE: ({ pageID }: { pageID: string }) => [PAGE_KEYS.GET, pageID],
  GET_PAGE_PERMISSION_ROLES: ({ pagePkID }: { pagePkID: number }) => [
    'GET_PAGE_PERMISSION_ROLES',
    pagePkID,
  ],
  SEARCH_USERS: (params: SearchUserBody) => [
    'SEARCH_USERS',
    params.page,
    params.size,
    params.search,
    params.org_pkid,
    JSON.stringify(params.emails),
  ],
  GET_PAGE_ACCESS_LOGS: ['GET_PAGE_ACCESS_LOGS'],
  
  // Role Requests
  LIST_PAGE_ROLE_REQUESTS: ({pagePkID}: {pagePkID: number}) => ['LIST_PAGE_ROLE_REQUESTS', pagePkID],
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
  UPDATE_PAGE_CONTENT: ({ id }: { id: string }) => ['UPDATE_PAGE_CONTENT', id],
  ARCHIVE_PAGE: ({ id }: { id: string }) => ['ARCHIVE_PAGE', id],
  CREATE_ASSET: ({
    parent_page_pkid,
    org_pkid,
    tempId,
  }: { tempId?: string } & Pick<CreatePageRequest, 'parent_page_pkid' | 'org_pkid'>) => [
    'CREATE_PAGE_ASSET',
    parent_page_pkid,
    org_pkid,
    tempId,
  ],
  // page roles
  UPDATE_PAGE_GENERAL_ACCESS: ({ pagePkID }: { pagePkID: number }) => [
    'UPDATE_PAGE_GENERAL_ACCESS',
    pagePkID,
  ],

  ADD_USER_PAGE_ROLE: ({ pagePkID }: { pagePkID: number }) => ['ADD_USER_PAGE_ROLE', pagePkID],
  UPDATE_USER_PAGE_ROLE: ({ pagePkID }: { pagePkID: number }) => [
    'UPDATE_USER_PAGE_ROLE',
    pagePkID,
  ],
  REMOVE_USER_PAGE_ROLE: ({ pagePkID }: { pagePkID: number }) => [
    'REMOVE_USER_PAGE_ROLE',
    pagePkID,
  ],
  REQUEST_USER_PAGE_ROLE: ({ pageID }: { pageID: string }) => [
    'REQUEST_USER_PAGE_ROLE',
    pageID,
  ],
  ACCEPT_USER_PAGE_ROLE: ({ pagePkID }: { pagePkID: number }) => [
    'ACCEPT_USER_PAGE_ROLE',
    pagePkID,
  ],
  REJECT_USER_PAGE_ROLE: ({ pagePkID }: { pagePkID: number }) => [
    'REJECT_USER_PAGE_ROLE',
    pagePkID,
  ],
}
