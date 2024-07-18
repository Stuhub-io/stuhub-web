

interface IUserObj {
    lastName?: string
    firstName?: string
}
export const getUserFullName = (user: IUserObj) => {
    return [user.firstName, user.lastName].filter(Boolean).join(' ')
}