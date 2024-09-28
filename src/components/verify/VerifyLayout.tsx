import { PropsWithChildren } from 'react'
import { Layout } from '../common/Layout'

export const VerifyLayout = ({ children }: PropsWithChildren) => {
  return <Layout className="background-landing flex flex-col">{children}</Layout>
}
