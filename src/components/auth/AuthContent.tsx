import { PropsWithChildren } from 'react'

export const AuthContent = ({ children }: PropsWithChildren) => {
  return <div className="grid flex-1 place-content-center">{children}</div>
}
