'use client'

import { AppLogo } from '@/components/common/AppLogo'
import { ThemeButton } from '@/components/common/ThemeButton'
import { UpdateProfileOnboarding } from '@/components/onboarding'
import { CreateFirstOrgOnboarding } from '@/components/onboarding/CreateFirstOrgOnboarding'
import { PreviewOnboardingDashboard } from '@/components/onboarding/PreviewOnboardingDashboard'
import { cn } from '@/libs/utils'
import { useSession } from 'next-auth/react'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const OnboardingSchema = z.object({
  firstName: z.string().min(1, 'Please enter your first name'),
  lastName: z.string().min(1, 'Please enter your last name'),
  avatar: z.string().optional(),
  orgName: z.string().min(1, 'Please enter your organization name').optional(),
  orgDescription: z.string().min(1, 'Please enter your organization description').optional(),
})

type OnboardingFormValues = z.infer<typeof OnboardingSchema>

export default function Page() {
  const [step, setStep] = useState<'one' | 'two' | 'three'>('one')
  const { data: authData } = useSession()

  const onboardingForm = useForm<OnboardingFormValues>({
    defaultValues: {
      firstName: authData?.user.first_name ?? '',
      lastName: authData?.user.last_name ?? '',
      avatar: '',
      orgName: '',
      orgDescription: '',
    },
  })

  const currentForm = useMemo(() => {
    switch (step) {
      case 'one':
        return <UpdateProfileOnboarding onContinue={() => setStep('two')} />
      case 'two':
        return <CreateFirstOrgOnboarding onContinue={() => {}} onBack={() => setStep('one')} />
    }
  }, [step])
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
                'bottom-[-10%] left-20 tablet:left-32': step === 'two',
              })}
            >
              <PreviewOnboardingDashboard />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
