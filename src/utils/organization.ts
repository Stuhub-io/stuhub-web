import { Organization, OrgRole } from "@/schema/organization";

export const getUserOrgPermission = (org: Organization, userPkID: number) => {
    const currentMember = org.members.find((member) => member.user_pkid === userPkID)
    return currentMember?.role
}

export const getUserOrgRoleDisplay = (role: OrgRole | "guest") => {
    return {
        owner: 'Owner',
        member: 'Member',
        guest: 'Guest',
    }[role]
}

export const getRoleColor = (role: OrgRole | "guest") => {
    return ({
        owner: 'primary',
        member: 'success',
        guest: 'warning',
    } as const)[role]
}