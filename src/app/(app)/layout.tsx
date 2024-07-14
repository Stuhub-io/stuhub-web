import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
  description: 'Shaping worklife',
}

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
