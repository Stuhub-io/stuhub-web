import { useSidebar } from '@/components/providers/sidebar'
import { useViewType } from '@/hooks/useViewType'
import { cn, Skeleton } from '@nextui-org/react'
import { PageCardSkeleton } from '../PageCardSkeleton'

export const PageLoadingSkeleton = () => {
  const { showSidebar } = useSidebar()
  const { viewType } = useViewType()

  return (
    <div className="pb-[80px] md:px-4">
      <div className="mt-12">
        <Skeleton className="h-[28px] w-[200px] rounded-md" />
      </div>
      <div className="mt-6 flex h-[28px] items-center gap-4">
        <Skeleton className="h-full w-[100px] rounded-md" />
        <Skeleton className="h-full w-[60px] rounded-md" />
      </div>
      {viewType === 'grid' ? (
        <div
          className={cn('mt-[68px] w-full', {
            'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7':
              showSidebar,
            'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8':
              !showSidebar,
          })}
        >
          <PageCardSkeleton />
          <PageCardSkeleton />
        </div>
      ) : (
        <div className="p-8 bg-default-50 mt-[68px] rounded-large">
            <div className="grid w-full grid-cols-[2fr_1fr_1fr] gap-y-6 gap-x-4">
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            <Skeleton className="h-[24px] rounded-lg" />
            </div>
        </div>
      )}
    </div>
  )
}
