import { PropsWithChildren, ReactNode } from "react"


interface ContentLayoutProps extends PropsWithChildren {
    breadCrumb?: ReactNode
    rightEl?: ReactNode
}

export const ContentLayout = (props: ContentLayoutProps) => {
    const { children, breadCrumb, rightEl } = props
    return (
        <div className="h-full w-full flex flex-col px-4">
            <header className="bg-transparent flex justify-between py-4">
                {breadCrumb}
                <div className=" flex items-center justify-end">
                    {rightEl}
                </div>
            </header>
            <main className="w-full flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}