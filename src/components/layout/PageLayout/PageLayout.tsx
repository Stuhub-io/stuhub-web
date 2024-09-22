import { PropsWithChildren, ReactNode } from 'react'

interface PageLayoutProps extends PropsWithChildren {
  breadCrumb?: ReactNode
  rightEl?: ReactNode
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, breadCrumb, rightEl } = props
  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex h-14 items-center justify-between bg-transparent px-4">
        <div className="flex-1 overflow-hidden">{breadCrumb}</div>
        <div className="flex flex-shrink-0 items-center justify-end pl-8">{rightEl}</div>
      </header>
      <main className="w-full flex-1 overflow-y-auto px-4">
        <div className="mx-auto h-fit w-full max-w-[800px]">{children}</div>
      </main>
    </div>
  )
}
