import { User } from './user'

// Entities
export interface CreateOrgnizationRequestBody {
  name: string
  description: string
  avatar: string
}

// Body, Params, ...
export interface Organization {
  pkid: number
  id: string
  owner_id: number
  name: string
  slug: string
  description: string
  avatar: string
  created_at: string
  updated_at: string
  owner: User | null
  members: OrgMember[]
}

export type OrgRole = 'owner' | 'member'

export interface OrgMember {
  pkid: number
  organization_pkid: number
  user_pkid: number
  role: OrgRole
  created_at: string
  updated_at: string
  user: User | null
}

export interface OrgInvite {
  pkid: number
  id: string
  user_pkid: number
  organization_pkid: number
  is_used: boolean
  created_at: string
  expired_at: string
  organization: Organization
}

export interface MemberItem {
  pkid: number
  fullName: string
  role: string
  teamspaces: {
    id: number
    name: string
    slug: string
  }[]
  avatar: string
  email: string
}

export interface GetOrgBySlugParams {
  slug: string
}

export interface InviteOrgMembersRequestBody {
  org_info: {
    pkid: number
    name: string
    slug: string
    avatar: string
    members: number
  }
  infos: {
    email: string
    role: string
  }[]
}

export interface InviteOrgMembersResponse {
  sent_emails: string[] | null
  failed_emails: string[] | null
}

export interface GetOrgInviteByIdParams {
  id: string
}

export interface GetOrgInviteByIdResponse extends OrgInvite {}

export interface ValidateOrgInviteRequestBody {
  token: string
}

export interface ValidateOrgInviteResponse extends OrgMember {}
