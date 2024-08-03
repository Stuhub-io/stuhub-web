import { User } from "./user"

// Entities
export interface Space {
    id: string
    pk_id: number
    owner_id: number
    name: string
    slug: string
    description: string
    avatar: string
    created_at: string
    updated_at: string
    members: SpaceMember[] | null
}

export type SpaceRole = 'owner' | 'member' | 'guest'

export interface SpaceMember {
    pk_id: number
    space_pkid: number
    user_pkid: number
    role: SpaceRole
    created_at: string
    updated_at: string
    user: User | null
}

// Body, Params, ...
export interface CreateSpaceRequestBody {
    organization_pkid: string
    name: string
    description: string
}

export interface OrganizationPkIDParams extends Record<string, any> {
    organization_pkid: number
}