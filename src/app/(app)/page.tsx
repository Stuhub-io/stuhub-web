'use client'

import { AppLogo } from '@/components/common/AppLogo'
import { ThemeButton } from '@/components/common/ThemeButton'
import { UpdateProfileOnboarding } from '@/components/onboarding'
import { CreateFirstOrgOnboarding } from '@/components/onboarding/CreateFirstOrgOnboarding'
import { useMemo, useState } from 'react'

export default function Page() {
  const [step, setStep] = useState<'one' | 'two' | 'three'>('one')

  const currentForm = useMemo(() => {
    switch (step) {
      case 'one':
        return <UpdateProfileOnboarding onSubmit={() => setStep('two')} />
      case 'two':
        return <CreateFirstOrgOnboarding onSubmit={() => {}} onBack={() => setStep('one')} />
    }
  }, [step])

  return (
    <div className="laptop:grid-cols-2 relative grid h-[100vh] grid-cols-1">
      <div className="absolute left-8 top-8 flex items-center gap-4">
        <AppLogo level="h3" />
        <ThemeButton />
      </div>
      <div className="flex flex-col items-center justify-center p-8">{currentForm}</div>
      <div className="laptop:block hidden p-8">
        <div className="h-full w-full rounded-large bg-gradient-to-tr from-primary-400 to-secondary-400" />
      </div>
    </div>
  )
}
