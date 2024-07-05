import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { AuthEmailStepOneData, AuthEmailStepOneRequest } from "@/schema/auth";
import { BaseResponse } from "@/schema/base";

class AuthService extends Client {
    public authEmailStepOne(body: AuthEmailStepOneRequest) {
        return fetcher<BaseResponse<AuthEmailStepOneData>>(`${this.baseUrl}/v1/auth-services/email-step-one/`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
}
export const authService = new AuthService()

