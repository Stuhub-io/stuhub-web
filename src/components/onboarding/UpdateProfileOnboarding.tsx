'use client'

import { FormInput } from '@/components/common/Form/FormInput'
import { ProfileBadge } from '@/components/common/ProfileBadge'
import Typography from '@/components/common/Typography'
import { getUserFullName } from '@/utils/user'
import { Button, Tooltip } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import { FormEventHandler, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { RiArrowGoBackFill, RiArrowLeftLine, RiArrowRightLine, RiCloseLine } from 'react-icons/ri'
import { FileUploadWrapper } from '../common/FileUploadWrapper/FileUploadWrapper'
import { OnboardingFormValues } from './utils'

export interface UpdateProfileOnboardingProps {
  onContinue?: FormEventHandler<HTMLFormElement>
  selectedUserAvatar?: Blob
  onSelectedUserAvatar: (image?: Blob) => void
}

export function UpdateProfileOnboarding(props: UpdateProfileOnboardingProps) {
  const { onContinue, onSelectedUserAvatar, selectedUserAvatar } = props
  const { data } = useSession()

  const initAvatar = data?.user?.avatar ?? ''

  const profileForm = useFormContext<OnboardingFormValues>()

  const wFirstName = profileForm.watch('firstName')
  const wLastName = profileForm.watch('lastName')
  const wAvatar = profileForm.watch('avatar')
  const [previewedImage, setPreviewedImage] = useState<string>()

  const fullName = getUserFullName({
    firstName: wFirstName,
    lastName: wLastName,
  })

  const hasAvatar = !!wAvatar || !!selectedUserAvatar

  const handleSelectImage = (image: Blob) => {
    onSelectedUserAvatar(image)
  }

  const onRemoveAvatar = () => {
    if (selectedUserAvatar) {
      setPreviewedImage(undefined)
      onSelectedUserAvatar(undefined)
      return
    }
    if (wAvatar) {
      profileForm.setValue('avatar', '')
    }
  }

  useEffect(() => {
    if (!selectedUserAvatar) return
    const objectUrl = URL.createObjectURL(selectedUserAvatar)
    setPreviewedImage(objectUrl)
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedUserAvatar])

  return (
    <form className="flex min-h-[400px] w-[560px] max-w-full flex-col" onSubmit={onContinue}>
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
            size="lg"
            fullName={fullName || 'Your Name'}
            avatar={previewedImage ?? wAvatar}
          />
          {hasAvatar ? (
            <Button size="sm" variant="flat" color="danger" type="button" onClick={onRemoveAvatar}>
              <RiCloseLine size={16} />
              Remove
            </Button>
          ) : (
            <>
              <FileUploadWrapper
                onSelectedFile={handleSelectImage}
                accept="image/*"
                isSelected={selectedUserAvatar}
              >
                <Button size="sm" variant="flat" color="primary" type="button" form="image">
                  Update Image
                </Button>
              </FileUploadWrapper>
              {initAvatar && (
                <Tooltip content="Reset avatar">
                  <Button
                    isIconOnly
                    variant="shadow"
                    color="primary"
                    size="sm"
                    onClick={() => {
                      profileForm.setValue('avatar', initAvatar)
                    }}
                  >
                    <RiArrowGoBackFill size={14} />
                  </Button>
                </Tooltip>
              )}
            </>
          )}
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
            !!profileForm.formState.errors.firstName || !!profileForm.formState.errors.lastName
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
  )
}
