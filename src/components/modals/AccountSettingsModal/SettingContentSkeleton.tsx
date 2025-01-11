import { Skeleton } from "@nextui-org/react"


export const SettingContentSkeleton = () => {
    return (
        <div className="flex flex-col">
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[14px] w-[600px]" />
            <Skeleton className="h-[20px] w-[200px]" />
            <Skeleton className="h-[14px] w-[600px]" />
        </div>
    )
}