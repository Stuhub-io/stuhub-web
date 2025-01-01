import { Skeleton } from '@nextui-org/react'

export const SharePageItemSkeleton = () => {
  return (
    <div className="-mx-6 flex items-center gap-2 px-6 py-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex flex-1 flex-col gap-2 py-2">
        <Skeleton className="h-[16px] max-w-[180px] rounded-md" />
        <Skeleton className="h-[8px] w-[100px] rounded-md" />
      </div>
      <div>
        <Skeleton className="h-[20px] w-[80px] rounded-md" />
      </div>
    </div>
  )
}
