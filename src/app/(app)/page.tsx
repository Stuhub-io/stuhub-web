'use client'

import { useAuthContext } from '@/components/auth/AuthGuard'
import { AppLogo } from '@/components/common/AppLogo'
import { ThemeButton } from '@/components/common/ThemeButton'
import { UpdateProfileOnboarding } from '@/components/onboarding'
import { CreateFirstOrgOnboarding } from '@/components/onboarding/CreateFirstOrgOnboarding'
import { PreviewOnboardingDashboard } from '@/components/onboarding/PreviewOnboardingDashboard'
import { OnboardingFormValues, OnboardingSchema } from '@/components/onboarding/utils'
import { useOrganization } from '@/components/providers/organization'
import { useToast } from '@/hooks/useToast'
import { cn } from '@/libs/utils'
import { useCreateOrg } from '@/mutation/mutator/organization/useCreateOrg'
import { useUpdateUserInfo } from '@/mutation/mutator/useUpdateUserInfo'
import { getUserFullName } from '@/utils/user'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function Page() {
  const [step, setStep] = useState<'one' | 'two' | 'three'>('one')
  const { user } = useAuthContext()
  const { isLoadingOrganization, refetchOrgs, isNavigating } = useOrganization()
  const { mutateAsync, isPending } = useCreateOrg()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isPending: isPendingUserInfo } = useUpdateUserInfo()

  const { toast } = useToast()

  const onboardingForm = useForm<OnboardingFormValues>({
    defaultValues: {
      firstName: user?.first_name ?? '',
      lastName: user?.last_name ?? '',
      avatar: user?.avatar ?? '',
      orgName: '',
      orgDescription: '',
    },
    resolver: zodResolver(OnboardingSchema),
    mode: 'onSubmit',
  })

  const [submitedStepOne, setSubmitedStepOne] = useState(false)

  const [selectedUserAvatar, setSelectedUserAvatar] = useState<Blob>()
  const [selectedOrgAvatar, setSelectedOrgAvatar] = useState<Blob>()

  const handleSubmit = onboardingForm.handleSubmit(async (values) => {
    try {
      const createOrg = mutateAsync({
        name: values.orgName ?? '',
        description: values.orgDescription,
        avatar: `https://source.boringavatars.com/beam/120/${encodeURI(
          getUserFullName({ firstName: values.firstName, lastName: values.lastName }) ?? '',
        )}?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14`,
      })
      await Promise.all([createOrg])
      refetchOrgs()
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Error',
        description: 'An error occurred while creating your organization',
      })
    }
    toast({
      variant: 'success',
      title: 'Onboarding completed',
      description: 'You have successfully completed the onboarding process',
      duration: 2000,
    })
  })

  const currentForm = useMemo(() => {
    switch (step) {
      case 'one':
        return (
          <UpdateProfileOnboarding
            selectedUserAvatar={selectedUserAvatar}
            onSelectedUserAvatar={setSelectedUserAvatar}
            onContinue={async (e) => {
              e.preventDefault()
              setSubmitedStepOne(true)
              const isValid = await onboardingForm.trigger(['firstName', 'lastName'])
              if (isValid) {
                setStep('two')
              }
            }}
          />
        )
      case 'two':
        return (
          <CreateFirstOrgOnboarding
            selectedOrgAvatar={selectedOrgAvatar}
            onSelectedOrgAvatar={setSelectedOrgAvatar}
            onContinue={handleSubmit}
            onBack={() => setStep('one')}
            loading={isPending || isPendingUserInfo}
          />
        )
    }
  }, [
    handleSubmit,
    isPending,
    isPendingUserInfo,
    onboardingForm,
    selectedOrgAvatar,
    selectedUserAvatar,
    step,
  ])

  // manually revalidate step one form on change after submited
  useEffect(() => {
    if (submitedStepOne && step === 'one') {
      onboardingForm.trigger(['firstName', 'lastName'])
    }
  }, [
    onboardingForm,
    step,
    submitedStepOne,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onboardingForm.watch('firstName'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onboardingForm.watch('lastName'),
  ])

  if (isLoadingOrganization || (isNavigating && !onboardingForm.formState.isSubmitting)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <FormProvider {...onboardingForm}>
        <div className="relative grid h-[100vh] grid-cols-1 md:grid-cols-2">
          <div className="absolute left-8 top-8 flex items-center gap-4">
            <AppLogo level="h3" />
            <ThemeButton />
          </div>
          <div className="flex flex-col items-center justify-center p-8">{currentForm}</div>
          <div className="hidden p-8 md:block">
            <div className="relative h-full w-full overflow-hidden rounded-large bg-gradient-to-tr from-primary-400 to-secondary-400">
              <div
                className={cn(`absolute h-full min-h-full w-[1200px] min-w-full transition-all`, {
                  'bottom-20 left-20 sm:bottom-32 sm:left-32': step === 'one',
                  'bottom-[-15%] left-20 sm:left-32': step === 'two',
                })}
              >
                <PreviewOnboardingDashboard
                  selectedUserAvatar={selectedUserAvatar}
                  selectedOrgAvatar={selectedOrgAvatar}
                />
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
      <Modal isOpen={onboardingForm.formState.isSubmitting || isNavigating} hideCloseButton>
        <ModalContent>
          <ModalHeader>Preparing Your Organization</ModalHeader>
          <ModalBody className="flex items-center">
            <CircularProgress />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
