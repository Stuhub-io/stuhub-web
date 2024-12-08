import { FormInput } from '@/components/common/Form/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProfileAvatar } from './ProfileAvatar'
import { useState } from 'react'
import { useAuthContext } from '@/components/auth/AuthGuard'
import { useToast } from '@/hooks/useToast'
import { useUpdateUserInfo } from '@/mutation/mutator/useUpdateUserInfo'
import { isSameObjects, pick } from '@/libs/utils'

const profileSchema = z.object({
  first_name: z.string().trim().min(1, 'This field is required!'),
  last_name: z.string().trim().min(1, 'This field is required!'),
})

const ProfileSetting = () => {
  const { user, updateUser } = useAuthContext()
  const { toast } = useToast()
  const { mutate: updateProfile } = useUpdateUserInfo()

  const [file, setFile] = useState<File>()
  const [isSaving, setIsSaving] = useState(false)

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
    mode: 'onSubmit',
    resolver: zodResolver(profileSchema),
  })

  // const { startUpload } = useUploadThing('profileImage')

  const handleSubmit = profileForm.handleSubmit(async (values) => {
    setIsSaving(true)

    let avatar = user?.avatar ?? ''

    if (file) {
      // const data = await startUpload([file])
      const data = await new Promise<{url: string}[]>((resolve) => {
        resolve([{
          url: 'https://example.com',
        }] as const)
      })

      if (data === undefined) {
        toast({
          variant: 'danger',
          title: 'Upload avatar fail!',
          description: 'Something wrong with upload avatar. Please try again',
        })
        setIsSaving(false)
        return
      }
      avatar = data[0].url
    }

    const payload = {
      ...values,
      avatar,
    }
    updateProfile(payload, {
      onSuccess: async () => {
        toast({
          variant: 'success',
          title: 'Update profile successfully!',
        })
        await updateUser(payload)
      },
      onError: () => {
        toast({
          variant: 'danger',
          title: 'Update profile fail!',
          description: 'Something wrong! Please try again',
        })
      },
      onSettled: () => {
        setIsSaving(false)
      },
    })
  })

  const avatarUrl = file ? URL.createObjectURL(file) : user?.avatar

  const currentProfile = { ...profileForm.watch(), avatar: avatarUrl }
  const isInfoChanged = !isSameObjects(
    pick(user!, ['first_name', 'last_name', 'avatar']),
    currentProfile,
  )

  return (
    <FormProvider {...profileForm}>
      <form className="flex w-full flex-1 flex-col" onSubmit={handleSubmit}>
        <div className="mb-6 mt-2">
          <ProfileAvatar {...{ avatarUrl, setFile }} />
        </div>

        <div className="mt-2 space-y-3">
          <FormInput
            name="first_name"
            size="lg"
            label="First name"
            variant="flat"
            placeholder="Enter your first name"
            isClearable
          />
          <FormInput
            name="last_name"
            size="lg"
            label="Last name"
            variant="flat"
            placeholder="Enter your last name"
            isClearable
          />
          <FormInput
            name="email"
            size="lg"
            label="Email"
            variant="flat"
            value={user?.email}
            isDisabled
          />
        </div>

        <div className="flex h-full items-end justify-end">
          <Button
            color="primary"
            type="submit"
            isDisabled={!isInfoChanged || isSaving}
            isLoading={isSaving}
          >
            Save changes
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ProfileSetting
