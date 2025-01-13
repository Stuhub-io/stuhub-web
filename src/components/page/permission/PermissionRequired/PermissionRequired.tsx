import { SplashAppLogo } from '@/components/common/SplashAppLogo'
import Typography from '@/components/common/Typography'
import WorkRemotelyIcon from '@/components/icons/WorkRemoteIcon'
import { Button, Textarea } from '@nextui-org/react'

export const PermissionRequired = () => {
  return (
    <div className="mx-auto mt-16 flex max-w-[700px] flex-col gap-4 md:flex-row md:gap-8">
      <div className="space-y-2">
        <SplashAppLogo size="sm" noAnimate />
        <Typography level="h4" className="!mt-8">
          Permission Required
        </Typography>
        <Typography level="p4" color="textTertiary">
          You do not have permission to view this page
        </Typography>
        <Textarea
          className="!mt-4"
          minRows={6}
          placeholder="Please provide a reason for requesting access"
        />
        <Button color="primary" className="!mt-4">
          Request Access
        </Button>
      </div>
      <WorkRemotelyIcon width={260} height={260} className="hidden md:block" />
    </div>
  )
}
