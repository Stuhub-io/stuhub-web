import { User } from "./user"

// Entities
export interface CreateOrgnizationRequestBody {
    name: string
    description: string
    avatar: string
}

// Body, Params, ...
export interface Organization {
    id: string
    pk_id: number
    owner_id: number
    name: string
    slug: string
    description: string
    avatar: string
    created_at: string
    updated_at: string
    members: OrgMember[]
}

export type OrgRole = 'owner' | 'member'

export interface OrgMember {
    pk_id: number
    organization_pkid: number
    user_pkid: number
    role: OrgRole
    created_at: string
    updated_at: string
    user: User | null
}

export interface GetOrgBySlugParams {
    slug: string
}
