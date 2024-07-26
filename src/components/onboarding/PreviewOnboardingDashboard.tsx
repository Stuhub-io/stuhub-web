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
import { useEffect, useState } from 'react'
import { OnboardingFormValues } from './utils'

export interface PreviewOnboardingDashboardProps {
  selectedUserAvatar?: Blob
  selectedOrgAvatar?: Blob
}

export const PreviewOnboardingDashboard = (props: PreviewOnboardingDashboardProps) => {
  const { selectedUserAvatar, selectedOrgAvatar } = props
  const form = useFormContext<OnboardingFormValues>()
  const wFirstName = form.watch('firstName')
  const wLastName = form.watch('lastName')
  const wAvatar = form.watch('avatar')
  const wOrgName = form.watch('orgName')

  const [previewUserAvatar, setPreviewUserAvatar] = useState<string>()
  const [previewOrgAvatar, setPreviewOrgAvatar] = useState<string>()

  useEffect(() => {
    if (selectedOrgAvatar) {
      const preview = URL.createObjectURL(selectedOrgAvatar)
      setPreviewOrgAvatar(preview)
      return () => URL.revokeObjectURL(preview)
    }
    setPreviewOrgAvatar(undefined)
  }, [selectedOrgAvatar])

  useEffect(() => {
    if (selectedUserAvatar) {
      const preview = URL.createObjectURL(selectedUserAvatar)
      setPreviewUserAvatar(preview)
      return () => URL.revokeObjectURL(preview)
    } else {
      setPreviewUserAvatar(undefined)
    }
  }, [form, selectedUserAvatar])

  const userAvatarUrl = previewUserAvatar ?? wAvatar

  return (
    <div className="flex h-full w-full items-stretch overflow-hidden rounded-large  bg-background">
      <div className="flex w-[320px] flex-col gap-4 border-r-2 border-divider p-4">
        <div className="flex w-full items-center gap-4">
          <Avatar
            size="md"
            src={previewOrgAvatar}
            radius="md"
            fallback={wOrgName?.[0]}
            className="shrink-0 uppercase"
          />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Typography level="p4" noWrap>
              {wOrgName || 'Untitled'}
            </Typography>
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
        <Divider />
        <div className="flex flex-col gap-4 opacity-40">
          <Skeleton className="h-[48px] w-full rounded-large" disableAnimation />
          <Skeleton className="h-[48px] w-full rounded-large" disableAnimation />
          <Skeleton className="h-[48px] w-full rounded-large" disableAnimation />
        </div>
        <div className="flex-1" />
        <Card shadow="sm">
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
            avatar={userAvatarUrl}
            rightEl={<RiExpandUpDownLine size={16} />}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex w-full justify-start gap-4">
          <Skeleton className="h-10 w-14 rounded-large opacity-40" disableAnimation />
          <Skeleton className="h-10 w-14 rounded-large opacity-40" disableAnimation />
          <Skeleton className="h-10 w-14 rounded-large opacity-40" disableAnimation />
        </div>
        <Divider />
        <div className="flex flex-col gap-8 p-8 opacity-40">
          <Skeleton className="h-[328px] w-[456px] rounded-large" disableAnimation />
        </div>
      </div>
    </div>
  )
}
