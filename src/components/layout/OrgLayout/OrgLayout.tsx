import { PropsWithChildren, ReactNode } from 'react'

interface OrgLayoutProps extends PropsWithChildren {
  rightEl?: ReactNode
}

export const OrgLayout = (props: OrgLayoutProps) => {
  const { children, rightEl } = props
  return (
    <div className="flex h-full w-full flex-col px-4">
      <header className="flex h-14 w-full items-center justify-between bg-transparent">
        <div className='flex-1'/>
        <div className=" flex items-center justify-end">{rightEl}</div>
      </header>
      <main className="w-full flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
