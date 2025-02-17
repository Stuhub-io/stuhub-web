import { Skeleton } from '@nextui-org/react'

export const PageCardSkeleton = () => {
  return (
    <div className="h-full w-full rounded-lg bg-default-100">
      <div className="p-2">
        <div className="relative w-full overflow-hidden pb-[45%]">
          <Skeleton className="absolute inset-0 h-full w-full rounded-lg" />
        </div>
        <div
          className="flex w-full items-center gap-2 pl-2 pt-2"
        >
            <div className='flex flex-1 flex-col overflow-hidden gap-1'>
                <Skeleton className="h-[14px] w-2/3 rounded-lg" />
                <Skeleton className="h-[8px] w-[60px] rounded-lg" />
            </div>
        </div>
      </div>
    </div>
  )
}
