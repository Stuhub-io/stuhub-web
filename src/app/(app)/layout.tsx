import { AppProviders } from '@/components/providers'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>
}
