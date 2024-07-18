'use client'

import { FormInput } from '@/components/common/Form/FormInput'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import Typography from '@/components/common/Typography'
import { getUserFullName } from '@/utils/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri'
import { z } from 'zod'

const SetProfileSChema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  avatar: z.string().optional(),
})

type ProfileUpdateFormValues = z.infer<typeof SetProfileSChema>

export interface UpdateProfileOnboardingProps {
  onSubmit?: (values: ProfileUpdateFormValues) => void
}

export function UpdateProfileOnboarding({ onSubmit }: UpdateProfileOnboardingProps) {
  const { data } = useSession()
  const { user } = data ?? {}

  const profileForm = useForm<ProfileUpdateFormValues>({
    resolver: zodResolver(SetProfileSChema),
    defaultValues: {
      avatar: '',
      firstName: user?.last_name,
      lastName: user?.first_name,
    },
  })

  const wFirstName = profileForm.watch('firstName')
  const wLastName = profileForm.watch('lastName')

  const fullName = getUserFullName({
    firstName: wFirstName,
    lastName: wLastName,
  })

  const handleSubmit = profileForm.handleSubmit(async (values) => {
    onSubmit?.(values)
  })

  return (
    <FormProvider {...profileForm}>
      <form className="flex min-h-[400px] w-[560px] max-w-full flex-col" onSubmit={handleSubmit}>
        <Typography level="h3" className="mb-1">
          Get started
        </Typography>
        <Typography level="p2" color="textTertiary">
          Let&apos;s get to know you.
        </Typography>
        <div className="mt-8 flex flex-col gap-8">
          <FormInput size="lg" className="scale-105" label="First Name" name="firstName" />
          <FormInput size="lg" className="scale-105" label="Last Name" name="lastName" />
        </div>
        <div className="mt-8 space-y-4">
          <Typography level="h5" color="textSecondary">
            Your profile badge
          </Typography>
          <div className="flex items-center gap-4">
            <ProfileBadge
              fullName={fullName || 'Your Name'}
              avatar="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/369053435_3628631834068330_6252299390237773315_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEburLOfdqESXC9l7ydDtrYYfdslC7QSLlh92yULtBIua7hYHYTeF4KNh-826A6jQDayVgylxPs2gEJJthUwnPN&_nc_ohc=j6Olv1QeoocQ7kNvgH2PcMW&_nc_ht=scontent.fhan14-1.fna&oh=00_AYCmf8it4LpxIyb18XV4FqYprHHqk6F0tID8Vt0O5Ui9qw&oe=669EFA01"
            />
            <Button size="sm" variant="flat" color="primary" type="button">
              Update Image
            </Button>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between gap-2">
          <Button
            size="lg"
            type="button"
            variant="flat"
            className="w-fit text-text-tertiary"
            onClick={() => {
              signOut({ redirect: false })
            }}
          >
            <RiArrowLeftLine size={16} />
            Not you? Logout
          </Button>
          <Button
            size="lg"
            disabled={
              (profileForm.formState.isSubmitted && !profileForm.formState.isValid) ||
              profileForm.formState.isSubmitting
            }
            variant="solid"
            color="primary"
            type="submit"
          >
            Continue
            <RiArrowRightLine size={18} />
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
