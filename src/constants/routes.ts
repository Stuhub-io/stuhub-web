export interface PageParams<T> {
  params: T
}

export interface OrganizationInviteParams extends Record<string, any> {
  inviteId: string
}

export interface OrganizationParams extends Record<string, any> {
  orgSlug: string
}

export interface OrganizationPageParams extends OrganizationParams {
  pageID: string
  openShare?: boolean
}

export const ROUTES = {
  // landing
  LANDING_PAGE: '/product',
  CHANGELOG_PAGE: '/changelog',
  SIGNIN_PAGE: '/signin',

  // app
  HOME_PAGE: '/',
  INVITE_PAGE: ({ inviteID }: { inviteID: string }) => `/invite/${inviteID}`,
  AUTH_EMAIL: '/auth-email',
  ORGANIZATION: ({ orgSlug }: OrganizationParams) => `/${orgSlug}`,
  VAULT_PAGE: ({ orgSlug, pageID, openShare }: OrganizationPageParams) => `/${orgSlug}/${pageID}${  openShare ? '?openShare=true' : ''}`,
  ROOT_VAULTS: ({ orgSlug }: OrganizationParams) => `/${orgSlug}/vaults`,
}
