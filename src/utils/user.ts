interface IUserObj {
    lastName?: string
    firstName?: string
    email?: string
}

export const getUserFullName = (user: IUserObj) => {
    return [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email
}

/* eslint-disable no-useless-escape */
export const checkIsEmailValid = (email: string) => {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email)
}