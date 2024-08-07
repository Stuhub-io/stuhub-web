import { Organization, OrgRole } from "@/schema/organization";

export const getUserOrgPermission = (org: Organization, userPkID: number) => {
    const currentMember = org.members.find((member) => member.user_pkid === userPkID)
    return currentMember?.role
}

export const getPermissionText = (role: OrgRole | "other") => {
    return {
        owner: 'Owner',
        member: 'Member',
        other: '',
    }[role]
}