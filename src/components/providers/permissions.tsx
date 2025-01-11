import createContext from '@/libs/context'
import { OrgRole } from '@/schema/organization'
import { Page } from '@/schema/page'
import { User } from '@/schema/user'

export const Permissions = {
  org: {
    setting: {
      view: (curUserOrgRole?: OrgRole) => {
        return ['owner', 'member'].includes(curUserOrgRole || '')
      },
      edit: (curUserOrgRole?: OrgRole) => {
        return curUserOrgRole === 'owner'
      },
    },
  },
  page: {
    canCreate: (parentPage: Page, user?: User) => {
      if (user?.id === parentPage.author?.id) return true
      return parentPage.permissions?.can_edit
    },
    canEdit: (page: Page, user?: User) => {
      if (user?.id === page.author?.id) return true
      return page.permissions?.can_edit
    },
    canDelete: (page: Page, parentPage?: Page) => {
      console.log(parentPage?.permissions)
      //FIXME check page belong to org
      if (!parentPage) {
        return page.permissions?.can_delete
      }
      return (
        parentPage.permissions?.can_edit && page.permissions?.can_delete
      )
    },
    canMove: (curUserRole: OrgRole, page: Page, desPage?: Page) => {
      if (!desPage) {
        return curUserRole === 'owner'
      } // move to root
      return desPage.permissions?.can_edit && page.permissions?.can_move
    },
    canShare: (page: Page) => {
      return page.permissions?.can_share
    },
    canDownload: (page: Page) => {
      return page.permissions?.can_download
    }
  },
} as const

const [Provider, usePermissions] = createContext<{
  permissionChecker: typeof Permissions
}>({
  name: 'PermissionContext',
})

export { usePermissions }

export const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider
      value={{
        permissionChecker: Permissions,
      }}
    >
      {children}
    </Provider>
  )
}
