import { FormInput } from '@/components/common/Form/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProfileAvatar } from './ProfileAvatar'

const profileSchema = z.object({
  firstName: z.string().min(1, 'This field is required!'),
  lastName: z.string().min(1, 'This field is required!'),
  email: z.string().email(),
})

const ProfileSetting = () => {
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      firstName: 'Khoa',
      lastName: 'Truong',
      email: 'khoa.truongthd@gmail.com',
    },
    mode: 'onSubmit',
    resolver: zodResolver(profileSchema),
  })

  const handleSubmit = profileForm.handleSubmit(async (values) => {
    console.log(values)
  })

  return (
    <FormProvider {...profileForm}>
      <form className="flex w-full flex-1 flex-col" onSubmit={handleSubmit}>
        <div className="mb-6 mt-5">
          <ProfileAvatar />
        </div>

        <div className="mt-2 space-y-3">
          <FormInput
            name="firstName"
            size="lg"
            label="First name"
            variant="flat"
            placeholder="Enter your first name"
            isClearable
          />
          <FormInput
            name="lastName"
            size="lg"
            label="Last name"
            variant="flat"
            placeholder="Enter your last name"
            isClearable
          />
          <FormInput name="email" size="lg" label="Email" variant="flat" isDisabled />
        </div>

        <div className="flex h-full items-end justify-end">
          <Button color="primary" type="submit">
            Save changes
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileSetting
