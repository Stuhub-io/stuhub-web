import { PropsWithChildren, ReactNode } from "react"


interface PageLayoutProps extends PropsWithChildren {
    breadCrumb?: ReactNode
    rightEl?: ReactNode
}

export const PageLayout = (props: PageLayoutProps) => {
    const { children, breadCrumb, rightEl } = props
    return (
        <div className="h-full w-full flex flex-col">
            <header className="bg-transparent flex justify-between h-14 items-center px-4">
                {breadCrumb}
                <div className=" flex items-center justify-end">
                    {rightEl}
                </div>
            </header>
            <main className="w-full flex-1 overflow-y-auto px-4">
                <div className="w-full max-w-[800px] mx-auto h-fit">
                {children}
                </div>
            </main>
        </div>
    )
}