import { PropsWithChildren, ReactNode } from "react"

interface OrgLayoutProps extends PropsWithChildren {
    rightEl?: ReactNode
}

export const OrgLayout = (props: OrgLayoutProps) => {
    const { children, rightEl } = props
    return (
        <div className="h-full w-full flex flex-col px-4">
            <header className="bg-transparent flex justify-between h-14 items-center w-full">
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