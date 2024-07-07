import { User } from "next-auth"

export type AuthEmailStepOneRequest = {
    email: string
}

export type AuthEmailStepOneData = {
    email: string
    is_required_email: boolean
}

export type AuthEmailPasswordRequest = {
    email: string
    password: string
}

export type AuthEmailPasswordData = {
    tokens: {
        access: string
        refresh: string
    }
    profile: User
}

export type OAuthGoogleRequest = {
    token: string
}

export type OAuthGoogleData = {
    tokens: {
        access: string
        refresh: string
    }
    profile: User
}