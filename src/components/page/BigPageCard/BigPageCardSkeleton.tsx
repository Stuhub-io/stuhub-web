import { cn } from '@/libs/utils'
import { Card, CardBody, CardFooter, CardHeader, Skeleton } from '@nextui-org/react'
import { RiBookLine } from 'react-icons/ri'
import { memo } from 'react'

export const BigPageCardSkeleton = memo(() => {
  return (
    <Card
      className={cn(
        'hover:bg-default-content1 w-full min-w-[400px] max-w-[400px] shrink-0 !no-underline',
        {
          'min-h-[200px]': false,
          'min-h-[100px]': true,
        },
      )}
      shadow="sm"
    >
      <CardHeader className="relative flex flex-col items-stretch pt-0">
        <div className="relative -mx-3 h-[60px]">
          <div className="h-full w-full bg-content2" />
        </div>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="mb-1 w-full">
          <Skeleton className="h-[20px] w-full max-w-[240px] rounded-md"/>
        </div>
      </CardBody>
      <CardFooter className="gap-2 text-text-tertiary">
        <RiBookLine size={14} />
        <Skeleton className="h-[12px] w-[40px] rounded-sm" />
      </CardFooter>
    </Card>
  )
})

BigPageCardSkeleton.displayName = 'BigPageCardSkeleton'
