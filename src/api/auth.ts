import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { AuthEmailStepOneData, AuthEmailStepOneRequest } from "@/schema/auth";
import { BaseResponse } from "@/schema/base";

class AuthService extends Client {
    public authEmailStepOne (body: AuthEmailStepOneRequest) {
        console.log(this)
        return fetcher<BaseResponse<AuthEmailStepOneData>>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth-services/email-step-one`,{
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
}
export const authService = new AuthService()

