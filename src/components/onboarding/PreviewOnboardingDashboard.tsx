import { useFormContext } from 'react-hook-form'
import { ProfileBadge } from '../common/ProfileBadge'
import { getUserFullName } from '@/utils/user'
import { RiExpandUpDownLine, RiNotification2Fill } from 'react-icons/ri'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react'
import Typography from '../common/Typography'

export const PreviewOnboardingDashboard = () => {
  const form = useFormContext()
  const wFirstName = form.watch('firstName')
  const wLastName = form.watch('lastName')
  const wOrgName = form.watch('orgName')

  return (
    <div className="flex h-full w-full items-stretch overflow-hidden rounded-large  bg-background">
      <div className="flex w-[320px] flex-col gap-4 border-r-2 border-divider p-4">
        <div>
          <div className="flex items-center gap-4">
            <Avatar
              size="lg"
              src={form.watch('avatar')}
              radius="md"
              fallback={wOrgName?.[0]}
              className="uppercase"
            />
            <div className="flex flex-1 flex-col">
              <Typography level="p3">{wOrgName || 'Untitled'}</Typography>
              <Typography level="p5" color="textTertiary">
                1 members
              </Typography>
            </div>
            <div>
              <Button isIconOnly radius="full" variant="flat" size="md">
                <RiNotification2Fill />
              </Button>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-4 opacity-40">
          <Skeleton className="h-[48px] w-full rounded-large" disableAnimation />
          <Skeleton className="h-[48px] w-full rounded-large" disableAnimation />
          <Skeleton className="h-[48px] w-full rounded-large" disableAnimation />
        </div>
        <div className="flex-1" />
        <Card>
          <CardHeader className="flex justify-between text-large">Get Pro Plan!</CardHeader>
          <CardBody>Get 1 month free and unlock all the features of the pro plan.</CardBody>
          <CardFooter>
            <Button color="primary" fullWidth>
              Upgrade Now
            </Button>
          </CardFooter>
        </Card>
        <div className="">
          <ProfileBadge
            variant="light"
            className="w-full max-w-full"
            size="md"
            fullName={getUserFullName({ firstName: wFirstName, lastName: wLastName })}
            rightEl={<RiExpandUpDownLine size={16} />}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex w-full justify-center gap-4">
          <Skeleton className="h-14 w-14 rounded-large opacity-40" disableAnimation />
          <Skeleton className="h-14 w-14 rounded-large opacity-40" disableAnimation />
          <Skeleton className="h-14 w-14 rounded-large opacity-40" disableAnimation />
        </div>
        <Divider />
        <div className="flex flex-col gap-8 p-8 opacity-40">
          <Skeleton className="h-[328px] w-[456px] rounded-large" disableAnimation />
        </div>
      </div>
    </div>
  )
}
