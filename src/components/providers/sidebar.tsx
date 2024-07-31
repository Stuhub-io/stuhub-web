'use client'

import createContext from '@/libs/context'
import { PropsWithChildren } from 'react'

const [Provider, useSidebar] = createContext({
  name: 'SidebarContext',
})

export { useSidebar }

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  return <Provider value={{}}>{children}</Provider>
}
