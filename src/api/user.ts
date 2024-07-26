

import { Client } from "@/libs/client";
import fetcher from "@/libs/fetcher";
import { BaseResponse } from "@/schema/base";
import { UpdateUserInfoBody, User } from "@/schema/user";

class UserService extends Client {
    public updateProfile(body: UpdateUserInfoBody){
        return fetcher<BaseResponse<User>>(`${this.baseUrl}/v1/user-services/update-info`, {
            method: 'PATCH',
            headers: this.privateHeaders,
            body: JSON.stringify(body)
        })
    }
}

export const userService = new UserService()