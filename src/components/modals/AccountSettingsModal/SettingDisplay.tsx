import Typography from '@/components/common/Typography'
import { Divider } from '@nextui-org/react'
import { PropsWithChildren, Suspense } from 'react'
import { SettingContentSkeleton } from './SettingContentSkeleton'

interface SettingDisplayProps extends PropsWithChildren {
  title: string
}

export const SettingDisplay = ({ title, children }: SettingDisplayProps) => {
  return (
    <div className="flex flex-1 flex-col px-10 py-6">
      <Typography level="h6" color="textSecondary" className='font-medium'>
        {title}
      </Typography>
      <Divider orientation="horizontal" className="mb-6 mt-3" />
      <Suspense fallback={<SettingContentSkeleton />}>{children}</Suspense>
    </div>
  )
}
