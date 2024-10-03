'use client'

import { PageCoverImage } from '@/components/page/PageCoverImage'
import { PropsWithChildren, ReactNode } from 'react'
import { PageLayoutContextProvider } from './context'

interface PageLayoutProps extends PropsWithChildren {
  breadCrumb?: ReactNode
  rightEl?: ReactNode
}

export interface PageLayoutContextValues {
  setCoverImageUrl(url: string): void
  currentCoverImageUrl: string
}

export const PageLayout = (props: PageLayoutProps) => {
  const { children, breadCrumb, rightEl } = props

  return (
    <PageLayoutContextProvider>
      <div className="flex h-full w-full flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between bg-transparent px-4">
          <div className="flex-1 overflow-hidden">{breadCrumb}</div>
          <div className="flex flex-shrink-0 items-center justify-end pl-8">{rightEl}</div>
        </header>
        <main className="mx-auto w-full overflow-y-auto overflow-x-hidden px-4">
          <PageCoverImage />
          {children}
        </main>
      </div>
    </PageLayoutContextProvider>
  )
}
