'use client'

import { GoogleAuth } from '@/auth'
import { CredentialAuth } from '@/auth/credential'
import { FormInput } from '@/components/common/Form/FormInput'
import Typography from '@/components/common/Typography'
import { ROUTES } from '@/constants/routes'
import { useAccountSetPassword } from '@/hooks/auth/useSetPassowrd'
import { useVerifyTokenEmail } from '@/hooks/auth/useVerifyTokenEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Spinner } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const AuthEmailView = () => {
  const params = useSearchParams()
  const { mutate: verifyToken, isPending, error } = useVerifyTokenEmail()
  const { mutate: setPw, isPending: isPendingSetPw, error: setPwErr } = useAccountSetPassword()

  const token = params.get('token')
  const [actionToken, setActionToken] = useState('')
  const [email, setEmail] = useState('')
  const [oauth, setOauth] = useState('')

  const formInstance = useForm<z.infer<typeof schema>>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  })

  const handleSubmitSetPw = formInstance.handleSubmit(async (data) => {
    setPw(
      {
        email,
        password: data.password,
        action_token: actionToken,
      },
      {
        onSuccess() {
          signIn(CredentialAuth.signinConfig.id, {
            redirect: false,
            email,
            password: data.password,
          })
        },
      },
    )
  })

  useEffect(() => {
    if (token) {
      verifyToken(
        {
          token,
        },
        {
          onSuccess({ data }) {
            setActionToken(data.action_token)
            setEmail(data.email)
            setOauth(data.oauth_provider)
          },
        },
      )
    }
  }, [token, verifyToken])

  useEffect(() => {
    if (oauth) {
      switch (oauth) {
        case 'google':
          signIn(GoogleAuth.signinConfig.id, { callbackUrl: ROUTES.LANDING_PAGE }) // FIXME: redirect to in app homepage
          break
      }
    }
  }, [oauth])

  if (!token) {
    return (
      <div>
        <Typography level="h2">Invalid token</Typography>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Typography level="h5">
          Verification url invalid or expired, please try request a new one
        </Typography>
      </div>
    )
  }
  if (setPwErr) {
    return (
      <div>
        <Typography level="h2">An error occurred while setting your password</Typography>
      </div>
    )
  }

  if (isPending || !email || (email && oauth)) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Typography level="h5">Checking verification link</Typography>
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <FormProvider {...formInstance}>
      <form className="mb-8 flex w-full flex-col items-center py-20" onSubmit={handleSubmitSetPw}>
        <div className="w-full max-w-md">
          <Typography level="h3">Set your account&apos;s password</Typography>
        </div>
        <div className="mt-6 w-full max-w-md space-y-4">
          <FormInput
            name="password"
            label="Input your password"
            size="lg"
            disabled={isPendingSetPw}
            description="Password must be at least 6 characters"
            type="password"
          />
          <FormInput
            name="confirmPassword"
            label="Confirm your password"
            disabled={isPendingSetPw}
            size="lg"
            type="password"
          />

          <Button
            variant="solid"
            size="lg"
            color="primary"
            fullWidth
            type="submit"
            isLoading={isPendingSetPw}
            disabled={isPendingSetPw}
          >
            Continue
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
