import { useSidebar } from '@/components/providers/sidebar'
import { useViewType } from '@/hooks/useViewType'
import { cn, Skeleton } from '@nextui-org/react'
import { PageCardSkeleton } from '../PageCardSkeleton'

export const PageListSkeleton = () => {
  const { viewType } = useViewType()
  const { showSidebar } = useSidebar()

  if (viewType === 'grid') {
    return (
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
        <PageCardSkeleton />
        <PageCardSkeleton />
      </div>
    )
  }

  return (
    <div className="mt-[68px] rounded-large bg-default-50 p-8">
      <div className="grid w-full grid-cols-[2fr_1fr_1fr_1fr_50px] gap-x-4 gap-y-6">
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
  )
}
