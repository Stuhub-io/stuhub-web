'use client'

import { FormInput } from '@/components/common/Form/FormInput'
import Typography from '@/components/common/Typography'
import { useToast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Chip, Divider } from '@nextui-org/react'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import { FcOk } from 'react-icons/fc'

interface LoginFormValues {
  email?: string
  password?: string
  showPassword: boolean
}

const getSchema = (isRequiredPassword: boolean) =>
  z.object({
    email: z.string().email(),
    password: isRequiredPassword ? z.string().min(6) : z.string().optional(),
  })

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      showPassword: true,
    },
    mode: 'onSubmit',
    resolver: zodResolver(getSchema(showPassword)),
  })
  const { data } = useSession()
  console.log(data)
  const { toast } = useToast()

  const handleSubmit = form.handleSubmit(async (values: LoginFormValues) => {
    signIn('credentials', { email: values.email, password: values.password, redirect: false })
    form.reset(undefined, {
      keepValues: true,
      keepErrors: false,
      keepDirty: false,
      keepIsSubmitted: false,
    })
    setShowPassword(true)
  })

  return (
    <FormProvider {...form}>
      <form className="mb-8 flex w-full flex-col items-center py-20" onSubmit={handleSubmit}>
        <Button
          onClick={() => {
            toast({
              title: 'Scheduled: Catch up ',
              description: 'Friday, February 10, 2023 at 5:57 PM',
              icon: <FcOk size={24} />,
              size: 'small',
              variant: 'warning',
              position: 'topCenter',
            })
          }}
        >
          Add to calendar
        </Button>
        <div className="w-full max-w-md">
          <Typography level="h2" className="w-fit" color="textSecondary">
            Boost Your Productivity
          </Typography>
          <Typography level="h3">Sign in to Stuhub account</Typography>
        </div>
        <div className="mt-6 w-full max-w-md space-y-4">
          <Button
            variant="flat"
            size="lg"
            fullWidth
            type="button"
            onClick={() => {
              signIn('google', { redirect: false })
            }}
          >
            <FcGoogle size={24} />
            Continue with Google
          </Button>
          <Button
            variant="flat"
            size="lg"
            fullWidth
            type="button"
            disabled
            className="relative text-text-tertiary"
          >
            <BsGithub size={24} />
            Continue with Github
            <Chip className="absolute right-4" size="sm">
              Soon
            </Chip>
          </Button>
        </div>
        <div className="my-6 flex w-full max-w-md items-center justify-center gap-4 overflow-hidden">
          <Divider orientation="horizontal" />
        </div>
        <div className="w-full max-w-md space-y-4">
          <Typography level="p4" color="textTertiary">
            Use an organization email to easily collaborate with teammates
          </Typography>
          <FormInput
            name="email"
            size="lg"
            placeholder="example@gmail.com"
            label="Email"
            variant="flat"
            isClearable
          />
          {showPassword && (
            <FormInput
              name="password"
              type="password"
              size="lg"
              label="Password"
              placeholder="example@gmail.com"
              variant="flat"
              isClearable
            />
          )}
          <Button variant="solid" size="lg" color="primary" fullWidth type="submit">
            Continue
          </Button>
        </div>
        <div className="mt-24 w-full max-w-md translate-y-8 text-center">
          <Typography color="textTertiary" fontWeight="sm" level="p4">
            Your name and photo are displayed to users who invite you to a workspace using your
            email. By continuing, you acknowledge that you understand and agree to the Term &
            Conditions and Private Privacy
          </Typography>
        </div>
      </form>
    </FormProvider>
  )
}
