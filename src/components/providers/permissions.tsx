import createContext from '@/libs/context'

export const Permissions = {
  page: {
    // canView: (user: User, page: Page) => {
    //   return true
    // },
    // canEdit: (user: User, page: Page) => {
    //   return true
    // },
    // canDelete: (user: User, page: Page) => {
    //   return true
    // },
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
