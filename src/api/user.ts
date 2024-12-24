

import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { FindUserByEmail, SearchUserBody, UpdateUserInfoBody, User } from "@/schema/user";

class UserService extends Client {
    public findUserByEmail(body: FindUserByEmail){
        return fetcher<BaseResponse<{user: User | null}>>(`${this.baseUrl}/v1/user-services/find-by-email`, {
            method: 'POST',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }

    public updateProfile(body: UpdateUserInfoBody){
        return fetcher<BaseResponse<User>>(`${this.baseUrl}/v1/user-services/update-info`, {
            method: 'PATCH',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }

    public searchUser(body: SearchUserBody){
        return fetcher<BaseResponse<User[]>>(
            `${this.baseUrl}/v1/user-services/search`, {
                method: 'POST',
                headers: this.privateHeaders,
                body: JSON.stringify(body)
            }
        )
    }
}

export const userService = new UserService()