'use client'

import { AppLogo } from '@/components/common/AppLogo'
import { ThemeButton } from '@/components/common/ThemeButton'
import { UpdateProfileOnboarding } from '@/components/onboarding'
import { CreateFirstOrgOnboarding } from '@/components/onboarding/CreateFirstOrgOnboarding'
import { PreviewOnboardingDashboard } from '@/components/onboarding/PreviewOnboardingDashboard'
import { OnboardingFormValues, OnboardingSchema } from '@/components/onboarding/utils'
import { cn } from '@/libs/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export default function Page() {
  const [step, setStep] = useState<'one' | 'two' | 'three'>('one')
  const { data: authData } = useSession()

  const onboardingForm = useForm<OnboardingFormValues>({
    defaultValues: {
      firstName: authData?.user.first_name ?? '',
      lastName: authData?.user.last_name ?? '',
      avatar: authData?.user.avatar ?? '',
      orgName: '',
      orgDescription: '',
    },
    resolver: zodResolver(OnboardingSchema),
    mode: 'onSubmit',
  })

  const [submitedStepOne, setSubmitedStepOne] = useState(false)

  const [selectedUserAvatar, setSelectedUserAvatar] = useState<Blob>()
  const [selectedOrgAvatar, setSelectedOrgAvatar] = useState<Blob>()

  const handleSubmit = onboardingForm.handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2))
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
          />
        )
    }
  }, [handleSubmit, onboardingForm, selectedOrgAvatar, selectedUserAvatar, step])

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

  return (
    <FormProvider {...onboardingForm}>
      <div className="relative grid h-[100vh] grid-cols-1 laptop:grid-cols-2">
        <div className="absolute left-8 top-8 flex items-center gap-4">
          <AppLogo level="h3" />
          <ThemeButton />
        </div>
        <div className="flex flex-col items-center justify-center p-8">{currentForm}</div>
        <div className="hidden p-8 laptop:block">
          <div className="relative h-full w-full overflow-hidden rounded-large bg-gradient-to-tr from-primary-400 to-secondary-400">
            <div
              className={cn(`absolute h-full min-h-full w-[1200px] min-w-full transition-all`, {
                'bottom-20 left-20 tablet:bottom-32 tablet:left-32': step === 'one',
                'bottom-[-15%] left-20 tablet:left-32': step === 'two',
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
  )
}
