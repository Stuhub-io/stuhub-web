import { User } from "./user"

// Entities
export interface Space {
    id: string
    pkid: number
    owner_id: number
    name: string
    slug: string
    description: string
    is_private: boolean
    avatar: string
    created_at: string
    updated_at: string
    members: SpaceMember[] | null
}

export type SpaceRole = 'owner' | 'member' | 'guest'

export interface SpaceMember {
    pkid: number
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

export interface SpacePkIDParams extends Record<string, any> {
    space_pkid: number
}