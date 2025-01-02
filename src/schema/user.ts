import { Pagination } from "./base"

// Entities
export interface User {
  pkid: number
  id: string
  first_name: string
  last_name: string
  avatar: string
  email: string
  have_password: boolean
  oauth_gmail: string
  created_at: string
  updated_at: string
}

// Body, Params, ...
export interface FindUserByEmail {
  email: string
}

export interface UpdateUserInfoBody {
  first_name: string
  last_name: string
  avatar: string
}

export interface SearchUserBody extends Partial<Pagination> {
  search: string
  emails?: string[]
  org_pkid?: number

}