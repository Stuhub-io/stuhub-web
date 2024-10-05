import Typography from '@/components/common/Typography'
import { CircularProgress, Divider } from '@nextui-org/react'
import { PropsWithChildren, Suspense } from 'react'

interface SettingDisplayProps extends PropsWithChildren {
  title: string
}

export const SettingDisplay = ({ title, children }: SettingDisplayProps) => {
  return (
    <div className="flex flex-1 flex-col px-10 py-8">
      <Typography level="h5" color="textSecondary">
        {title}
      </Typography>
      <Divider orientation="horizontal" className="my-3" />
      <Suspense fallback={<CircularProgress />}>{children}</Suspense>
    </div>
  )
}
