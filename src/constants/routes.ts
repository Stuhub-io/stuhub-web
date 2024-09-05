export interface PageParams<T> {
    params: T
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
    AUTH_EMAIL: '/auth-email',
    ORGANIZATION: ({orgSlug}: OrganizationParams) =>  `/${orgSlug}`,
    ORGANIZATION_PAGE: ({orgSlug, pageID}: OrganizationPageParams) => `/${orgSlug}/${pageID}`,
}
