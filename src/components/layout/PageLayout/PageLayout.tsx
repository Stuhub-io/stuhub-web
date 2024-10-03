import { PropsWithChildren, ReactNode } from 'react'

interface PageLayoutProps extends PropsWithChildren {
  breadCrumb?: ReactNode
  rightEl?: ReactNode
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, breadCrumb, rightEl } = props
  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex h-14 items-center justify-between bg-transparent px-4 shrink-0">
        <div className="flex-1 overflow-hidden">{breadCrumb}</div>
        <div className="flex flex-shrink-0 items-center justify-end pl-8">{rightEl}</div>
      </header>
      <main className="mx-auto w-full overflow-y-auto overflow-x-hidden px-4">
        <div className="max-w-[832px] mx-auto">{children}</div>
      </main>
    </div>
  )
}
