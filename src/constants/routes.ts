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
}

export const ROUTES = {
  // landing
  LANDING_PAGE: '/product',
  CHANGELOG_PAGE: '/changelog',
  SIGNIN_PAGE: '/signin',

  // app
  HOME_PAGE: '/',
  INVITE_PAGE: '/invite',
  AUTH_EMAIL: '/auth-email',
  ORGANIZATION: ({ orgSlug }: OrganizationParams) => `/${orgSlug}`,
  ORGANIZATION_PAGE: ({ orgSlug, pageID }: OrganizationPageParams) => `/${orgSlug}/${pageID}`,
}
