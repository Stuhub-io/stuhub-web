import { Layout } from '@/components/common/Layout'

export const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <Layout>
      <div className="flex h-full min-h-fit w-full flex-col items-center">{children}</div>
    </Layout>
  )
}
