import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { AuthEmailPasswordData, AuthEmailPasswordRequest, AuthEmailStepOneData, AuthEmailStepOneRequest, OAuthGoogleData, OAuthGoogleRequest } from "@/schema/auth";
import { BaseResponse } from "@/schema/base";
import { User } from "@/schema/user";

class AuthService extends Client {
    public authEmailStepOne(body: AuthEmailStepOneRequest) {
        return fetcher<BaseResponse<AuthEmailStepOneData>>(`${this.baseUrl}/v1/auth-services/email-step-one`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }

    public authWithEmailPassword(body: AuthEmailPasswordRequest) {
        return fetcher<BaseResponse<AuthEmailPasswordData>>(`${this.baseUrl}/v1/auth-services/email`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }

    public getUserProfileByToken({accessToken}: {accessToken: string}){
        return fetcher<BaseResponse<User>>(`${this.baseUrl}/v1/auth-services/user-by-token`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify({access_token: accessToken
            })
        })
    }

    public googleOauth(body: OAuthGoogleRequest) {
        // NOTE: Exchange google token to access token
        return fetcher<BaseResponse<OAuthGoogleData>>(`${this.baseUrl}/v1/auth-services/google`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
}
export const authService = new AuthService()

