import { PropsWithChildren, ReactNode } from "react"


interface PageLayoutProps extends PropsWithChildren {
    breadCrumb?: ReactNode
    rightEl?: ReactNode
}

export const PageLayout = (props: PageLayoutProps) => {
    const { children, breadCrumb, rightEl } = props
    return (
        <div className="h-full w-full flex flex-col px-4">
            <header className="bg-transparent flex justify-between h-14 items-center">
                {breadCrumb}
                <div className=" flex items-center justify-end">
                    {rightEl}
                </div>
            </header>
            <main className="w-full flex-1 overflow-y-auto max-w-[800px] mx-auto">
                {children}
            </main>
        </div>
    )
}