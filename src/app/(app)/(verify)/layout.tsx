import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stuhub',
}

export default function ValidateOrgInviteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex items-center justify-center">{children}</div>
}
