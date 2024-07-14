'use client'
import { GoogleAuth } from '@/auth'
import { CredentialAuth } from '@/auth/credential'
import { FormInput } from '@/components/common/Form/FormInput'
import Typography from '@/components/common/Typography'
import { useAuthenEmailStepOne } from '@/hooks/auth/useAuthEmailStepOne'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Image from 'next/image'
import { BsGithub } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import { useToast } from '@/hooks/useToast'
import { ROUTES } from '@/constants/routes'

const emailSchema = z.object({
  email: z.string().email(),
})

const passwordSchema = z.object({
  password: z.string().min(6),
})

export default function LoginPage() {
  const { mutate, isPending: isMutatingStepOne } = useAuthenEmailStepOne()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [authState, setAuthState] = useState<'check-email' | 'email-sent' | 'password'>(
    'check-email',
  )
  const [validEmail, setValidEmail] = useState('')
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(emailSchema),
  })

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    defaultValues: {
      password: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(passwordSchema),
  })

  const currentForm = authState === 'check-email' ? emailForm : passwordForm

  const handleSubmitEmail = emailForm.handleSubmit(async (values) => {
    mutate(
      {
        email: values.email,
      },
      {
        onSuccess: (data) => {
          setValidEmail(values.email)
          if (!data.data.is_required_email) {
            // Continue with password
            setAuthState('password')
          } else {
            // Continue with email
            setAuthState('email-sent')
          }
        },
        onError: () => {
          toast({
            variant: 'danger',
            title: 'Validate Email Error',
            description: 'Some thing went wrong, please try again later',
          })
        },
      },
    )
  })

  const handleSubmitPassword = passwordForm.handleSubmit(async (values) => {
    setLoading(true)
    const resp = await signIn(CredentialAuth.signinConfig.id, {
      email: validEmail,
      password: values.password,
      redirect: false,
    })
    if (!resp?.ok) {
      //toast
      toast({
        variant: 'danger',
        title: 'Sign in error',
        description: 'Invalid email or password, please try again!',
      })
    }
    setLoading(false)
  })

  const handleSubmit = currentForm === emailForm ? handleSubmitEmail : handleSubmitPassword

  return (
    <>
      <FormProvider {...(currentForm as any)}>
        <form className="mb-8 flex w-full flex-col items-center py-20" onSubmit={handleSubmit}>
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
              disabled={isMutatingStepOne}
              type="button"
              onClick={async () => {
                await signIn(GoogleAuth.signinConfig.id, {
                  callbackUrl: ROUTES.HOME_PAGE,
                })
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
              disabled={isMutatingStepOne || Boolean(validEmail)}
              value={validEmail ? validEmail : undefined}
              isClearable
            />
            {authState === 'password' && (
              <FormInput
                name="password"
                type="password"
                size="lg"
                label="Password"
                variant="flat"
                placeholder="Enter your account's password"
                isClearable
              />
            )}

            <Button
              variant="solid"
              size="lg"
              color="primary"
              fullWidth
              type="submit"
              isLoading={isMutatingStepOne || loading}
            >
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
      <Modal isOpen={authState === 'email-sent'} hideCloseButton>
        <ModalContent>
          <ModalHeader>Email Sent</ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center">
            <Image src="/mail-concept-illustration.png" alt="email-sent" width={200} height={200} />
            <Typography level="p4" color="textTertiary" className="-mt-4 text-center">
              Please check the email inbox you signed up with to login to your account. You may need
              to check the spam folder.
            </Typography>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  )
}
