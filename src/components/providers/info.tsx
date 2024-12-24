import createContext from '@/libs/context'
import { useDisclosure } from '@nextui-org/react'
import { PagePermissionRoleInfoModal } from '../info/PagePermissionRoleInfoModal'
import { PropsWithChildren } from 'react'

interface InfoProviderValue {
  openPagePermissionInfo: () => void
}

const [Provider, useInfoModals] = createContext<InfoProviderValue>({
  name: 'InfoProvider',
})
export { useInfoModals }

export const InfoProvider = ({ children }: PropsWithChildren) => {
  const {
    onOpen: openPagePermissionInfo,
    isOpen: isOpenPagePermissioninfo,
    onClose: onClosePagePermissionInfo,
  } = useDisclosure()

  return (
    <Provider
      value={{
        openPagePermissionInfo,
      }}
    >
      {children}
      <PagePermissionRoleInfoModal
        open={isOpenPagePermissioninfo}
        onClose={onClosePagePermissionInfo}
      />
    </Provider>
  )
}
