import { PropsWithChildren } from 'react'
import { AppProviders } from '@/components/providers/AppProviders'

export default function Layout({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>
}
